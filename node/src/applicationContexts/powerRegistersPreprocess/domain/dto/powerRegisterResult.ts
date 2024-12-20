import PowerRegister from "../../../shared/domain/entities/powerRegister";
import WrongPowerRegister from "./wrongPowerRegister";

export default class PowerRegisterResult {
    constructor(
        public result: boolean,
        public register: PowerRegister | null,
        public wrongRegister: WrongPowerRegister | null
    ) {}
}