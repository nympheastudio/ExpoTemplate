import EasCommand from '../commandUtils/EasCommand';
export default class Diagnostics extends EasCommand {
    static description: string;
    static contextDefinition: {
        vcsClient: import("../commandUtils/context/VcsClientContextField").default;
        projectDir: import("../commandUtils/context/ProjectDirContextField").default;
    };
    runAsync(): Promise<void>;
    private printWorkflowAsync;
}
