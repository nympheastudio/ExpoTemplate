import { IosAppBuildCredentialsFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
import { AppLookupParams } from '../api/graphql/types/AppLookupParams';
import { Target } from '../types';
export declare function validateProvisioningProfileAsync(ctx: CredentialsContext, target: Target, app: AppLookupParams, buildCredentials: Partial<IosAppBuildCredentialsFragment> | null): Promise<boolean>;
