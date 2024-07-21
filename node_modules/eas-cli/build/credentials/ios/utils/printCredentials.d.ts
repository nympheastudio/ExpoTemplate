import { AppLookupParams } from '../api/graphql/types/AppLookupParams';
import { App, IosAppBuildCredentialsMap, IosAppCredentialsMap, Target } from '../types';
export declare function displayEmptyIosCredentials(appLookupParams: AppLookupParams): void;
export declare function displayIosCredentials(app: App, appCredentialsMap: IosAppCredentialsMap, targets: Target[]): void;
export declare function displayProjectCredentials(app: App, appBuildCredentials: IosAppBuildCredentialsMap, targets: Omit<Target, 'entitlements'>[]): void;
