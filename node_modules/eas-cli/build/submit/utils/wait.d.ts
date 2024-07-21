import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { SubmissionFragment } from '../../graphql/generated';
export declare function waitForSubmissionsEndAsync(graphqlClient: ExpoGraphqlClient, initialSubmissions: SubmissionFragment[]): Promise<SubmissionFragment[]>;
