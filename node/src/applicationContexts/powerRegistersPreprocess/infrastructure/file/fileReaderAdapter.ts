import { promises as fs } from 'fs'
import IFileReaderAdapter from '../../domain/interfaces/IFileReaderAdapter';

export class FileReaderAdapter implements IFileReaderAdapter {
    async readFile(filePath: string): Promise<string> {
        try {
            const fileContent = await fs.readFile(filePath, "utf-8");
            return fileContent;
        } catch (error: any) {
            throw new Error(`Error reading file: ${error.message}`);
        }
    }
}