import PowerRegister from "../../../shared/domain/entities/powerRegister"
import PeriodInMinutesValueObject from "../../../shared/domain/valueObjects/periodInMinutesValueObject"

export default class FillGapsInPowerRegistersCollection {
    fillGaps(periodInMinutes: PeriodInMinutesValueObject, powerRegisters: Array<PowerRegister>): Array<PowerRegister> {
        if (powerRegisters.length == 0)
            return []
        
        const name = powerRegisters[0].name
        const datosInterpolados = this.interpolateData(powerRegisters, periodInMinutes.value, name);
        return datosInterpolados
    }

    private interpolateData(registers: Array<PowerRegister>, periodInMinutes: number, name: string): Array<PowerRegister> {
        const MILLISECONDS_IN_MINUTE = 60 * 1000
        const result: Array<PowerRegister> = []

        for (let i = 0; i < registers.length - 1; i++) {
            const begin = registers[i]
            const end = registers[i + 1]
            result.push(begin)

            const timeDifferenceInMinutes = (end.dateTime.getTime() - begin.dateTime.getTime()) / MILLISECONDS_IN_MINUTE
            const steps = Math.floor(timeDifferenceInMinutes / periodInMinutes)

            if (steps < 1) {
                // There are no intermediate steps, got to the next interval
                continue
            }

            const increment = (end.power - begin.power) / steps

            for (let j = 1; j < steps; j++) {
                const interpolatedDate = new Date(begin.dateTime.getTime() + j * periodInMinutes * MILLISECONDS_IN_MINUTE)
                const interpolatedValue = begin.power + increment * j

                result.push({ 
                    name,
                    power: interpolatedValue,
                    dateTime: interpolatedDate
                })
            }
        }

        result.push(registers[registers.length - 1])

        return result
    }
}