import { IosCredentials } from './types';
import { Target } from '../ios/types';
export declare function getCredentialsJsonPath(projectDir: string): string;
export declare function ensureAllTargetsAreConfigured(targets: Target[], credentialsJson: IosCredentials): void;
