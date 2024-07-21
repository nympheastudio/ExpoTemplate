"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoRestrictedWords = void 0;
const filter_1 = require("../../../utils/expodash/filter");
const RESTRICTED_PROPERTIES = ['title', 'subtitle', 'description', 'keywords'];
const RESTRICTED_WORDS = {
    beta: 'Apple restricts the word "beta" and synonyms implying incomplete functionality.',
};
/**
 * Apple restricts certain words from being used in name, description, or keywords.
 * Using these words likely result in a rejection.
 */
exports.infoRestrictedWords = {
    id: 'apple.info.restrictedWords',
    severity: 1,
    validate(config) {
        if (!config.apple?.info || Object.keys(config.apple.info).length === 0) {
            return null;
        }
        return Object.keys(config.apple.info)
            .map(locale => RESTRICTED_PROPERTIES.map(property => {
            const value = getStringValue(config.apple?.info?.[locale][property]);
            const issueDescription = getDescriptionForFirstMatch(value);
            if (issueDescription) {
                return {
                    id: this.id,
                    severity: this.severity,
                    path: ['apple', 'info', locale, property],
                    message: issueDescription,
                };
            }
            return null;
        }).filter(filter_1.truthy))
            .filter(filter_1.truthy)
            .flat();
    },
};
function getDescriptionForFirstMatch(value) {
    const sanitized = value.toLowerCase();
    for (const [word, description] of Object.entries(RESTRICTED_WORDS)) {
        if (sanitized.includes(word)) {
            return description;
        }
    }
    return null;
}
function getStringValue(value) {
    if (!value) {
        return '';
    }
    if (Array.isArray(value)) {
        return value.join(' ');
    }
    return value;
}
