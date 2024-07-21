/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { ProfileType } from '@expo/apple-utils';
import { ProvisioningProfile } from './Credentials.types';
import { AuthCtx } from './authenticateTypes';
export declare function createOrReuseAdhocProvisioningProfileAsync(authCtx: AuthCtx, udids: string[], bundleIdentifier: string, distCertSerialNumber: string, profileType: ProfileType): Promise<ProvisioningProfile>;
