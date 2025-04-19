import ReadPowerRegistersResult from "../dto/readPowerRegistersResult";

export default interface IPowerRegisterReader {
    readPowerRegisters(filePath: string, skipFirstRow: boolean): Promise<ReadPowerRegistersResult>
}