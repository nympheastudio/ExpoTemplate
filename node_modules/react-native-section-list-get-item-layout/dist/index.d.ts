export declare type SectionListDataProp = Array<{
    title: string;
    data: any[];
}>;
export interface Parameters {
    getItemHeight: (rowData: any, sectionIndex: number, rowIndex: number) => number;
    getSeparatorHeight?: (sectionIndex: number, rowIndex: number) => number;
    getSectionHeaderHeight?: (sectionIndex: number) => number;
    getSectionFooterHeight?: (sectionIndex: number) => number;
    listHeaderHeight?: number | (() => number);
}
declare const _default: ({ getItemHeight, getSeparatorHeight, getSectionHeaderHeight, getSectionFooterHeight, listHeaderHeight, }: Parameters) => (data: {
    title: string;
    data: any[];
}[], index: number) => {
    length: number;
    offset: number;
    index: number;
};
export default _default;
