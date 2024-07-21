/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { App, Session } from '@expo/apple-utils';
import { ExpoConfig } from '@expo/config';
import { SubmitProfile } from '@expo/eas-json';
import { CredentialsContext } from '../credentials/context';
export type MetadataAppStoreAuthentication = {
    /** The root entity of the App store */
    app: App;
    /** The authentication state we used to fetch the root entity */
    auth: Partial<Session.AuthState>;
};
/**
 * To start syncing ASC entities, we need access to the apple utils App instance.
 * This resolves both the authentication and that App instance.
 */
export declare function getAppStoreAuthAsync({ projectDir, profile, exp, credentialsCtx, }: {
    projectDir: string;
    profile: SubmitProfile;
    exp: ExpoConfig;
    credentialsCtx: CredentialsContext;
}): Promise<MetadataAppStoreAuthentication>;
