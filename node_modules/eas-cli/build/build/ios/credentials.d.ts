import { Platform } from '@expo/eas-build-job';
import { BuildProfile } from '@expo/eas-json';
import { CredentialsContext } from '../../credentials/context';
import { IosCredentials, Target } from '../../credentials/ios/types';
import { CredentialsResult } from '../build';
import { BuildContext } from '../context';
export declare function ensureIosCredentialsAsync(buildCtx: BuildContext<Platform.IOS>, targets: Target[]): Promise<CredentialsResult<IosCredentials> | undefined>;
export declare function ensureIosCredentialsForBuildResignAsync(credentialsCtx: CredentialsContext, targets: Target[], buildProfile: BuildProfile<Platform.IOS>): Promise<CredentialsResult<IosCredentials>>;
