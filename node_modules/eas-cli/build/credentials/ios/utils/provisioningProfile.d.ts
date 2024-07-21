import { PlistObject } from '@expo/plist';
interface AppleTeam {
    teamId: string;
    teamName: string;
}
export declare function readAppleTeam(dataBase64: string): AppleTeam;
export declare function readProfileName(dataBase64: string): string;
export declare function isAdHocProfile(dataBase64: string): boolean;
export declare function isEnterpriseUniversalProfile(dataBase64: string): boolean;
export declare function parse(dataBase64: string): PlistObject;
export {};
