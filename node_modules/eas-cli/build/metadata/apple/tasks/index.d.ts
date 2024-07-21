import { AppVersionOptions } from './app-version';
import { AppleTask } from '../task';
type AppleTaskOptions = {
    version?: AppVersionOptions['version'];
};
/**
 * List of all eligible tasks to sync local store configuration to the App store.
 */
export declare function createAppleTasks({ version }?: AppleTaskOptions): AppleTask[];
export {};
