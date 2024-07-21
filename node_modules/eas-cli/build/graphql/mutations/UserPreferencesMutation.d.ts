import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { UserPreferencesOnboardingInput } from '../generated';
export declare const UserPreferencesMutation: {
    markCliDoneInOnboardingUserPreferencesAsync(graphqlClient: ExpoGraphqlClient, userPreferencesData: Partial<UserPreferencesOnboardingInput> & {
        appId: string;
    }): Promise<{
        isCLIDone: boolean;
        appId: string;
    }>;
};
