export default class DefaultPowerValueObject {
    
    private power: number
    
    constructor(power: number) {
        if (!this.isValidPowerValue(power))
            throw new Error('Default power value must be a number')

        this.power = power
    }

    get value(): number {
        return this.power
    }

    private isValidPowerValue(power: number) {
        return !isNaN(power)
    }
}