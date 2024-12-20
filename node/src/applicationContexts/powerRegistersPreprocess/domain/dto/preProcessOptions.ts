export default class PreProcessOptions {
    constructor(public removeInvalidRegisters: boolean, 
        public replaceInvalidRegisters: boolean, 
        public defaultPowerValueToBeReplaced: number) {}
}