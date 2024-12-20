import PowerRegister from "../../../shared/domain/entities/powerRegister";
import PowerRegisterResult from "../dto/powerRegisterResult";

export default class ReplaceIncorrectValuesInPowerRegisters {
    replaceIncorrectValues(originalRecords: Array<PowerRegisterResult>, defaultPowerValueToReplace: number): Array<PowerRegister> {
        if (originalRecords.length === 0)
            return []

        const records: Array<PowerRegister> = []

        for (const originalRegister of originalRecords) {
            if (originalRegister.result === true) {
                records.push(originalRegister.register as PowerRegister)
            } else {
                records.push({
                    name: originalRegister.wrongRegister?.name as string,
                    power: defaultPowerValueToReplace,
                    dateTime: new Date(originalRegister.wrongRegister?.dateTime as string),
                })
            }
        }

        return records
    }
}