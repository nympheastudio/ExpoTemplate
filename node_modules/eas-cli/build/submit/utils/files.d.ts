import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
export declare function isExistingFileAsync(filePath: string): Promise<boolean>;
export declare function uploadAppArchiveAsync(graphqlClient: ExpoGraphqlClient, path: string): Promise<string>;
