import PowerRegister from "../../../shared/domain/entities/powerRegister";

export default class PowerRegistersSort {
    sort(input: Array<PowerRegister>): Array<PowerRegister> {
        if (!input || input.length === 0)
            return []

        return input.sort((a: PowerRegister, b: PowerRegister) => {
            return a.dateTime.getTime() - b.dateTime.getTime()
        })
    }
}