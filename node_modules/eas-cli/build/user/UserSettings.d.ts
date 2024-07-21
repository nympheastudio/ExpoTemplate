import JsonFile from '@expo/json-file';
export type UserSettingsData = {
    appleId?: string;
    amplitudeDeviceId?: string;
    amplitudeEnabled?: boolean;
    analyticsDeviceId?: string;
    analyticsEnabled?: boolean;
};
declare const UserSettings: JsonFile<UserSettingsData>;
export default UserSettings;
