export default interface IFileWriterAdapter {
    readFile(filePath: string, content: string): Promise<boolean>
}