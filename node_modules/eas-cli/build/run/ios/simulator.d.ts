interface IosSimulator {
    runtime: string;
    osVersion: string;
    windowName: string;
    osType: 'iOS';
    state: 'Booted' | 'Shutdown';
    isAvailable: boolean;
    name: string;
    udid: string;
    lastBootedAt?: Date;
}
export declare function selectSimulatorAsync(): Promise<IosSimulator>;
export declare function getFirstBootedIosSimulatorAsync(): Promise<IosSimulator | undefined>;
export declare function getAvaliableIosSimulatorsListAsync(query?: string): Promise<IosSimulator[]>;
export declare function ensureSimulatorBootedAsync(simulator: IosSimulator): Promise<void>;
export declare function openSimulatorAppAsync(simulatorUdid: string): Promise<void>;
export declare function launchAppAsync(simulatorUdid: string, bundleIdentifier: string): Promise<void>;
export declare function ensureSimulatorAppOpenedAsync(simulatorUuid: string): Promise<void>;
export declare function installAppAsync(deviceId: string, filePath: string): Promise<void>;
export declare function getSimulatorAppIdAsync(): Promise<string | undefined>;
export {};
