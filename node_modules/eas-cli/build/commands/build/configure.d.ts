import EasCommand from '../../commandUtils/EasCommand';
export default class BuildConfigure extends EasCommand {
    static description: string;
    static flags: {
        platform: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        vcsClient: import("../../commandUtils/context/VcsClientContextField").default;
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
        privateProjectConfig: import("../../commandUtils/context/PrivateProjectConfigContextField").PrivateProjectConfigContextField;
    };
    runAsync(): Promise<void>;
}
