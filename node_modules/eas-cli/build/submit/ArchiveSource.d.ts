import { Platform } from '@expo/eas-build-job';
import { ExpoGraphqlClient } from '../commandUtils/context/contextUtils/createGraphqlClient';
import { BuildFragment } from '../graphql/generated';
export declare const BUILD_LIST_ITEM_COUNT = 4;
export declare enum ArchiveSourceType {
    url = 0,
    latest = 1,
    path = 2,
    buildId = 3,
    build = 4,
    buildList = 5,
    prompt = 6,
    gcs = 7
}
export interface ArchiveResolverContext {
    platform: Platform;
    projectId: string;
    nonInteractive: boolean;
    graphqlClient: ExpoGraphqlClient;
}
interface ArchiveSourceBase {
    sourceType: ArchiveSourceType;
}
interface ArchiveUrlSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.url;
    url: string;
}
interface ArchiveLatestSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.latest;
}
interface ArchivePathSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.path;
    path: string;
}
interface ArchiveBuildIdSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.buildId;
    id: string;
}
interface ArchiveBuildSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.build;
    build: BuildFragment;
}
interface ArchiveBuildListSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.buildList;
}
interface ArchivePromptSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.prompt;
}
interface ArchiveGCSSource extends ArchiveSourceBase {
    sourceType: ArchiveSourceType.gcs;
    bucketKey: string;
    localSource: ArchivePathSource;
}
export type ArchiveSource = ArchiveUrlSource | ArchiveLatestSource | ArchivePathSource | ArchiveBuildIdSource | ArchiveBuildSource | ArchiveBuildListSource | ArchivePromptSource | ArchiveGCSSource;
export type ResolvedArchiveSource = ArchiveUrlSource | ArchiveGCSSource | ArchiveBuildSource;
export declare function getArchiveAsync(ctx: ArchiveResolverContext, source: ArchiveSource): Promise<ResolvedArchiveSource>;
export declare function isUuidV4(s: string): boolean;
export {};
