import ApplicationInputOptions from "../../src/applicationContexts/shared/domain/dto/applicationInputOptions"
import PeriodInMinutesValueObject from "../../src/applicationContexts/shared/domain/valueObjects/periodInMinutesValueObject"
import Application from "../../src/application/application"
import IPowerRegisterReader from "../../src/applicationContexts/powerRegistersPreprocess/domain/interfaces/IPowerRegisterReader"
import ILogger from "../../src/applicationContexts/shared/domain/interfaces/iLogger"
import { It, Mock } from "moq.ts"
import ReadPowerRegistersResult from "../../src/applicationContexts/powerRegistersPreprocess/domain/dto/readPowerRegistersResult"
import PowerRegisterPreprocess from "../../src/applicationContexts/powerRegistersPreprocess/application/powerRegistersPreprocess"
import PowerRegistersProcess from "../../src/applicationContexts/powerRegistersProcess/application/powerRegistersProcess"
import IPowerRegistersExporter from "../../src/applicationContexts/powerRegistersExport/domain/interfaces/iPowerRegistersExporter"
import PowerRegisterToBeExported from "../../src/applicationContexts/powerRegistersExport/domain/dto/powerRegisterToBeExporter"
import DefaultPowerValueObject from "../../src/applicationContexts/shared/domain/valueObjects/defaultPowerValueObject"

const powerRegisterReader = new Mock<IPowerRegisterReader>()
const powerRegisterPreprocess = new PowerRegisterPreprocess()
const powerRegistersProcess = new PowerRegistersProcess()
const powerRegistersExporter = new Mock<IPowerRegistersExporter>()
const logger = new Mock<ILogger>()

function createApplicationOptions(fillGaps: boolean = false) {
    const options: ApplicationInputOptions = {
        inputPowerRegistersFilePath: 'file',
        outputPowerRegistersFilePath: 'file_output',
        skipFirstRowFromInputFile: true,
        preProcessOptions: {
            defaultPowerValueToBeReplaced: new DefaultPowerValueObject(0),
            removeInvalidRegisters: true,
            replaceInvalidRegisters: false
        },
        processOptions: {
            fillGaps,
            periodInMinutes: new PeriodInMinutesValueObject(15)
        }
    }
    return options
}

function createApplicationInstance() {
    return new Application(powerRegisterReader.object(), powerRegisterPreprocess, powerRegistersProcess, powerRegistersExporter.object(), logger.object())
}

let outputFile: string
let exportedRegisters: Array<PowerRegisterToBeExported>
const application = createApplicationInstance()

describe('Application running with removing argument', () => {
    beforeAll(() => {
        outputFile = ''
        exportedRegisters = []
    })

    test('Should export empty registers if has empty input registers', async () => {
        // Arrange
        const readerResults = new ReadPowerRegistersResult(true, [], '')

        powerRegisterReader.setup(x => x.readPowerRegisters(It.IsAny<string>(), It.IsAny<boolean>())).returnsAsync(readerResults)

        powerRegistersExporter.setup(x => x.write(It.IsAny<string>(), It.IsAny<Array<PowerRegisterToBeExported>>()))   
            .callback((args: any): Promise<boolean> => {
                if (args.args.length === 2) {
                    outputFile = args.args[0]
                    exportedRegisters = args.args[1]
                }
                return Promise.resolve(true)
            })

        // Act
        const result = await application.invoke(createApplicationOptions())

        // Assert
        expect(result.success).toBeTruthy()
        expect(outputFile).toBe('file_output')
        expect(exportedRegisters.length).toBe(0)
    })

    test('Should export only valid registers without fill the gaps', async () => {
        // Arrange
        const options = createApplicationOptions()
        const readerResults = new ReadPowerRegistersResult(true, [
            {
                result: false,
                register: null,
                wrongRegister: {
                    name: 'device',
                    power: 'unavailable',
                    dateTime: '2024-12-09T22:00:00.000Z'
                }
            }, {
                result: true,
                register: {
                    name: 'device',
                    power: 45.67,
                    dateTime: new Date('2024-12-09T22:46:00.000Z')
                },
                wrongRegister: null
            }, {
                result: true,
                register: {
                    name: 'device',
                    power: 13.45,
                    dateTime: new Date('2024-12-09T22:15:00.000Z')
                },
                wrongRegister: null
            }, {
                result: true,
                register: {
                    name: 'device',
                    power: 23.45,
                    dateTime: new Date('2024-12-09T22:16:00.000Z')
                },
                wrongRegister: null
            }], '')

        powerRegisterReader.setup(x => x.readPowerRegisters(It.IsAny<string>(), It.IsAny<boolean>())).returnsAsync(readerResults)

        powerRegistersExporter.setup(x => x.write(It.IsAny<string>(), It.IsAny<Array<PowerRegisterToBeExported>>()))   
            .callback((args: any): Promise<boolean> => {
                if (args.args.length === 2) {
                    outputFile = args.args[0]
                    exportedRegisters = args.args[1]
                }
                return Promise.resolve(true)
            })

        // Act
        const result = await application.invoke(options)

        // Assert
        expect(result.success).toBeTruthy()
        expect(outputFile).toBe('file_output')
        expect(exportedRegisters.length).toBe(2)

        expect(exportedRegisters[0].name).toBe('device')
        expect(exportedRegisters[0].power).toBe(18.45)
        expect(exportedRegisters[0].dateTime.toISOString()).toBe('2024-12-09T22:15:00.000Z')

        expect(exportedRegisters[1].name).toBe('device')
        expect(exportedRegisters[1].power).toBe(45.67)
        expect(exportedRegisters[1].dateTime.toISOString()).toBe('2024-12-09T22:45:00.000Z')
    })

    test('Should export only valid registers and fill the gaps', async () => {
        // Arrange
        const options = createApplicationOptions(true)
        const readerResults = new ReadPowerRegistersResult(true, [
            {
                result: false,
                register: null,
                wrongRegister: {
                    name: 'device',
                    power: 'unavailable',
                    dateTime: '2024-12-09T22:00:00.000Z'
                }
            }, {
                result: true,
                register: {
                    name: 'device',
                    power: 45.67,
                    dateTime: new Date('2024-12-09T22:46:00.000Z')
                },
                wrongRegister: null
            }, {
                result: true,
                register: {
                    name: 'device',
                    power: 13.45,
                    dateTime: new Date('2024-12-09T22:15:00.000Z')
                },
                wrongRegister: null
            }, {
                result: true,
                register: {
                    name: 'device',
                    power: 23.45,
                    dateTime: new Date('2024-12-09T22:16:00.000Z')
                },
                wrongRegister: null
            }], '')

        powerRegisterReader.setup(x => x.readPowerRegisters(It.IsAny<string>(), It.IsAny<boolean>())).returnsAsync(readerResults)

        powerRegistersExporter.setup(x => x.write(It.IsAny<string>(), It.IsAny<Array<PowerRegisterToBeExported>>()))   
            .callback((args: any): Promise<boolean> => {
                if (args.args.length === 2) {
                    outputFile = args.args[0]
                    exportedRegisters = args.args[1]
                }
                return Promise.resolve(true)
            })

        // Act
        const result = await application.invoke(options)

        // Assert
        expect(result.success).toBeTruthy()
        expect(outputFile).toBe('file_output')
        expect(exportedRegisters.length).toBe(3)

        expect(exportedRegisters[0].name).toBe('device')
        expect(exportedRegisters[0].power).toBe(18.45)
        expect(exportedRegisters[0].dateTime.toISOString()).toBe('2024-12-09T22:15:00.000Z')

        expect(exportedRegisters[1].name).toBe('device')
        expect(exportedRegisters[1].power).toBe(32.06)
        expect(exportedRegisters[1].dateTime.toISOString()).toBe('2024-12-09T22:30:00.000Z')

        expect(exportedRegisters[2].name).toBe('device')
        expect(exportedRegisters[2].power).toBe(45.67)
        expect(exportedRegisters[2].dateTime.toISOString()).toBe('2024-12-09T22:45:00.000Z')
    })
})