import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleProvisioningProfileFragment, AppleProvisioningProfileInput, AppleTeamFragment } from '../../../../../graphql/generated';
export type AppleProvisioningProfileMutationResult = AppleProvisioningProfileFragment & {
    appleTeam?: AppleTeamFragment | null;
};
export declare const AppleProvisioningProfileMutation: {
    createAppleProvisioningProfileAsync(graphqlClient: ExpoGraphqlClient, appleProvisioningProfileInput: AppleProvisioningProfileInput, accountId: string, appleAppIdentifierId: string): Promise<AppleProvisioningProfileMutationResult>;
    updateAppleProvisioningProfileAsync(graphqlClient: ExpoGraphqlClient, appleProvisioningProfileId: string, appleProvisioningProfileInput: {
        appleProvisioningProfile: string;
        developerPortalIdentifier?: string;
    }): Promise<AppleProvisioningProfileMutationResult>;
    deleteAppleProvisioningProfilesAsync(graphqlClient: ExpoGraphqlClient, appleProvisioningProfileIds: string[]): Promise<void>;
};
