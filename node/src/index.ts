import Application from "./application/application";
import ApplicationInputOptions from "./application/applicationInputOptions";
import PeriodInMinutesValueObject from "./applicationContexts/shared/domain/valueObjects/periodInMinutesValueObject";

const periodInMinutes = 15
const applicationInputOptions: ApplicationInputOptions = {
    powerRegistersFilePath: '',
    preProcessOptions: {
        defaultPowerValueToBeReplaced: 1,
        removeInvalidRegisters: true,
        replaceInvalidRegisters: true
    },
    processOptions: {
        fillGaps: true,
        periodInMinutes: new PeriodInMinutesValueObject(periodInMinutes)
    }
}

const application = new Application()
application.invoke(applicationInputOptions)
