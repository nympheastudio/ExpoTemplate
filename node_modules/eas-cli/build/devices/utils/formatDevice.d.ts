import { AppleDevice, AppleTeam } from '../../graphql/generated';
type Device = Pick<AppleDevice, 'id' | 'identifier' | 'name' | 'deviceClass' | 'enabled' | 'model'>;
type NewDevice = Pick<AppleDevice, 'identifier' | 'name' | 'deviceClass'>;
export type AppleTeamIdAndName = Pick<AppleTeam, 'appleTeamIdentifier' | 'appleTeamName'>;
export default function formatDevice(device: Device, team?: AppleTeamIdAndName): string;
export declare function formatNewDevice(device: NewDevice, team?: AppleTeamIdAndName): string;
export {};
