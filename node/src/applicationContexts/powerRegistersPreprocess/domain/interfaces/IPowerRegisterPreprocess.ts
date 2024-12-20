import PowerRegister from "../../../shared/domain/entities/powerRegister";
import PowerRegisterResult from "../dto/powerRegisterResult";
import PreProcessOptions from "../dto/preProcessOptions";

export default interface IPowerRegisterPreprocess {
    preProcessRegisters(preProcessOptions: PreProcessOptions, records: Array<PowerRegisterResult>): Array<PowerRegister>
}