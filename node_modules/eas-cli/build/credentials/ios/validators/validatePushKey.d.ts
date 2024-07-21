import { CredentialsContext } from '../../context';
import { PushKey } from '../appstore/Credentials.types';
export declare function isPushKeyValidAndTrackedAsync(ctx: CredentialsContext, pushKey: PushKey): Promise<boolean>;
