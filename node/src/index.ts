import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import Application from "./application/application";
import ApplicationInputOptions from "./applicationContexts/shared/domain/dto/applicationInputOptions";
import PeriodInMinutesValueObject from "./applicationContexts/shared/domain/valueObjects/periodInMinutesValueObject";
import PowerRegisterReader from './applicationContexts/powerRegistersPreprocess/application/powerRegisterReader';
import PowerRegisterPreprocess from './applicationContexts/powerRegistersPreprocess/application/powerRegistersPreprocess';
import { FileReaderAdapter } from './applicationContexts/powerRegistersPreprocess/infrastructure/file/fileReaderAdapter';
import PowerRegistersProcess from './applicationContexts/powerRegistersProcess/application/powerRegistersProcess';
import ConsoleLogger from './applicationContexts/shared/infrastructure/consoleLogger';
import PowerRegistersExporter from './applicationContexts/powerRegistersExport/application/powerRegistersExported';
import InputOptionsBuilder from './applicationContexts/powerRegistersPreprocess/domain/services/inputOptionsBuilder';
import ApplicationInputFromComandLine from './applicationContexts/shared/domain/dto/applicationInputFromComandLine';

const argv: any = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'in',
    type: 'string',
    description: 'Input file full path',
  })
  .option('output', {
    alias: 'out',
    type: 'string',
    description: 'Input file full path',
  })
  .option('skipfirst', {
    alias: 's',
    type: 'boolean',
    description: 'Skip the first row of the input file',
    default: false
  })
  .option('remove', {
    alias: 'r',
    type: 'boolean',
    description: 'Remove invalid registers',
    default: false
  })
  .option('replace', {
    alias: 'e',
    type: 'boolean',
    description: 'Replace invalid registers for the default value given by the user',
    default: false
  })
  .option('default', {
    alias: 'd',
    type: 'number',
    description: 'Default value for missing values',
    default: 0
  })
  .option('interval', {
    alias: 'i',
    type: 'number',
    description: 'Interval period for data, in minutes',
    default: 15
  })
  .option('fill', {
    alias: 'f',
    type: 'string',
    description: 'Fill gaps',
    default: 'disabled'
  })
  .demandOption(['input', 'output'])
  .help()
  .argv

console.log(`Input: ${argv.input}, Output: ${argv.input}, skip_first: ${argv.skipfirst}, remove: ${argv.remove}, replace: ${argv.replace}, default: ${argv.default}, interval: ${argv.interval}, fill: ${argv.fill}`)

try {
  const applicationInputFromCommandLine: ApplicationInputFromComandLine = {
    inputFilePath: argv.input,
    outputFilePath: argv.output,
    skipFirstRowFromInputFile: argv.skipfirst || false,
    defaultPowerValue: argv.default,
    removeInvalidRegisters: argv.remove,
    replaceInvalidRegisters: argv.replace,
    fillGaps: argv.fill,
    periodInMinutes: argv.interval
  }

  const logger = new ConsoleLogger()
  const inputOptionsBuilder = new InputOptionsBuilder()
  const powerRegisterReader = new PowerRegisterReader(new FileReaderAdapter())
  const powerRegisterPreprocess = new PowerRegisterPreprocess()
  const powerRegistersProcess = new PowerRegistersProcess()
  const powerRegistersExporter = new PowerRegistersExporter()
  const applicationInputOptions = inputOptionsBuilder.build(applicationInputFromCommandLine)

  const application = new Application(powerRegisterReader, powerRegisterPreprocess, powerRegistersProcess, powerRegistersExporter, logger)
  application.invoke(applicationInputOptions)
} catch (error: any) {
  console.log(`Application error: ${error?.message}`)
}
