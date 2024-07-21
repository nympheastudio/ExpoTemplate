import ContextField, { ContextOptions } from './ContextField';
import SessionManager from '../../user/SessionManager';
export default class SessionManagementContextField extends ContextField<SessionManager> {
    getValueAsync({ sessionManager }: ContextOptions): Promise<SessionManager>;
}
