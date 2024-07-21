export declare abstract class Client {
    abstract makeShallowCopyAsync(destinationPath: string): Promise<void>;
    abstract getRootPathAsync(): Promise<string>;
    ensureRepoExistsAsync(): Promise<void>;
    isCommitRequiredAsync(): Promise<boolean>;
    hasUncommittedChangesAsync(): Promise<boolean | undefined>;
    commitAsync(_arg: {
        commitMessage: string;
        commitAllFiles?: boolean;
        nonInteractive: boolean;
    }): Promise<void>;
    trackFileAsync(_file: string): Promise<void>;
    showDiffAsync(): Promise<void>;
    /** (optional) print list of changed files */
    showChangedFilesAsync(): Promise<void>;
    getCommitHashAsync(): Promise<string | undefined>;
    getBranchNameAsync(): Promise<string | null>;
    getLastCommitMessageAsync(): Promise<string | null>;
    isFileIgnoredAsync(_filePath: string): Promise<boolean>;
    /**
     * Whether this VCS client can get the last commit message.
     * Used for EAS Update - implementation can be false for noVcs client.
     */
    abstract canGetLastCommitMessage(): boolean;
}
