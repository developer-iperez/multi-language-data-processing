"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const powerRegistersReader_1 = __importDefault(require("../domain/services/powerRegistersReader"));
class PowerRegisterReader {
    constructor(fileReaderAdapter, powerRegistersReader) {
        this.fileReaderAdapter = fileReaderAdapter;
        this.powerRegistersReader = powerRegistersReader;
        this.powerRegistersReader = new powerRegistersReader_1.default(this.fileReaderAdapter);
    }
    async readPowerRegisters(filePath) {
        try {
            const registers = await this.powerRegistersReader.readPowerRegisters(filePath);
            return { registers };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.default = PowerRegisterReader;
