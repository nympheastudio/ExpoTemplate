/// <reference types="node" />
export declare const ANDROID_DEFAULT_LOCATION: Readonly<Partial<Record<NodeJS.Platform, string>>>;
export declare function getAndroidSdkRootAsync(): Promise<string | null>;
