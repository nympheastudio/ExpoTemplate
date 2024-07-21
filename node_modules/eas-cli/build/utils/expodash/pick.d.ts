export default function pick<T extends object, U extends keyof T>(object: T, keys: U[]): Pick<T, U>;
