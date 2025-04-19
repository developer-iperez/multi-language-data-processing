import PowerRegisterToBeExported from "../domain/dto/powerRegisterToBeExporter";
import IPowerRegistersWriter from "../domain/interfaces/iPowerRegistersExporter"

export default class PowerRegistersExporter implements IPowerRegistersWriter {
    
    async write(filePath: string, powerRegisters: Array<PowerRegisterToBeExported>): Promise<boolean> {
        //TODO: Output to file or console
        for(const register of powerRegisters) {
            console.log(`${register.dateTime} - ${register.power}`)
        }

        return true
    }

}