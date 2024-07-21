export declare function isGitInstalledAsync(): Promise<boolean>;
export declare function doesGitRepoExistAsync(cwd: string | undefined): Promise<boolean>;
interface GitStatusOptions {
    showUntracked: boolean;
    cwd: string | undefined;
}
export declare function gitStatusAsync({ showUntracked, cwd }: GitStatusOptions): Promise<string>;
export declare function getGitDiffOutputAsync(cwd: string | undefined): Promise<string>;
export declare function gitDiffAsync({ withPager, cwd, }: {
    withPager?: boolean;
    cwd: string | undefined;
}): Promise<void>;
export {};
