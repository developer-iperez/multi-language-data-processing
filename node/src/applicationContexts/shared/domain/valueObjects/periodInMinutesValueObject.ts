export default class PeriodInMinutesValueObject {
    
    private period: number
    
    constructor(periodInMinutes: number) {
        if (!this.isValidPeriod(periodInMinutes))
            throw new Error('Period must be 15, 30 or 60 minutes')

        this.period = periodInMinutes
    }

    get value(): number {
        return this.period
    }

    private isValidPeriod(periodInMinutes: number) {
        return [15, 30, 60].some(x => x === periodInMinutes)
    }
}