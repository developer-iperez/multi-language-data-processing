import PowerRegister from "../../../shared/domain/entities/powerRegister";
import ProcessOptions from "../domain/processOptions";

export default interface IPowerRegistersProcess {
    processRegisters(processOptions: ProcessOptions, inputPowerRegisters: Array<PowerRegister>): Array<PowerRegister>
}