import { Platform } from '@expo/eas-build-job';
import EasCommand from '../../commandUtils/EasCommand';
export default class InitializeBuildCredentials extends EasCommand {
    static description: string;
    static flags: {
        platform: import("@oclif/core/lib/interfaces").OptionFlag<Platform | undefined>;
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        vcsClient: import("../../commandUtils/context/VcsClientContextField").default;
        analytics: import("../../commandUtils/context/AnalyticsContextField").default;
        getDynamicPublicProjectConfigAsync: import("../../commandUtils/context/DynamicProjectConfigContextField").DynamicPublicProjectConfigContextField;
        getDynamicPrivateProjectConfigAsync: import("../../commandUtils/context/DynamicProjectConfigContextField").DynamicPrivateProjectConfigContextField;
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
        privateProjectConfig: import("../../commandUtils/context/PrivateProjectConfigContextField").PrivateProjectConfigContextField;
    };
    runAsync(): Promise<void>;
}
