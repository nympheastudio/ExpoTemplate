/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { RequestContext } from '@expo/apple-utils';
/** Is the request context App Store Connect only with no access to cookies authentication. */
export declare function isAppStoreConnectTokenOnlyContext(authContext: RequestContext): boolean;
