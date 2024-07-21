export default function groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]>;
