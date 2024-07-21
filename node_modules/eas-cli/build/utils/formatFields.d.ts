type FormatFieldsOptions = {
    labelFormat: (raw: string) => string;
};
export type FormatFieldsItem = {
    label: string;
    value: string;
};
export default function formatFields(fields: FormatFieldsItem[], options?: FormatFieldsOptions): string;
export {};
