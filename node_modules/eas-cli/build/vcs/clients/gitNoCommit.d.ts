import GitClient from './git';
export default class GitNoCommitClient extends GitClient {
    isCommitRequiredAsync(): Promise<boolean>;
    getRootPathAsync(): Promise<string>;
    makeShallowCopyAsync(destinationPath: string): Promise<void>;
    isFileIgnoredAsync(filePath: string): Promise<boolean>;
    trackFileAsync(file: string): Promise<void>;
}
