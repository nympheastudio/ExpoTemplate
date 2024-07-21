"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    // (optional) ensureRepoExistsAsync should verify whether repository exists and tooling is installed
    // it's not required for minimal support, but lack of validation might cause the failure at a later stage.
    async ensureRepoExistsAsync() { }
    // (optional) checks whether commit is necessary before calling makeShallowCopyAsync
    //
    // If it's not implemented method `makeShallowCopyAsync` needs to be able to include uncommitted changes
    // when creating copy
    async isCommitRequiredAsync() {
        return false;
    }
    // (optional) hasUncommittedChangesAsync should check whether there are changes in local repository
    async hasUncommittedChangesAsync() {
        return undefined;
    }
    // (optional) commitAsync commits changes
    //
    // - Should be implemented if hasUncommittedChangesAsync is implemented
    // - If it's not implemented method `makeShallowCopyAsync` needs to be able to include uncommitted changes
    // in project copy
    async commitAsync(_arg) {
        // it should not be called unless hasUncommittedChangesAsync is implemented
        throw new Error('commitAsync is not implemented');
    }
    // (optional) mark file as tracked, if this method is called on file, the next call to
    // `commitAsync({ commitAllFiles: false })` should commit that file
    async trackFileAsync(_file) { }
    // (optional) print diff of the changes that will be commited in the next call to
    // `commitAsync({ commitAllFiles: false })`
    async showDiffAsync() { }
    /** (optional) print list of changed files */
    async showChangedFilesAsync() { }
    // (optional) returns hash of the last commit
    // used for metadata - implementation can be safely skipped
    async getCommitHashAsync() {
        return undefined;
    }
    // (optional) returns name of the current branch
    // used for EAS Update - implementation can be safely skipped
    async getBranchNameAsync() {
        return null;
    }
    // (optional) returns message of the last commit
    // used for EAS Update - implementation can be safely skipped
    async getLastCommitMessageAsync() {
        return null;
    }
    // (optional) checks if the file is ignored, an implementation should ensure
    // that if file exists and `isFileIgnoredAsync` returns true, then that file
    // should not be included in the project tarball.
    //
    // @param filePath has to be a relative normalized path pointing to a file
    // located under the root of the repository
    async isFileIgnoredAsync(_filePath) {
        return false;
    }
}
exports.Client = Client;
