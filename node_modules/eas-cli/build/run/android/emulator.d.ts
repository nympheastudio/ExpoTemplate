import { AndroidEmulator } from './adb';
export declare const EMULATOR_MAX_WAIT_TIMEOUT_MS: number;
export declare function getEmulatorExecutableAsync(): Promise<string>;
export declare function selectEmulatorAsync(): Promise<AndroidEmulator>;
export declare function ensureEmulatorBootedAsync(emulator: AndroidEmulator): Promise<AndroidEmulator>;
export declare function installAppAsync(emulator: AndroidEmulator, apkFilePath: string): Promise<void>;
export declare function startAppAsync(emulator: AndroidEmulator, packageName: string, activityName: string): Promise<void>;
