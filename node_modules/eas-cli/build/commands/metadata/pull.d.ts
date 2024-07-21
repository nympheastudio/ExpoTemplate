import EasCommand from '../../commandUtils/EasCommand';
export default class MetadataPull extends EasCommand {
    static description: string;
    static flags: {
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        vcsClient: import("../../commandUtils/context/VcsClientContextField").default;
        analytics: import("../../commandUtils/context/AnalyticsContextField").default;
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
        privateProjectConfig: import("../../commandUtils/context/PrivateProjectConfigContextField").PrivateProjectConfigContextField;
    };
    runAsync(): Promise<void>;
}
