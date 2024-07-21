import EasCommand from '../../commandUtils/EasCommand';
export default class AccountLogout extends EasCommand {
    static description: string;
    static aliases: string[];
    static contextDefinition: {
        sessionManager: import("../../commandUtils/context/SessionManagementContextField").default;
    };
    runAsync(): Promise<void>;
}
