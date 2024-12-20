"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PowerRegistersReader {
    constructor(fileReaderAdapter) {
        this.fileReaderAdapter = fileReaderAdapter;
    }
    async readPowerRegisters(filePath) {
        if (!filePath)
            throw new Error('inputPath cannot be null or empty');
        try {
            const fileContent = await this.fileReaderAdapter.readFile(filePath);
            const lines = fileContent.split("\n");
            const records = [];
            for (const line of lines) {
                if (line.trim() === '')
                    continue;
                const [nameField, valueField, valueDate] = line.split(',');
                if (this.areValidFields(nameField, valueField, valueDate)) {
                    records.push({
                        result: true,
                        register: {
                            name: nameField,
                            power: parseFloat(valueField),
                            dateTime: new Date(valueDate)
                        },
                        wrongRegister: null
                    });
                }
                else {
                    records.push({
                        result: false,
                        register: null,
                        wrongRegister: {
                            name: nameField,
                            power: valueField,
                            dateTime: valueDate
                        }
                    });
                }
            }
            return {
                result: true,
                records
            };
        }
        catch (error) {
            return {
                result: false,
                records: []
            };
        }
    }
    areValidFields(nameField, valueField, valueDate) {
        if (!nameField)
            return false;
        if (isNaN(parseFloat(valueField)))
            return false;
        const tempDate = new Date(valueDate);
        if (isNaN(tempDate.getTime()))
            return false;
        return true;
    }
}
exports.default = PowerRegistersReader;
