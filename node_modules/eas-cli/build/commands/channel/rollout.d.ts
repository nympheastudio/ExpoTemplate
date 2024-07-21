import EasCommand from '../../commandUtils/EasCommand';
import { EndOutcome } from '../../rollout/actions/EndRollout';
declare enum ActionRawFlagValue {
    CREATE = "create",
    EDIT = "edit",
    END = "end",
    VIEW = "view"
}
export default class ChannelRollout extends EasCommand {
    static description: string;
    static args: {
        name: string;
        description: string;
    }[];
    static flags: {
        json: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'non-interactive': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        action: import("@oclif/core/lib/interfaces").OptionFlag<ActionRawFlagValue | undefined>;
        percent: import("@oclif/core/lib/interfaces").OptionFlag<number | undefined>;
        outcome: import("@oclif/core/lib/interfaces").OptionFlag<EndOutcome | undefined>;
        branch: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        'runtime-version': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        'private-key-path': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    static contextDefinition: {
        loggedIn: import("../../commandUtils/context/LoggedInContextField").default;
        vcsClient: import("../../commandUtils/context/VcsClientContextField").default;
        privateProjectConfig: import("../../commandUtils/context/PrivateProjectConfigContextField").PrivateProjectConfigContextField;
    };
    runAsync(): Promise<void>;
    private getAction;
    private sanitizeArgsAndFlags;
}
export {};
