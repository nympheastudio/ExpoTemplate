import { Platform } from '@expo/eas-build-job';
import { BuildProfile } from '@expo/eas-json';
import { ActionInfo, IosActionType } from './Actions';
import { Action } from './HelperActions';
import { AccountFragment, AppleDistributionCertificateFragment, IosAppBuildCredentialsFragment, IosDistributionType as IosDistributionTypeGraphql } from '../../graphql/generated';
import { CredentialsContext } from '../context';
import { AppLookupParams } from '../ios/api/graphql/types/AppLookupParams';
import { App, Target } from '../ios/types';
export declare class ManageIos {
    protected callingAction: Action;
    protected projectDir: string;
    constructor(callingAction: Action, projectDir: string);
    runAsync(currentActions?: ActionInfo[]): Promise<void>;
    protected createProjectContextAsync(ctx: CredentialsContext, account: AccountFragment, buildProfile: BuildProfile<Platform.IOS>): Promise<{
        app: App;
        targets: Target[];
    }>;
    protected runAccountSpecificActionAsync(ctx: CredentialsContext, account: AccountFragment, action: IosActionType): Promise<void>;
    protected runProjectSpecificActionAsync(ctx: CredentialsContext, app: App, targets: Target[], buildProfile: BuildProfile<Platform.IOS>, action: IosActionType): Promise<void>;
    protected setupProvisioningProfileWithSpecificDistCertAsync(ctx: CredentialsContext, target: Target, appLookupParams: AppLookupParams, distCert: AppleDistributionCertificateFragment, distributionType: IosDistributionTypeGraphql): Promise<IosAppBuildCredentialsFragment>;
    protected selectTargetAsync(targets: Target[]): Promise<Target>;
}
