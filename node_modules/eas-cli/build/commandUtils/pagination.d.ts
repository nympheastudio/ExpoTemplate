import { OptionFlag } from '@oclif/core/lib/interfaces';
import { EasNonInteractiveAndJsonFlags } from './flags';
export declare const getPaginatedQueryOptions: (flags: Partial<Record<keyof typeof EasPaginatedQueryFlags | keyof typeof EasNonInteractiveAndJsonFlags, any>>) => PaginatedQueryOptions;
export declare const getLimitFlagWithCustomValues: ({ defaultTo, limit, }: {
    defaultTo: number;
    limit: number;
}) => OptionFlag<number | undefined>;
export declare const EasPaginatedQueryFlags: {
    offset: OptionFlag<number | undefined>;
    limit: OptionFlag<number | undefined>;
};
export type PaginatedQueryOptions = {
    nonInteractive: boolean;
    json: boolean;
    limit?: number;
    offset: number;
};
