import { AppleTeamFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
import { AppLookupParams } from '../api/graphql/types/AppLookupParams';
export declare function resolveAppleTeamIfAuthenticatedAsync(ctx: CredentialsContext, app: AppLookupParams): Promise<AppleTeamFragment | null>;
