import EasCommand from '../../commandUtils/EasCommand';
import { RequestedPlatform } from '../../platform';
declare enum InspectStage {
    ARCHIVE = "archive",
    PRE_BUILD = "pre-build",
    POST_BUILD = "post-build"
}
export default class BuildInspect extends EasCommand {
    static description: string;
    static flags: {
        platform: import("@oclif/core/lib/interfaces").OptionFlag<RequestedPlatform>;
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        stage: import("@oclif/core/lib/interfaces").OptionFlag<InspectStage>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        verbose: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static contextDefinition: {
        vcsClient: import("../../commandUtils/context/VcsClientContextField").default;
        analytics: import("../../commandUtils/context/AnalyticsContextField").default;
        projectDir: import("../../commandUtils/context/ProjectDirContextField").default;
        getDynamicPublicProjectConfigAsync: import("../../commandUtils/context/DynamicProjectConfigContextField").DynamicPublicProjectConfigContextField;
        getDynamicPrivateProjectConfigAsync: import("../../commandUtils/context/DynamicProjectConfigContextField").DynamicPrivateProjectConfigContextField;
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
    };
    runAsync(): Promise<void>;
    private prepareOutputDirAsync;
    private copyToOutputDirAsync;
}
export {};
