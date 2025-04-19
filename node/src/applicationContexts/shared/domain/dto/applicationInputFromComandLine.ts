export default interface ApplicationInputFromComandLine {
    inputFilePath: string
    outputFilePath: string
    skipFirstRowFromInputFile: boolean
    removeInvalidRegisters: boolean, 
    replaceInvalidRegisters: boolean, 
    defaultPowerValue: number,
    fillGaps: string,
    periodInMinutes: number
}