import PreProcessOptions from "../applicationContexts/powerRegistersPreprocess/domain/dto/preProcessOptions"
import ProcessOptions from "../applicationContexts/powerRegistersProcess/domain/domain/processOptions"

export default interface ApplicationInputOptions {
    powerRegistersFilePath: string
    preProcessOptions: PreProcessOptions
    processOptions: ProcessOptions
}