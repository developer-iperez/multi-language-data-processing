import PowerRegisterPreprocess from "../../../../src/applicationContexts/powerRegistersPreprocess/application/powerRegistersPreprocess"
import PreProcessOptions from "../../../../src/applicationContexts/powerRegistersPreprocess/domain/dto/preProcessOptions"

describe('[Application] Class PowerRegisterPreprocess', () => {
    test('Should returns empty array if input has no elements', () => {
        // Arrange
        var service = new PowerRegisterPreprocess()

        // Act
        const result = service.preProcessRegisters({
            removeInvalidRegisters: false,
            replaceInvalidRegisters: false,
            defaultPowerValueToBeReplaced: 0
        }, [])

        // Assert
        expect(result?.length).toEqual(0)
    })

    test('Should returns both valid and invalid registers if input has a one valid register, other invalid and no preprocess options are true', () => {
        // Arrange
        var service = new PowerRegisterPreprocess()

        // Act
        const options: PreProcessOptions = {
            removeInvalidRegisters: false,
            replaceInvalidRegisters: false,
            defaultPowerValueToBeReplaced: 0
        }
        const result = service.preProcessRegisters(options, [{
            result: true,
            register: {
                name: 'd1',
                power: 34.5,
                dateTime: new Date('2024-10-01T00:00:00Z')
            },
            wrongRegister: null
        }, {
            result: false,
            register: null,
            wrongRegister: {
                name: 'd1',
                power: 'invalid_value',
                dateTime: '2024-10-01T01:00:00Z'
            }
        }])

        // Assert
        expect(result?.length).toEqual(2)
        expect(result[0].name).toEqual('d1')
        expect(result[0].power).toEqual(34.5)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00Z'))
        expect(result[1].name).toEqual('d1')
        expect(result[1].power).toEqual(NaN)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T01:00:00Z'))
    })

    test('Should returns only valid registers if input has one valid register, other invalid and the "removeInvalid" preprocess option is true', () => {
        // Arrange
        var service = new PowerRegisterPreprocess()

        // Act
        const options: PreProcessOptions = {
            removeInvalidRegisters: true,
            replaceInvalidRegisters: false,
            defaultPowerValueToBeReplaced: 0
        }
        const result = service.preProcessRegisters(options, [{
            result: true,
            register: {
                name: 'd1',
                power: 34.5,
                dateTime: new Date('2024-10-01T00:00:00Z')
            },
            wrongRegister: null
        }, {
            result: false,
            register: null,
            wrongRegister: {
                name: 'd1',
                power: 'invalid_value',
                dateTime: '2024-10-01T01:00:00Z'
            }
        }])

        // Assert
        expect(result?.length).toEqual(1)
        expect(result[0].name).toEqual('d1')
        expect(result[0].power).toEqual(34.5)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00Z'))
    })

    test('Should returns both valid and invalid registers if input has a one valid register, other invalid and the "replaceInvalid" preprocess option is true', () => {
        // Arrange
        var service = new PowerRegisterPreprocess()

        // Act
        const options: PreProcessOptions = {
            removeInvalidRegisters: false,
            replaceInvalidRegisters: true,
            defaultPowerValueToBeReplaced: 0
        }
        const result = service.preProcessRegisters(options, [{
            result: true,
            register: {
                name: 'd1',
                power: 34.5,
                dateTime: new Date('2024-10-01T00:00:00Z')
            },
            wrongRegister: null
        }, {
            result: false,
            register: null,
            wrongRegister: {
                name: 'd1',
                power: 'invalid_value',
                dateTime: '2024-10-01T01:00:00Z'
            }
        }])

        // Assert
        expect(result?.length).toEqual(2)
        expect(result[0].name).toEqual('d1')
        expect(result[0].power).toEqual(34.5)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00Z'))
        expect(result[1].name).toEqual('d1')
        expect(result[1].power).toEqual(0)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T01:00:00Z'))
    })

    test('Should returns registers ordered by date if input two unordered registers', () => {
        // Arrange
        var service = new PowerRegisterPreprocess()

        // Act
        const options: PreProcessOptions = {
            removeInvalidRegisters: false,
            replaceInvalidRegisters: false,
            defaultPowerValueToBeReplaced: 0
        }
        const result = service.preProcessRegisters(options, [{
            result: true,
            register: {
                name: 'd1',
                power: 34.5,
                dateTime: new Date('2024-10-01T00:10:00Z')
            },
            wrongRegister: null
        }, {
            result: true,
            register: {
                name: 'd1',
                power: 24.5,
                dateTime: new Date('2024-10-01T00:00:00Z')
            },
            wrongRegister: null
        }])

        // Assert
        expect(result?.length).toEqual(2)
        expect(result[0].name).toEqual('d1')
        expect(result[0].power).toEqual(24.5)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00Z'))
        expect(result[1].name).toEqual('d1')
        expect(result[1].power).toEqual(34.5)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T00:10:00Z'))
    })
})