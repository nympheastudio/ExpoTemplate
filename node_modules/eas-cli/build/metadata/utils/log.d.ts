import { Ora } from '../../ora';
type LogAsyncOptions = {
    /** If the spinner representing the async action should be hidden, e.g. for JSON output */
    hidden?: boolean;
    /** The message to display when the action is pending */
    pending: string;
    /** The message to display when the action succeeded */
    success: string;
    /** The message to display when the action failed */
    failure: string;
};
/**
 * Log an asynchronous action using a spinner.
 */
export declare function logAsync<T>(action: (spinner?: Ora) => Promise<T>, { hidden, ...message }: LogAsyncOptions): Promise<T>;
export {};
