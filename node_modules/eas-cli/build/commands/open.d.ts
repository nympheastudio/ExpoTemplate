import EasCommand from '../commandUtils/EasCommand';
export default class Open extends EasCommand {
    static description: string;
    static contextDefinition: {
        loggedIn: import("../commandUtils/context/LoggedInContextField").default;
        privateProjectConfig: import("../commandUtils/context/PrivateProjectConfigContextField").PrivateProjectConfigContextField;
    };
    runAsync(): Promise<void>;
}
