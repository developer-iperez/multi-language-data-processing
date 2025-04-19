import InputOptionsBuilder from "../../../../../src/applicationContexts/powerRegistersPreprocess/domain/services/inputOptionsBuilder"
import ApplicationInputFromComandLine from "../../../../../src/applicationContexts/shared/domain/dto/applicationInputFromComandLine"

function createApplicationInputFromComandLine(): ApplicationInputFromComandLine {
    return {
        inputFilePath: '',
        outputFilePath: '',
        defaultPowerValue: 0.0,
        removeInvalidRegisters: false,
        replaceInvalidRegisters: false,
        fillGaps: 'enable',
        periodInMinutes: 15,
        skipFirstRowFromInputFile: false
    }
}

describe('[Domain] Class InputOptionsValidator', () => {
    test('Should throws error if the input is empty', () => {
        // Arrange
        const service = new InputOptionsBuilder()
        const options = createApplicationInputFromComandLine()

        // Act
        // Assert
        expect(() => service.build(options)).toThrow('Input filepath is missing')
    })

    test('Should throws error if the output is empty', () => {
        // Arrange
        const service = new InputOptionsBuilder()
        let options = createApplicationInputFromComandLine()

        options.inputFilePath = 'file'

        // Act
        // Assert
        expect(() => service.build(options)).toThrow('Output filepath is missing')
    })

    test('Should throws error if both input and output are equals', () => {
        // Arrange
        const service = new InputOptionsBuilder()
        let options = createApplicationInputFromComandLine()

        options.inputFilePath = 'file'
        options.outputFilePath = 'file'

        // Act
        // Assert
        expect(() => service.build(options)).toThrow('Input filepath and output filepath cannot be the same')
    })

    test('Should throws error if default power value to be replaced is not a valid number', () => {
        // Arrange
        const service = new InputOptionsBuilder()
        let options = createApplicationInputFromComandLine()

        options.inputFilePath = 'file'
        options.outputFilePath = 'file-output'
        options.defaultPowerValue = NaN

        // Act
        // Assert
        expect(() => service.build(options)).toThrow('Default power value must be a number')
    })

    test('Should throws error if period in minutes value is not a valid value in array [15, 30, 60]', () => {
        // Arrange
        const service = new InputOptionsBuilder()
        let options = createApplicationInputFromComandLine()

        options.inputFilePath = 'file'
        options.outputFilePath = 'file-output'
        options.defaultPowerValue = 100.15
        options.periodInMinutes = 20

        // Act
        // Assert
        expect(() => service.build(options)).toThrow('Period must be 15, 30 or 60 minutes')
    })

    test('Should returns equivalent object if all the input data is valid', () => {
        // Arrange
        const service = new InputOptionsBuilder()
        let options = createApplicationInputFromComandLine()

        options.inputFilePath = 'file'
        options.outputFilePath = 'file-output'
        options.skipFirstRowFromInputFile = true
        options.defaultPowerValue = 100.15
        options.periodInMinutes = 15
        options.removeInvalidRegisters = true
        options.replaceInvalidRegisters = true
        options.fillGaps = 'enabled'

        // Act
        const result = service.build(options)

        // Assert
        expect(result).not.toBeNull()
        expect(result.inputPowerRegistersFilePath).toBe('file')
        expect(result.outputPowerRegistersFilePath).toBe('file-output')
        expect(result.skipFirstRowFromInputFile).toBeTruthy()
        expect(result.preProcessOptions.defaultPowerValueToBeReplaced.value).toBe(100.15)
        expect(result.preProcessOptions.removeInvalidRegisters).toBeTruthy()
        expect(result.preProcessOptions.replaceInvalidRegisters).toBeTruthy()
        expect(result.processOptions.fillGaps).toBe(true)
        expect(result.processOptions.periodInMinutes.value).toBe(15)
    })
})