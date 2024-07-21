import { SubmitProfile } from '@expo/eas-json';
import { MetadataConfig } from './schema';
import { AppleConfigReader } from '../apple/config/reader';
import { AppleConfigWriter } from '../apple/config/writer';
/**
 * Get the static configuration file path, based on the metadata context.
 * This uses any custom name provided, but swaps out the extension for `.json`.
 */
export declare function getStaticConfigFilePath({ projectDir, profile, }: {
    projectDir: string;
    profile: SubmitProfile;
}): string;
/**
 * Load the store configuration from a metadata context.
 * This can load `.json` and `.js` config files, using `require`.
 * It throws MetadataValidationErrors when the file doesn't exist, or contains errors.
 * The user is prompted to try anyway when errors are found.
 */
export declare function loadConfigAsync({ projectDir, profile, skipValidation, }: {
    projectDir: string;
    profile: SubmitProfile;
    skipValidation?: boolean;
}): Promise<MetadataConfig>;
/** Create a versioned deserializer to fetch App Store data from the store configuration. */
export declare function createAppleReader(config: MetadataConfig): AppleConfigReader;
/** Create the serializer to write the App Store to the store configuration. */
export declare function createAppleWriter(): AppleConfigWriter;
