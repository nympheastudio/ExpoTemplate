import EasCommand from '../../commandUtils/EasCommand';
import { WebhookType } from '../../graphql/generated';
export default class WebhookUpdate extends EasCommand {
    static description: string;
    static flags: {
        'non-interactive': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        id: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        event: import("@oclif/core/lib/interfaces").OptionFlag<WebhookType | undefined>;
        url: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        secret: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
    };
    runAsync(): Promise<void>;
}
