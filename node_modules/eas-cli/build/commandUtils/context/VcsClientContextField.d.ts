import ContextField from './ContextField';
import { Client } from '../../vcs/vcs';
export default class VcsClientContextField extends ContextField<Client> {
    getValueAsync({ vcsClientOverride }: {
        vcsClientOverride?: Client;
    }): Promise<Client>;
}
