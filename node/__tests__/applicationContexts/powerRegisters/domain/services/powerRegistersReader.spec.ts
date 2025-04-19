import { It, Mock } from 'moq.ts'
import IFileReaderAdapter from '../../../../../src/applicationContexts/powerRegistersPreprocess/domain/interfaces/IFileReaderAdapter'
import PowerRegistersReader from '../../../../../src/applicationContexts/powerRegistersPreprocess/domain/services/powerRegistersReader'

const fileReaderAdapterMock = new Mock<IFileReaderAdapter>()

describe('[Domain] Class PowerRegistersReader', () => {
    test('Should throws error if the input is empty', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())

        // Act
        // Assert
        await expect(() => service.readPowerRegisters('', false)).rejects.toThrow('inputPath cannot be null or empty')
    })

    test('Should returns result as false if it procude any internal exception', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())
        fileReaderAdapterMock.setup(x => x.readFile(It.IsAny<string>())).throwsAsync(new Error('Exception from test'))
        
        // Act
        const result = await service.readPowerRegisters("file", false)

        // Assert
        expect(result.result).toBeFalsy()
        expect(result.records.length).toBe(0)
    })

    test('Should returns result as true and empty records if the file content is empty', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())
        fileReaderAdapterMock.setup(x => x.readFile(It.IsAny<string>())).returnsAsync('')
        
        // Act
        const result = await service.readPowerRegisters("file", false)

        // Assert
        expect(result.result).toBeTruthy()
        expect(result.records.length).toBe(0)
    })

    test('Should returns result as true and single wrong record if the file contents a single invalid register (power value)', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())
        fileReaderAdapterMock.setup(x => x.readFile(It.IsAny<string>())).returnsAsync(`reg-1,value,2024-10-10T00:00:00Z`)
        
        // Act
        const result = await service.readPowerRegisters('file', false)

        // Assert
        expect(result.result).toBeTruthy()
        expect(result.records.length).toBe(1)
        expect(result.records[0].result).toBeFalsy()
        expect(result.records[0].register).toBeNull()
        expect(result.records[0].wrongRegister).not.toBeNull()
        expect(result.records[0].wrongRegister?.name).toBe('reg-1')
        expect(result.records[0].wrongRegister?.power).toBe('value')
        expect(result.records[0].wrongRegister?.dateTime).toBe('2024-10-10T00:00:00Z')
    })

    test('Should returns result as true and single wrong record if the file contents a single invalid register (dateTime)', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())
        fileReaderAdapterMock.setup(x => x.readFile(It.IsAny<string>())).returnsAsync(`reg-1,123.4,invalid-date-time-format`)
        
        // Act
        const result = await service.readPowerRegisters('file', false)

        // Assert
        expect(result.result).toBeTruthy()
        expect(result.records.length).toBe(1)
        expect(result.records[0].result).toBeFalsy()
        expect(result.records[0].register).toBeNull()
        expect(result.records[0].wrongRegister).not.toBeNull()
        expect(result.records[0].wrongRegister?.name).toBe('reg-1')
        expect(result.records[0].wrongRegister?.power).toBe('123.4')
        expect(result.records[0].wrongRegister?.dateTime).toBe('invalid-date-time-format')
    })

    test('Should returns result as true and single valid record if the file contents a single valid register', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())
        fileReaderAdapterMock.setup(x => x.readFile(It.IsAny<string>())).returnsAsync(`reg-1,123.4,2024-10-10T00:00:00Z`)
        
        // Act
        const result = await service.readPowerRegisters('file', false)

        // Assert
        expect(result.result).toBeTruthy()
        expect(result.records.length).toBe(1)
        expect(result.records[0].result).toBeTruthy()
        expect(result.records[0].register).not.toBeNull()
        expect(result.records[0].register?.name).toBe('reg-1')
        expect(result.records[0].register?.power).toBe(123.4)
        expect(result.records[0].register?.dateTime).toStrictEqual(new Date('2024-10-10T00:00:00Z'))
        expect(result.records[0].wrongRegister).toBeNull()
    })

    test('Should returns result as true and single valid record if the file contents a row with title and another row with a valid register', async () => {
        // Arrange
        const service = new PowerRegistersReader(fileReaderAdapterMock.object())
        fileReaderAdapterMock.setup(x => x.readFile(It.IsAny<string>())).returnsAsync(`device,power,date
            reg-1,123.4,2024-10-10T00:00:00Z`)
        
        // Act
        const result = await service.readPowerRegisters('file', true)

        // Assert
        expect(result.result).toBeTruthy()
        expect(result.records.length).toBe(1)
        expect(result.records[0].result).toBeTruthy()
        expect(result.records[0].register).not.toBeNull()
        expect(result.records[0].register?.name).toBe('reg-1')
        expect(result.records[0].register?.power).toBe(123.4)
        expect(result.records[0].register?.dateTime).toStrictEqual(new Date('2024-10-10T00:00:00Z'))
        expect(result.records[0].wrongRegister).toBeNull()
    })
})