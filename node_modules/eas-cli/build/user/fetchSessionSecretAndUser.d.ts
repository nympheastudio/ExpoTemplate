export declare function fetchSessionSecretAndUserAsync({ username, password, otp, }: {
    username: string;
    password: string;
    otp?: string;
}): Promise<{
    sessionSecret: string;
    id: string;
    username: string;
}>;
