export default interface IFileReaderAdapter {
    readFile(filePath: string): Promise<string>
}