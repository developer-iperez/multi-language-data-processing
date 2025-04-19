import PowerRegisterResult from "../applicationContexts/powerRegistersPreprocess/domain/dto/powerRegisterResult"
import IPowerRegisterPreprocess from "../applicationContexts/powerRegistersPreprocess/domain/interfaces/IPowerRegisterPreprocess"
import IPowerRegisterReader from "../applicationContexts/powerRegistersPreprocess/domain/interfaces/IPowerRegisterReader"
import IPowerRegistersProcess from "../applicationContexts/powerRegistersProcess/domain/interfaces/IPowerRegistersProcess"
import ApplicationInputOptions from "../applicationContexts/shared/domain/dto/applicationInputOptions"
import ApplicationResult from "./applicationResult"
import ILogger from "../applicationContexts/shared/domain/interfaces/iLogger"
import PowerRegisterToBeExported from "../applicationContexts/powerRegistersExport/domain/dto/powerRegisterToBeExporter"
import IPowerRegistersExporter from "../applicationContexts/powerRegistersExport/domain/interfaces/iPowerRegistersExporter"
import PowerRegister from "../applicationContexts/shared/domain/entities/powerRegister"

export default class Application {
    
    constructor(private powerRegisterReader: IPowerRegisterReader,
        private powerRegisterPreprocess: IPowerRegisterPreprocess,
        private powerRegistersProcess: IPowerRegistersProcess,
        private powerRegistersExporter: IPowerRegistersExporter,
        private logger: ILogger) {}

    async invoke(applicationInputOptions: ApplicationInputOptions): Promise<ApplicationResult> {
        const readResult = await this.powerRegisterReader.readPowerRegisters(applicationInputOptions.inputPowerRegistersFilePath, applicationInputOptions.skipFirstRowFromInputFile)
        if (!readResult.result) {
            this.logger.error(`The input file name '${applicationInputOptions.inputPowerRegistersFilePath}' could not be opened`)
            return {
                success: false,
                message: `The input file name '${applicationInputOptions.inputPowerRegistersFilePath}' could not be opened`
            }
        }
       
        const inputPowerRegisters = this.powerRegisterPreprocess.preProcessRegisters(applicationInputOptions.preProcessOptions, readResult.records as unknown as Array<PowerRegisterResult>)
        const processedPowerRegisters = this.powerRegistersProcess.processRegisters(applicationInputOptions.processOptions, inputPowerRegisters)
        const powerRegistersToBeExported = this.transformPowerRegistersToBeExported(processedPowerRegisters)
        const result = await this.powerRegistersExporter.write(applicationInputOptions.outputPowerRegistersFilePath, powerRegistersToBeExported)

        return {
            success: result,
            message: `The input file name '${applicationInputOptions.inputPowerRegistersFilePath}' could be processed correctly`
        }
    }

    private transformPowerRegistersToBeExported(powerRegisters: Array<PowerRegister>): Array<PowerRegisterToBeExported> {
        const powerRegistersToBeExported: Array<PowerRegisterToBeExported> = []

        for(const register of powerRegisters) {
            powerRegistersToBeExported.push({
                name: register.name,
                power: register.power,
                dateTime: register.dateTime
            })
        }

        return powerRegistersToBeExported
    }
}