import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleDeviceFragment, AppleDeviceInput, AppleDeviceUpdateInput } from '../../../../../graphql/generated';
export declare const AppleDeviceMutation: {
    createAppleDeviceAsync(graphqlClient: ExpoGraphqlClient, appleDeviceInput: AppleDeviceInput, accountId: string): Promise<AppleDeviceFragment>;
    deleteAppleDeviceAsync(graphqlClient: ExpoGraphqlClient, deviceId: string): Promise<string>;
    updateAppleDeviceAsync(graphqlClient: ExpoGraphqlClient, id: string, appleDeviceUpdateInput: AppleDeviceUpdateInput): Promise<AppleDeviceFragment>;
};
