import EasCommand from '../../commandUtils/EasCommand';
export default class WebhookView extends EasCommand {
    static description: string;
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static contextDefinition: {
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
    };
    runAsync(): Promise<void>;
}
