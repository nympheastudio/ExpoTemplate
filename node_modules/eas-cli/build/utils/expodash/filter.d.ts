/** A predicate to filter arrays on truthy values, returning a type-safe array. */
export declare function truthy<TValue>(value: TValue | null | undefined): value is TValue;
