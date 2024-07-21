export type Question = {
    field: string;
    question: string;
    type: 'file' | 'string' | 'password';
    base64Encode?: boolean;
};
export type CredentialSchema<T> = {
    name: string;
    questions: Question[];
    provideMethodQuestion?: {
        question?: string;
    };
    transformResultAsync?: (answers: Partial<T>) => Promise<T>;
};
export declare function askForUserProvidedAsync<T>(schema: CredentialSchema<T>, initialValues?: Partial<T>): Promise<T | null>;
export declare function getCredentialsFromUserAsync<T>(credentialsSchema: CredentialSchema<T>, initialValues?: Partial<T>): Promise<T>;
export declare function shouldAutoGenerateCredentialsAsync<T>(schema: CredentialSchema<T>): Promise<boolean>;
