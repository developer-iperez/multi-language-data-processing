import ProcessOptions from "../../../powerRegistersProcess/domain/domain/processOptions"
import ApplicationInputFromComandLine from "../../../shared/domain/dto/applicationInputFromComandLine"
import ApplicationInputOptions from "../../../shared/domain/dto/applicationInputOptions"
import PeriodInMinutesValueObject from "../../../shared/domain/valueObjects/periodInMinutesValueObject"
import DefaultPowerValueObject from "../../../shared/domain/valueObjects/defaultPowerValueObject"
import PreProcessOptions from "../dto/preProcessOptions"
import ValidationError from "../dto/validationError"

export default class InputOptionsBuilder {
    build(applicationInputFromComandLine: ApplicationInputFromComandLine): ApplicationInputOptions {
        if (!this.isValidString(applicationInputFromComandLine.inputFilePath))
            throw new Error('Input filepath is missing')
        if (!this.isValidString(applicationInputFromComandLine.outputFilePath))
            throw new ValidationError('Output filepath is missing')
        if (applicationInputFromComandLine.inputFilePath === applicationInputFromComandLine.outputFilePath)
            throw new ValidationError('Input filepath and output filepath cannot be the same')

        return {
            inputPowerRegistersFilePath: applicationInputFromComandLine.inputFilePath,
            outputPowerRegistersFilePath: applicationInputFromComandLine.outputFilePath,
            skipFirstRowFromInputFile: applicationInputFromComandLine.skipFirstRowFromInputFile,
            preProcessOptions: this.createPreProcessOptions(applicationInputFromComandLine),
            processOptions: this.createProcessOptions(applicationInputFromComandLine)
        }
    }

    private isValidString(value: string | null | undefined): boolean {
        return typeof value === 'string' && value.trim() !== ''
    }

    private createPreProcessOptions(applicationInputFromComandLine: ApplicationInputFromComandLine): PreProcessOptions {
        return new PreProcessOptions(applicationInputFromComandLine.removeInvalidRegisters, 
            applicationInputFromComandLine.replaceInvalidRegisters,
            new DefaultPowerValueObject(applicationInputFromComandLine.defaultPowerValue)
        )
    }

    private createProcessOptions(applicationInputFromComandLine: ApplicationInputFromComandLine): ProcessOptions {
        return new ProcessOptions(applicationInputFromComandLine.fillGaps === 'enabled',
            new PeriodInMinutesValueObject(applicationInputFromComandLine.periodInMinutes)
        )
    }
}