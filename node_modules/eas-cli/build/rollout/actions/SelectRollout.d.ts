import { EASUpdateAction, EASUpdateContext } from '../../eas-update/utils';
import { UpdateChannelBasicInfoFragment } from '../../graphql/generated';
/**
 * Select an existing rollout for the project.
 */
export declare class SelectRollout implements EASUpdateAction<UpdateChannelBasicInfoFragment | null> {
    runAsync(ctx: EASUpdateContext): Promise<UpdateChannelBasicInfoFragment | null>;
}
