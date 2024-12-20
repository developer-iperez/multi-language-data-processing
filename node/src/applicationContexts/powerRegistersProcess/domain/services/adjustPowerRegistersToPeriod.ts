import PowerRegister from "../../../shared/domain/entities/powerRegister";
import PeriodInMinutesValueObject from "../../../shared/domain/valueObjects/periodInMinutesValueObject";

export default class AdjustPowerRegistersToPeriod {
    adjustToPeriod(periodInMinutes: PeriodInMinutesValueObject, powerRegisters: Array<PowerRegister>): Array<PowerRegister> {
        if (powerRegisters.length == 0)
            return []
        if (powerRegisters.length == 1)
            return powerRegisters

        const name = powerRegisters[0].name
        const period = periodInMinutes.value
        const groupedRegisters = new Map<string, number[]>()
        const powerRegisterGroupedByPeriod: Array<PowerRegister> = []

        powerRegisters.forEach((powerRegister) => {
            const roundedDate = this.roundDateToPeriod(powerRegister.dateTime, period)
            const key = roundedDate.toISOString()

            if (!groupedRegisters.get(key))
                groupedRegisters.set(key, [])

            groupedRegisters.get(key)!.push(powerRegister.power)
        })
        
        for (const [key, values] of groupedRegisters.entries()) {
            const average = values.reduce((acc, value) => acc + value, 0) / values.length
            powerRegisterGroupedByPeriod.push({
                name,
                power: average,
                dateTime: new Date(key)
            })
        }

        return powerRegisterGroupedByPeriod
    }

    private roundDateToPeriod(date: Date, period: number): Date {
        const roundedDate = new Date(date)
        const roundedMinutes = Math.floor(roundedDate.getMinutes() / period) * period

        roundedDate.setMinutes(roundedMinutes, 0, 0)        
        return roundedDate
    }
}