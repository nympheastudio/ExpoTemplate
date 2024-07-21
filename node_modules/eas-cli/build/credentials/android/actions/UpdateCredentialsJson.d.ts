import { AndroidAppBuildCredentialsFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
export declare class UpdateCredentialsJson {
    runAsync(ctx: CredentialsContext, buildCredentials: AndroidAppBuildCredentialsFragment): Promise<void>;
}
