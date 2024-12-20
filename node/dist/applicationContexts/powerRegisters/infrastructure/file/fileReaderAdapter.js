"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReaderAdapter = void 0;
const fs_1 = require("fs");
class FileReaderAdapter {
    async readFile(filePath) {
        try {
            const fileContent = await fs_1.promises.readFile(filePath, "utf-8");
            return fileContent;
        }
        catch (error) {
            throw new Error(`Error reading file: ${error.message}`);
        }
    }
}
exports.FileReaderAdapter = FileReaderAdapter;
