export interface SelectPromptEntry {
    title: string;
    description?: string;
    disabled?: boolean;
}
type BasePaginatedQueryArgs<QueryReturnType extends Record<string, any>> = {
    limit: number;
    offset: number;
    queryToPerform: (limit: number, offset: number) => Promise<QueryReturnType[]>;
};
type PaginatedQueryWithConfirmPromptArgs<QueryReturnType extends Record<string, any>> = BasePaginatedQueryArgs<QueryReturnType> & {
    promptOptions: {
        readonly title: string;
        renderListItems: (currentPage: QueryReturnType[]) => void;
    };
};
type PaginatedQueryWithSelectPromptArgs<QueryReturnType extends Record<string, any>> = BasePaginatedQueryArgs<QueryReturnType> & {
    promptOptions: {
        readonly title: string;
        makePartialChoiceObject: (queryItem: QueryReturnType) => SelectPromptEntry;
        getIdentifierForQueryItem: (queryItem: QueryReturnType) => string;
        readonly selectPromptWarningMessage?: string;
    };
};
export declare function paginatedQueryWithConfirmPromptAsync<QueryReturnType extends Record<string, any>>(queryArgs: PaginatedQueryWithConfirmPromptArgs<QueryReturnType>): Promise<void>;
/**
 * Returns an array of item(s) where the id is equal to the id of the user's selected item
 * If no items are available for a user to select, this will return an empty array.
 */
export declare function paginatedQueryWithSelectPromptAsync<QueryReturnType extends Record<string, any>>(queryArgs: PaginatedQueryWithSelectPromptArgs<QueryReturnType>): Promise<QueryReturnType | void>;
export {};
