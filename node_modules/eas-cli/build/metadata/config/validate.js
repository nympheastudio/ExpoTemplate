"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const issue_1 = require("./issue");
const rules_1 = require("../apple/rules");
const ajv_1 = require("../utils/ajv");
const metadataSchema = require('../../../schema/metadata-0.json');
/** Validate the user-provided validation for issues */
function validateConfig(config) {
    const validator = (0, ajv_1.createValidator)().compile(metadataSchema);
    validator(config);
    const issues = (0, ajv_1.getReadableErrors)(validator.errors ?? []).map(error => {
        const path = error.path === '$' ? [] : error.path.substring(2).split('.');
        const id = error.original?.keyword ?? 'unknown';
        return {
            id: `json-schema.${id}`,
            path,
            severity: issue_1.IssueSeverity.error,
            message: error.message,
        };
    });
    try {
        issues.push(...validateRules(rules_1.appleRules, config));
    }
    catch {
        // When the rules are failing, the json schema validation errors explain the issue
        // TODO(cedric): optionally add debugging logging for these types of errors
    }
    return issues;
}
exports.validateConfig = validateConfig;
/** Validate the set of rules against the parsed metadata config */
function validateRules(rules, config) {
    const issues = [];
    for (const rule of rules) {
        const result = rule.validate(config);
        if (Array.isArray(result)) {
            issues.push(...result);
        }
        else if (result) {
            issues.push(result);
        }
    }
    return issues;
}
