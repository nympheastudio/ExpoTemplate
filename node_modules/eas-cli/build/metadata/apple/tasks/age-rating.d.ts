/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { AgeRatingDeclaration } from '@expo/apple-utils';
import { AppleTask, TaskDownloadOptions, TaskPrepareOptions, TaskUploadOptions } from '../task';
export type AgeRatingData = {
    /** The app age rating declaration for the app version */
    ageRating: AgeRatingDeclaration;
};
export declare class AgeRatingTask extends AppleTask {
    name: () => string;
    prepareAsync({ context }: TaskPrepareOptions): Promise<void>;
    downloadAsync({ config, context }: TaskDownloadOptions): Promise<void>;
    uploadAsync({ config, context }: TaskUploadOptions): Promise<void>;
}
