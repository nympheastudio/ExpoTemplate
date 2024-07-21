import { HumanError } from '@segment/ajv-human-errors';
import Ajv, { ErrorObject } from 'ajv';
/**
 * Create a new AJV validator using the JSON Schema 06 draft.
 * It also adds the additional formats from the `ajv-formats` package.
 *
 * @see https://github.com/ajv-validator/ajv-formats
 */
export declare function createValidator(): Ajv;
export declare function getReadableErrors(errors?: ErrorObject[]): HumanError[];
