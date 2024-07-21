/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { AppStoreReviewDetail } from '@expo/apple-utils';
import { AppleTask, TaskDownloadOptions, TaskPrepareOptions, TaskUploadOptions } from '../task';
export type AppReviewData = {
    /** The current app info that should be edited */
    reviewDetail: AppStoreReviewDetail;
};
/** Handle all contact, demo account, or instruction info that are required for the App Store review team. */
export declare class AppReviewDetailTask extends AppleTask {
    name: () => string;
    prepareAsync({ context }: TaskPrepareOptions): Promise<void>;
    downloadAsync({ config, context }: TaskDownloadOptions): Promise<void>;
    uploadAsync({ config, context }: TaskUploadOptions): Promise<void>;
}
