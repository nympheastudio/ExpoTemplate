declare type OptionPattern = {
    pattern: string;
    placeholder: string;
};
/**
 * function toPattern
 * @param {number | string} value
 * @param {string | OptionPattern} optionPattern
 * @returns {string}
 */
declare function toPattern(value: number | string, optionPattern: string | OptionPattern): string;
export default toPattern;
