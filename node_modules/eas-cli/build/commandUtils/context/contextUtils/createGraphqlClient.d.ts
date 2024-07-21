import { AnyVariables, Client, OperationContext, OperationResult, OperationResultSource, TypedDocumentNode } from '@urql/core';
import { DocumentNode } from 'graphql';
export interface ExpoGraphqlClient extends Client {
    query<Data = any, Variables extends AnyVariables = AnyVariables>(query: DocumentNode | TypedDocumentNode<Data, Variables> | string, variables: Variables, context: Partial<OperationContext> & {
        additionalTypenames: string[];
    }): OperationResultSource<OperationResult<Data, Variables>>;
}
export declare function createGraphqlClient(authInfo: {
    accessToken: string | null;
    sessionSecret: string | null;
}): ExpoGraphqlClient;
