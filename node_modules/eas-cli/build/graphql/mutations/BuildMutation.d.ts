import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { AndroidJobInput, BuildFragment, BuildMetadataInput, BuildParamsInput, EasBuildDeprecationInfo, IosJobInput, IosJobOverridesInput } from '../generated';
export interface BuildResult {
    build: BuildFragment;
    deprecationInfo?: EasBuildDeprecationInfo | null;
}
export declare const BuildMutation: {
    createAndroidBuildAsync(graphqlClient: ExpoGraphqlClient, input: {
        appId: string;
        job: AndroidJobInput;
        metadata: BuildMetadataInput;
        buildParams: BuildParamsInput;
    }): Promise<BuildResult>;
    createIosBuildAsync(graphqlClient: ExpoGraphqlClient, input: {
        appId: string;
        job: IosJobInput;
        metadata: BuildMetadataInput;
        buildParams: BuildParamsInput;
    }): Promise<BuildResult>;
    updateBuildMetadataAsync(graphqlClient: ExpoGraphqlClient, input: {
        buildId: string;
        metadata: BuildMetadataInput;
    }): Promise<BuildFragment>;
    retryIosBuildAsync(graphqlClient: ExpoGraphqlClient, input: {
        buildId: string;
        jobOverrides: IosJobOverridesInput;
    }): Promise<BuildFragment>;
};
