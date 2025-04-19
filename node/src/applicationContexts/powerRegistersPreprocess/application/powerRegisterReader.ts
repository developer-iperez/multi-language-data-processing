import ReadPowerRegistersResult from "../domain/dto/readPowerRegistersResult";
import IFileReaderAdapter from "../domain/interfaces/IFileReaderAdapter";
import IPowerRegisterReader from "../domain/interfaces/IPowerRegisterReader";
import PowerRegistersReader from "../domain/services/powerRegistersReader";

export default class PowerRegisterReader implements IPowerRegisterReader {

    private powerRegistersReader: PowerRegistersReader;

    constructor(private fileReaderAdapter: IFileReaderAdapter) {
        this.powerRegistersReader = new PowerRegistersReader(this.fileReaderAdapter)
    }

    async readPowerRegisters(filePath: string, skipFirstRow: boolean): Promise<ReadPowerRegistersResult> {
        const readRegistersResult = await this.powerRegistersReader.readPowerRegisters(filePath, skipFirstRow)
        return readRegistersResult
    }
}