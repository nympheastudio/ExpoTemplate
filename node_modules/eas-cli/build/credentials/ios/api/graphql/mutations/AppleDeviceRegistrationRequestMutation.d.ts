import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleDeviceRegistrationRequestFragment } from '../../../../../graphql/generated';
export declare const AppleDeviceRegistrationRequestMutation: {
    createAppleDeviceRegistrationRequestAsync(graphqlClient: ExpoGraphqlClient, appleTeamId: string, accountId: string): Promise<AppleDeviceRegistrationRequestFragment>;
};
