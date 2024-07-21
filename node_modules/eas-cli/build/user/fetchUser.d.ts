export declare function fetchUserAsync({ sessionSecret, }: {
    sessionSecret: string;
}): Promise<{
    id: string;
    username: string;
}>;
