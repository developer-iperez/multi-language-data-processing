import PowerRegister from "../../shared/domain/entities/powerRegister";
import PowerRegisterResult from "../domain/dto/powerRegisterResult";
import PreProcessOptions from "../domain/dto/preProcessOptions";
import IPowerRegisterPreprocess from "../domain/interfaces/IPowerRegisterPreprocess";
import PowerRegistersSort from "../domain/services/powerRegistersSort";
import ProcessValidAndInvalidPowerRegisters from "../domain/services/processValidAndInvalidPowerRegisters";
import { RemoveInvalidPowerRegisters } from "../domain/services/removeInvalidPowerRegisters";
import ReplaceIncorrectValuesInPowerRegisters from "../domain/services/replaceIncorrectValuesInPowerRegisters";

export default class PowerRegisterPreprocess implements IPowerRegisterPreprocess {
    preProcessRegisters(preProcessOptions: PreProcessOptions, originalRecords: Array<PowerRegisterResult>): Array<PowerRegister> {
        let records: Array<PowerRegister> = []

        if (preProcessOptions?.removeInvalidRegisters) {
            const service = new RemoveInvalidPowerRegisters()
            records = service.removeInvalidRegisters(originalRecords)
        } else if (preProcessOptions?.replaceInvalidRegisters) {
            const service = new ReplaceIncorrectValuesInPowerRegisters()
            records = service.replaceIncorrectValues(originalRecords, preProcessOptions.defaultPowerValueToBeReplaced)
        } else {
            const service = new ProcessValidAndInvalidPowerRegisters()
            records = service.processValidAndInvalidPowerRegisters(originalRecords)
        }

        const service = new PowerRegistersSort()
        //TODO: cambiar el nombre del método para hacerlo más entendible
        records = service.sort(records)

        return records
    }
}