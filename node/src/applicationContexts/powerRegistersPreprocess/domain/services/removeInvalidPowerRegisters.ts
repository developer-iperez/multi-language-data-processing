import PowerRegister from "../../../shared/domain/entities/powerRegister";
import PowerRegisterResult from "../dto/powerRegisterResult";

export class RemoveInvalidPowerRegisters {
    removeInvalidRegisters(records: Array<PowerRegisterResult>): Array<PowerRegister> {
        if (records.length === 0) 
            return []
        
        const processedRecords = records.filter(record => record.result === true).map(record => record.register) as Array<PowerRegister> 
        return processedRecords
    }
}