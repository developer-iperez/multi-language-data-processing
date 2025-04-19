import PowerValueObject from "../../../shared/domain/valueObjects/defaultPowerValueObject";

export default class PreProcessOptions {
    constructor(public removeInvalidRegisters: boolean, 
        public replaceInvalidRegisters: boolean, 
        public defaultPowerValueToBeReplaced: PowerValueObject) {}
}