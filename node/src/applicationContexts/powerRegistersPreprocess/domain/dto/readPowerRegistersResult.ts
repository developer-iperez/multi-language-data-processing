import PowerRegisterResult from "./powerRegisterResult";

export default class ReadPowerRegistersResult {
    constructor(
        public result: boolean,
        public records: Array<PowerRegisterResult>
    ) {}
}