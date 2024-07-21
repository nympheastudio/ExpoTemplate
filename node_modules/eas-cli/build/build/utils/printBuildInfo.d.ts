import { BuildError, BuildFragment, EasBuildDeprecationInfo } from '../../graphql/generated';
export declare function printLogsUrls(builds: BuildFragment[]): void;
export declare function printBuildResults(builds: (BuildFragment | null)[]): void;
export declare function printDeprecationWarnings(deprecationInfo?: EasBuildDeprecationInfo | null): void;
export declare function printUserError(error: BuildError, build: BuildFragment): void;
