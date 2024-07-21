import { AppleDevice, AppleDeviceFragment } from '../../../graphql/generated';
export declare function chooseDevicesAsync(allDevices: AppleDeviceFragment[], preselectedDeviceIdentifiers?: string[]): Promise<AppleDevice[]>;
export declare function formatDeviceLabel(device: AppleDeviceFragment): string;
