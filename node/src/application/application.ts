import PowerRegisterReader from "../applicationContexts/powerRegistersPreprocess/application/powerRegisterReader";
import PowerRegisterPreprocess from "../applicationContexts/powerRegistersPreprocess/application/powerRegistersPreprocess";
import PowerRegisterResult from "../applicationContexts/powerRegistersPreprocess/domain/dto/powerRegisterResult";
import IPowerRegisterPreprocess from "../applicationContexts/powerRegistersPreprocess/domain/interfaces/IPowerRegisterPreprocess";
import IPowerRegisterReader from "../applicationContexts/powerRegistersPreprocess/domain/interfaces/IPowerRegisterReader";
import { FileReaderAdapter } from "../applicationContexts/powerRegistersPreprocess/infrastructure/file/fileReaderAdapter";
import PowerRegistersProcess from "../applicationContexts/powerRegistersProcess/application/powerRegistersProcess";
import IPowerRegistersProcess from "../applicationContexts/powerRegistersProcess/domain/interfaces/IPowerRegistersProcess";
import ApplicationInputOptions from "./applicationInputOptions";

export default class Application {
    
    private powerRegisterReader: IPowerRegisterReader
    private powerRegisterPreprocess: IPowerRegisterPreprocess
    private powerRegistersProcess: IPowerRegistersProcess

    constructor() {
        this.powerRegisterReader = new PowerRegisterReader(new FileReaderAdapter())
        this.powerRegisterPreprocess = new PowerRegisterPreprocess()
        this.powerRegistersProcess = new PowerRegistersProcess()
    }

    async invoke(applicationInputOptions: ApplicationInputOptions): Promise<boolean> {
        const readResult = await this.powerRegisterReader.readPowerRegisters(applicationInputOptions.powerRegistersFilePath)
        if (readResult.error) {
            return false
        }
       
        const inputPowerRegisters = this.powerRegisterPreprocess.preProcessRegisters(applicationInputOptions.preProcessOptions, readResult.registers as unknown as Array<PowerRegisterResult>)
        this.powerRegistersProcess.processRegisters(applicationInputOptions.processOptions, inputPowerRegisters)

        //TODO: Output to file or console

        return true
    }
}