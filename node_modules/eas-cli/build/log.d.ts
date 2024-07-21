export default class Log {
    static readonly isDebug: boolean;
    static log(...args: any[]): void;
    static newLine(): void;
    static addNewLineIfNone(): void;
    static error(...args: any[]): void;
    static warn(...args: any[]): void;
    static debug(...args: any[]): void;
    static gray(...args: any[]): void;
    static warnDeprecatedFlag(flag: string, message: string): void;
    static fail(message: string): void;
    static succeed(message: string): void;
    static withTick(...args: any[]): void;
    static withInfo(...args: any[]): void;
    private static consoleLog;
    private static withTextColor;
    private static isLastLineNewLine;
    private static updateIsLastLineNewLine;
}
/**
 * Prints a link for given URL, using text if provided, otherwise text is just the URL.
 * Format links as dim (unless disabled) and with an underline.
 *
 * @example https://expo.dev
 */
export declare function link(url: string, { text, fallback, dim }?: {
    text?: string;
    dim?: boolean;
    fallback?: string;
}): string;
/**
 * Provide a consistent "Learn more" link experience.
 * Format links as dim (unless disabled) with an underline.
 *
 * @example Learn more: https://expo.dev
 */
export declare function learnMore(url: string, { learnMoreMessage: maybeLearnMoreMessage, dim, }?: {
    learnMoreMessage?: string;
    dim?: boolean;
}): string;
