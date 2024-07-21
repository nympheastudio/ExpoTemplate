import { AppleDeviceClass, AppleTeam } from '../../../graphql/generated';
export interface DeviceData {
    udid: string;
    name?: string;
    deviceClass: AppleDeviceClass | null;
}
export declare function promptForDeviceClassAsync(initial?: AppleDeviceClass | null): Promise<AppleDeviceClass | null>;
export declare function promptForNameAsync(initial?: string): Promise<string | undefined>;
export declare function promptForUDIDAsync(initial?: string): Promise<string>;
export declare function printDeviceData(deviceData: DeviceData, appleTeam: Pick<AppleTeam, 'appleTeamIdentifier' | 'appleTeamName'>): void;
