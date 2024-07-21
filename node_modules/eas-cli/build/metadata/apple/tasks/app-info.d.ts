/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { AppInfo, AppInfoLocalization } from '@expo/apple-utils';
import { AppleTask, TaskDownloadOptions, TaskPrepareOptions, TaskUploadOptions } from '../task';
export type AppInfoData = {
    /** The current app info that should be edited */
    info: AppInfo;
    /** All info locales that are enabled */
    infoLocales: AppInfoLocalization[];
};
export declare class AppInfoTask extends AppleTask {
    name: () => string;
    prepareAsync({ context }: TaskPrepareOptions): Promise<void>;
    downloadAsync({ config, context }: TaskDownloadOptions): Promise<void>;
    uploadAsync({ config, context }: TaskUploadOptions): Promise<void>;
}
