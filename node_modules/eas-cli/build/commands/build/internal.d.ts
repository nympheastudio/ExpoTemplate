import EasCommand from '../../commandUtils/EasCommand';
/**
 * This command will be run on the EAS Build workers, when building
 * directly from git. This command resolves credentials and other
 * build configuration, that normally would be included in the
 * job and metadata objects, and prints them to stdout.
 */
export default class BuildInternal extends EasCommand {
    static hidden: boolean;
    static flags: {
        platform: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        'auto-submit': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'auto-submit-with-profile': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
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
}
