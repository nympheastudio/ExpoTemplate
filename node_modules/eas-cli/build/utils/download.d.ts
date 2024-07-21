import { AppPlatform } from '../graphql/generated';
export declare function downloadAndMaybeExtractAppAsync(url: string, platform: AppPlatform, cachedAppPath?: string): Promise<string>;
export declare function extractAppFromLocalArchiveAsync(appArchivePath: string, platform: AppPlatform): Promise<string>;
