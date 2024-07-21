export default function sortBy<T extends any>(list: T[], what?: keyof T, order?: 'asc' | 'desc'): T[];
