import Joi from 'joi';
import { GoogleServiceAccountKeyFragment } from '../../../graphql/generated';
import { GoogleServiceAccountKey } from '../credentials';
export declare const MinimalGoogleServiceAccountKeySchema: Joi.ObjectSchema<any>;
export declare function readAndValidateServiceAccountKey(keyJsonPath: string): GoogleServiceAccountKey;
export declare function selectGoogleServiceAccountKeyAsync(keys: GoogleServiceAccountKeyFragment[]): Promise<GoogleServiceAccountKeyFragment>;
export declare function detectGoogleServiceAccountKeyPathAsync(projectDir: string): Promise<string | null>;
