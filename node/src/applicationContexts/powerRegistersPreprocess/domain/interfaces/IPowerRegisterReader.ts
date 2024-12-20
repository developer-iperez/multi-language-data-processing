import ReadPowerRegistersResult from "../dto/readPowerRegistersResult";

export default interface IPowerRegisterReader {
    readPowerRegisters(filePath: string): Promise<{ registers?: ReadPowerRegistersResult, error?: string }>
}