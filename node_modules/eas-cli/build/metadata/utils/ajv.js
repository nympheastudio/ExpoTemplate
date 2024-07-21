"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadableErrors = exports.createValidator = void 0;
const tslib_1 = require("tslib");
const ajv_human_errors_1 = require("@segment/ajv-human-errors");
const ajv_1 = tslib_1.__importDefault(require("ajv"));
const ajv_formats_1 = tslib_1.__importDefault(require("ajv-formats"));
const jsonSchema = require('ajv/lib/refs/json-schema-draft-06.json');
/**
 * Create a new AJV validator using the JSON Schema 06 draft.
 * It also adds the additional formats from the `ajv-formats` package.
 *
 * @see https://github.com/ajv-validator/ajv-formats
 */
function createValidator() {
    const validator = new ajv_1.default({
        strict: false, // The metadata schema is shared with vscode, including vscode-only properties
        verbose: true, // Required for `ajv-human-errors`
        allErrors: true, // Required for `ajv-human-errors`
    });
    return (0, ajv_formats_1.default)(validator).addMetaSchema(jsonSchema);
}
exports.createValidator = createValidator;
function getReadableErrors(errors = []) {
    if (errors.length === 0) {
        return [];
    }
    return new ajv_human_errors_1.AggregateAjvError(errors).toJSON();
}
exports.getReadableErrors = getReadableErrors;
