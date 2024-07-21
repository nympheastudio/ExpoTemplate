import { SpawnResult } from '@expo/spawn-async';
export interface AndroidEmulator {
    pid?: string;
    name: string;
}
export declare function adbAsync(...args: string[]): Promise<SpawnResult>;
export declare function getAdbExecutableAsync(): Promise<string>;
export declare function sanitizeAdbDeviceName(deviceName: string): string | undefined;
/**
 * Return the Emulator name for an emulator ID, this can be used to determine if an emulator is booted.
 *
 * @param devicePid a value like `emulator-5554` from `abd devices`
 */
export declare function getAdbNameForDeviceIdAsync(emulatorPid: string): Promise<string | null>;
export declare function getRunningEmulatorsAsync(): Promise<AndroidEmulator[]>;
export declare function getFirstRunningEmulatorAsync(): Promise<AndroidEmulator | null>;
/**
 * Returns true if emulator is booted
 *
 * @param emulatorPid
 */
export declare function isEmulatorBootedAsync(emulatorPid: string): Promise<boolean>;
export declare function waitForEmulatorToBeBootedAsync(maxWaitTimeMs: number, intervalMs: number): Promise<AndroidEmulator>;
