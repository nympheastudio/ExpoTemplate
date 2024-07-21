/**
 * Sanitizes language for App Store Connect.
 * @param lang Language to sanitize
 * @returns Provided language if valid
 * @throws Error if language is invalid.s
 */
export declare function sanitizeLanguage(lang?: string, { defaultLang }?: {
    defaultLang?: string;
}): string;
