/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { Auth } from '@expo/apple-utils';
import { AppleTeamType, Team } from './authenticateTypes';
import { MinimalAscApiKey } from '../credentials';
/**
 * Get the username and possibly the password from the environment variables or the supplied options.
 * Password is optional because it's only needed for authentication, but not for re-authentication.
 *
 * @param options
 */
export declare function resolveUserCredentialsAsync(options: Partial<Auth.UserCredentials>): Promise<Partial<Auth.UserCredentials>>;
export declare function hasAscEnvVars(): boolean;
export declare function resolveAscApiKeyAsync(ascApiKey?: MinimalAscApiKey): Promise<MinimalAscApiKey>;
export declare function resolveAppleTeamAsync(options?: {
    teamId?: string;
    teamName?: string;
    teamType?: AppleTeamType;
}): Promise<Team>;
export declare function promptPasswordAsync({ username, }: Pick<Auth.UserCredentials, 'username'>): Promise<string>;
export declare function deletePasswordAsync({ username, }: Pick<Auth.UserCredentials, 'username'>): Promise<boolean>;
