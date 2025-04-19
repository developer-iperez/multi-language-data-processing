import ILogger from "../domain/interfaces/iLogger";

export default class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }

    error(message: string): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
}