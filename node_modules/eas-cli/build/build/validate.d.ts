import { Platform } from '@expo/eas-build-job';
import { CommonContext } from './context';
export declare function checkNodeEnvVariable(ctx: CommonContext<Platform>): void;
export declare function checkGoogleServicesFileAsync<T extends Platform>(ctx: CommonContext<T>): Promise<void>;
export declare function validatePNGsForManagedProjectAsync<T extends Platform>(ctx: CommonContext<T>): Promise<void>;
