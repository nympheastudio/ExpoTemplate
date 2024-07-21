import { SpawnOptions, SpawnResult } from '@expo/spawn-async';
export declare function xcrunAsync(args: string[], options?: SpawnOptions): Promise<SpawnResult>;
export declare function isXcrunInstalledAsync(): Promise<boolean>;
export declare function installXcrunAsync(): Promise<void>;
