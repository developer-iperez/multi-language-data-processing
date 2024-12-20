import PowerRegister from "../../../shared/domain/entities/powerRegister";
import PowerRegisterResult from "../dto/powerRegisterResult";

export default class ProcessValidAndInvalidPowerRegisters {
    processValidAndInvalidPowerRegisters(originalRecords: Array<PowerRegisterResult>): Array<PowerRegister> {
        if (originalRecords.length === 0) 
            return []

        const records: Array<PowerRegister> = []

        for (const originalRegister of originalRecords) {
            if (originalRegister.result) {
                records.push(originalRegister.register as PowerRegister)
            } else {
                records.push({
                    name: originalRegister.wrongRegister?.name as string,
                    power: parseFloat(originalRegister.wrongRegister?.power as string),
                    dateTime: new Date(originalRegister.wrongRegister?.dateTime as string),
                })
            }
        }

        return records
    }
}