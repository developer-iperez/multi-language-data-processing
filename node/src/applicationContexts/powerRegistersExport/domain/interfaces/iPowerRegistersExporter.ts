import PowerRegisterToBeExported from "../dto/powerRegisterToBeExporter"

export default interface IPowerRegistersExporter {
    write(filePath: string, powerRegisters: Array<PowerRegisterToBeExported>): Promise<boolean>
}