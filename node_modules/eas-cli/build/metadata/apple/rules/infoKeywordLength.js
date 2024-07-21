"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoKeywordLength = void 0;
const filter_1 = require("../../../utils/expodash/filter");
const KEYWORD_CHARACTER_LIMIT = 100;
/**
 * Keywords are limited to 100 characters when converted to a comma separated string.
 * @see https://developer-mdn.apple.com/app-store/search/
 */
exports.infoKeywordLength = {
    id: 'apple.info.keyword.length',
    severity: 2,
    validate(config) {
        if (!config.apple?.info || Object.keys(config.apple.info).length === 0) {
            return null;
        }
        return Object.keys(config.apple.info)
            .map(locale => {
            const keywords = config.apple?.info?.[locale].keywords ?? [];
            const length = keywords.join(',').length;
            if (length > KEYWORD_CHARACTER_LIMIT) {
                return {
                    id: this.id,
                    severity: this.severity,
                    path: ['apple', 'info', locale, 'keywords'],
                    message: `Keywords are limited to ${KEYWORD_CHARACTER_LIMIT} characters, but found ${length}.`,
                };
            }
            return null;
        })
            .filter(filter_1.truthy);
    },
};
