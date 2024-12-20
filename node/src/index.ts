import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import Application from "./application/application";
import ApplicationInputOptions from "./application/applicationInputOptions";
import PeriodInMinutesValueObject from "./applicationContexts/shared/domain/valueObjects/periodInMinutesValueObject";

const argv: any = yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'Input file full path',
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
    type: 'number',
    description: 'Fill gaps',
    default: false
  })
  .demandOption(['file'])
  .help()
  .argv;

console.log(`File: ${argv.file}, remove: ${argv.remove}, replace: ${argv.replace}, default: ${argv.default}, interval: ${argv.interval}, fill: ${argv.fill}`)

const periodInMinutes = 15
const applicationInputOptions: ApplicationInputOptions = {
    powerRegistersFilePath: argv.file,
    preProcessOptions: {
        defaultPowerValueToBeReplaced: argv.default,
        removeInvalidRegisters: argv.remove,
        replaceInvalidRegisters: argv.replace
    },
    processOptions: {
        fillGaps: argv.fill,
        periodInMinutes: new PeriodInMinutesValueObject(argv.interval)
    }
}

console.log(applicationInputOptions)

// const application = new Application()
// application.invoke(applicationInputOptions)
