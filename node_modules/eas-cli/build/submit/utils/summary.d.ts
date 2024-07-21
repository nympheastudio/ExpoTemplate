import { ResolvedArchiveSource } from '../ArchiveSource';
export interface ArchiveSourceSummaryFields {
    archiveUrl?: string;
    archivePath?: string;
    formattedBuild?: string;
}
export declare function formatArchiveSourceSummary(archive: ResolvedArchiveSource): ArchiveSourceSummaryFields;
export declare function printSummary<T extends object>(summary: T, keyMap: Record<keyof T, string>): void;
