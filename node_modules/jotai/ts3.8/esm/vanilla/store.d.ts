import type { Atom, WritableAtom } from './atom';
type AnyValue = unknown;
type AnyError = unknown;
type AnyAtom = Atom<AnyValue>;
type OnUnmount = () => void;
/**
 * State tracked for mounted atoms. An atom is considered "mounted" if it has a
 * subscriber, or is a transitive dependency of another atom that has a
 * subscriber.
 *
 * The mounted state of an atom is freed once it is no longer mounted.
 */
type Mounted = {
    /** Set of listeners to notify when the atom value changes. */
    readonly l: Set<() => void>;
    /** Set of mounted atoms that the atom depends on. */
    readonly d: Set<AnyAtom>;
    /** Set of mounted atoms that depends on the atom. */
    readonly t: Set<AnyAtom>;
    /** Function to run when the atom is unmounted. */
    u?: OnUnmount;
};
/**
 * Mutable atom state,
 * tracked for both mounted and unmounted atoms in a store.
 */
type AtomState<Value = AnyValue> = {
    /**
     * Map of atoms that the atom depends on.
     * The map value is the epoch number of the dependency.
     */
    readonly d: Map<AnyAtom, number>;
    /**
     * Set of atoms with pending promise that depend on the atom.
     *
     * This may cause memory leaks, but it's for the capability to continue promises
     */
    readonly p: Set<AnyAtom>;
    /** The epoch number of the atom. */
    n: number;
    /** Object to store mounted state of the atom. */
    m?: Mounted;
    /** Atom value */
    v?: Value;
    /** Atom error */
    e?: AnyError;
};
type DevStoreRev4 = {
    dev4_get_internal_weak_map: () => WeakMap<AnyAtom, AtomState>;
    dev4_get_mounted_atoms: () => Set<AnyAtom>;
    dev4_restore_atoms: (values: Iterable<readonly [
        AnyAtom,
        AnyValue
    ]>) => void;
};
type PrdStore = {
    get: <Value>(atom: Atom<Value>) => Value;
    set: <Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, ...args: Args) => Result;
    sub: (atom: AnyAtom, listener: () => void) => () => void;
};
type Store = PrdStore | (PrdStore & DevStoreRev4);
export type INTERNAL_DevStoreRev4 = DevStoreRev4;
export type INTERNAL_PrdStore = PrdStore;
export declare const createStore: () => Store;
export declare const getDefaultStore: () => Store;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;