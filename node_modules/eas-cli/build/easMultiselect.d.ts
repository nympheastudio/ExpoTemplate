import { Choice, PromptObject } from 'prompts';
import { MultiselectPrompt } from 'prompts/lib/elements';
export type Question<T extends string = string> = PromptObject<T> & {
    selectionFormat?: string;
};
/**
 * Customized multiselect prompt.
 *
 * Additional parameters:
 *
 * @param selectionFormat
 *   String indicating number of selected options. Should contain `<num>` substring.
 *
 *   Example:
 *     'Selected <num> devices'
 *
 *   Short format is used when more than one option is selected.
 *
 **/
export default class EasMultiselect extends MultiselectPrompt {
    constructor(opts: Question);
    renderDoneOrInstructions(): string;
}
export declare const easMultiselect: (args: Question) => Promise<Choice[]>;
