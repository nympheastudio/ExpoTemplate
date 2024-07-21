import { Client } from '../vcs';
export default class NoVcsClient extends Client {
    getRootPathAsync(): Promise<string>;
    makeShallowCopyAsync(destinationPath: string): Promise<void>;
    isFileIgnoredAsync(filePath: string): Promise<boolean>;
    canGetLastCommitMessage(): boolean;
}
