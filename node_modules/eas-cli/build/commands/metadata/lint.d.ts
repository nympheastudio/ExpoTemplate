import EasCommand from '../../commandUtils/EasCommand';
export default class MetadataLint extends EasCommand {
    static description: string;
    static flags: {
        json: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        projectDir: import("../../commandUtils/context/ProjectDirContextField").default;
    };
    runAsync(): Promise<void>;
}
