import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleAppIdentifierFragment, AppleDeviceFragment, AppleProvisioningProfileFragment, AppleTeamFragment, IosDistributionType } from '../../../../../graphql/generated';
export type AppleProvisioningProfileQueryResult = AppleProvisioningProfileFragment & {
    appleTeam?: AppleTeamFragment | null;
} & {
    appleDevices: AppleDeviceFragment[];
} & {
    appleAppIdentifier: AppleAppIdentifierFragment;
};
export declare const AppleProvisioningProfileQuery: {
    getForAppAsync(graphqlClient: ExpoGraphqlClient, projectFullName: string, { appleAppIdentifierId, iosDistributionType, }: {
        appleAppIdentifierId: string;
        iosDistributionType: IosDistributionType;
    }): Promise<AppleProvisioningProfileQueryResult | null>;
};
