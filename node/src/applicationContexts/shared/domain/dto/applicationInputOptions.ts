import PreProcessOptions from "../../../powerRegistersPreprocess/domain/dto/preProcessOptions"
import ProcessOptions from "../../../powerRegistersProcess/domain/domain/processOptions"

export default interface ApplicationInputOptions {
    inputPowerRegistersFilePath: string
    outputPowerRegistersFilePath: string
    skipFirstRowFromInputFile: boolean
    preProcessOptions: PreProcessOptions
    processOptions: ProcessOptions
}