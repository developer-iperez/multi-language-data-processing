import ProcessOptions from "../domain/domain/processOptions"
import AdjustPowerRegistersToPeriod from "../domain/services/adjustPowerRegistersToPeriod"
import FillGapsInPowerRegistersCollection from "../domain/services/fillGapsInPowerRegistersCollection"
import PowerRegister from "../../shared/domain/entities/powerRegister"
import IPowerRegistersProcess from "../domain/interfaces/IPowerRegistersProcess"

export default class PowerRegistersProcess implements IPowerRegistersProcess {
    processRegisters(processOptions: ProcessOptions, inputPowerRegisters: Array<PowerRegister>): Array<PowerRegister> {
        const adjustPowerRegistersToPeriod = new AdjustPowerRegistersToPeriod()
        let outputProcessedPowerRegisters = adjustPowerRegistersToPeriod.adjustToPeriod(processOptions.periodInMinutes, inputPowerRegisters)

        if (processOptions.fillGaps) {
            const fillGapsInPowerRegistersCollection = new FillGapsInPowerRegistersCollection()
            outputProcessedPowerRegisters = fillGapsInPowerRegistersCollection.fillGaps(processOptions.periodInMinutes, outputProcessedPowerRegisters)
        }

        return outputProcessedPowerRegisters
    }
}