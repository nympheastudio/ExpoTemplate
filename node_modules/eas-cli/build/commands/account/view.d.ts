import EasCommand from '../../commandUtils/EasCommand';
export default class AccountView extends EasCommand {
    static description: string;
    static aliases: string[];
    static contextDefinition: {
        maybeLoggedIn: import("../../commandUtils/context/MaybeLoggedInContextField").default;
    };
    runAsync(): Promise<void>;
    private static getRoleOnAccount;
    private static getLabelForRole;
}
