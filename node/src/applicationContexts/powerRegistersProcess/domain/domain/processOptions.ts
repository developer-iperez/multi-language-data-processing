import PeriodInMinutesValueObject from "../../../shared/domain/valueObjects/periodInMinutesValueObject";

export default class ProcessOptions {
    constructor(public fillGaps: boolean, public periodInMinutes: PeriodInMinutesValueObject) {}
}