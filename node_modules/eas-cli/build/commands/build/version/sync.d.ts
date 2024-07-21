import EasCommand from '../../../commandUtils/EasCommand';
export default class BuildVersionSyncView extends EasCommand {
    static description: string;
    static flags: {
        platform: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        vcsClient: import("../../../commandUtils/context/VcsClientContextField").default;
        projectDir: import("../../../commandUtils/context/ProjectDirContextField").default;
        getDynamicPublicProjectConfigAsync: import("../../../commandUtils/context/DynamicProjectConfigContextField").DynamicPublicProjectConfigContextField;
        getDynamicPrivateProjectConfigAsync: import("../../../commandUtils/context/DynamicProjectConfigContextField").DynamicPrivateProjectConfigContextField;
        loggedIn: import("../../../commandUtils/context/LoggedInContextField").default;
    };
    runAsync(): Promise<void>;
    private syncIosAsync;
    private syncAndroidAsync;
}
