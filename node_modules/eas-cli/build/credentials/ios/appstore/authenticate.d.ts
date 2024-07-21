/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { RequestContext, Session } from '@expo/apple-utils';
import { AppleTeamType, AuthCtx, AuthenticationMode, UserAuthCtx } from './authenticateTypes';
import { MinimalAscApiKey } from '../credentials';
export type Options = {
    appleId?: string;
    teamId?: string;
    teamName?: string;
    teamType?: AppleTeamType;
    ascApiKey?: MinimalAscApiKey;
    /**
     * Can be used to restore the Apple auth state via apple-utils.
     */
    cookies?: Session.AuthState['cookies'];
    /** Indicates how Apple network requests will be made. */
    mode?: AuthenticationMode;
};
export declare function isUserAuthCtx(authCtx: AuthCtx | undefined): authCtx is UserAuthCtx;
export declare function assertUserAuthCtx(authCtx: AuthCtx | undefined): UserAuthCtx;
export declare function getRequestContext(authCtx: AuthCtx): RequestContext;
export declare function authenticateAsync(options?: Options): Promise<AuthCtx>;
