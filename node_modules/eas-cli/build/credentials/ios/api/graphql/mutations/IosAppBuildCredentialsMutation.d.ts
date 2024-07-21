import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { IosAppBuildCredentials, IosAppBuildCredentialsFragment, IosAppBuildCredentialsInput } from '../../../../../graphql/generated';
export declare const IosAppBuildCredentialsMutation: {
    createIosAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, iosAppBuildCredentialsInput: IosAppBuildCredentialsInput, iosAppCredentialsId: string): Promise<IosAppBuildCredentials>;
    setDistributionCertificateAsync(graphqlClient: ExpoGraphqlClient, iosAppBuildCredentialsId: string, distributionCertificateId: string): Promise<IosAppBuildCredentials>;
    setProvisioningProfileAsync(graphqlClient: ExpoGraphqlClient, iosAppBuildCredentialsId: string, provisioningProfileId: string): Promise<IosAppBuildCredentialsFragment>;
};
