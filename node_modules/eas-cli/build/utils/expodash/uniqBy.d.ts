export default function uniqBy<T, K = any>(list: T[], getKey: (item: T) => K): T[];
