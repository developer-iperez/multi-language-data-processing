import ReadPowerRegistersResult from "../domain/dto/readPowerRegistersResult";
import IFileReaderAdapter from "../domain/interfaces/IFileReaderAdapter";
import IPowerRegisterReader from "../domain/interfaces/IPowerRegisterReader";
import PowerRegistersReader from "../domain/services/powerRegistersReader";

export default class PowerRegisterReader implements IPowerRegisterReader {

    private powerRegistersReader: PowerRegistersReader;

    constructor(private fileReaderAdapter: IFileReaderAdapter) {
        this.powerRegistersReader = new PowerRegistersReader(this.fileReaderAdapter)
    }

    async readPowerRegisters(filePath: string): Promise<{ registers?: ReadPowerRegistersResult, error?: string }> {
        try {
            const registers = await this.powerRegistersReader.readPowerRegisters(filePath)
            return { registers }
        } catch (error: any) {
            return { error: error.message }
        }
    }
}