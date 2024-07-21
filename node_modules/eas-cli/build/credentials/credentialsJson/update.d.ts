import { AndroidAppBuildCredentialsFragment, IosDistributionType } from '../../graphql/generated';
import { CredentialsContext } from '../context';
import { App, Target } from '../ios/types';
/**
 * Update Android credentials.json with values from www, content of credentials.json
 * is not validated
 */
export declare function updateAndroidCredentialsAsync(ctx: CredentialsContext, buildCredentials: AndroidAppBuildCredentialsFragment): Promise<void>;
/**
 * Update iOS credentials in credentials.json with values from www, contents
 * of credentials.json are not validated, if www has incomplete credentials
 * credentials.json will be updated partially
 */
export declare function updateIosCredentialsAsync(ctx: CredentialsContext, app: App, targets: Target[], distributionType: IosDistributionType): Promise<void>;
