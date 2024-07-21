import { CurrentUserQuery, Robot, SsoUser, User } from '../graphql/generated';
export type Actor = NonNullable<CurrentUserQuery['meActor']>;
/**
 * Resolve the name of the actor, either normal user, sso user or robot user.
 * This should be used whenever the "current user" needs to be displayed.
 * The display name CANNOT be used as project owner.
 */
export declare function getActorDisplayName(actor?: Pick<Robot, '__typename' | 'firstName'> | Pick<User, '__typename' | 'username'> | Pick<SsoUser, '__typename' | 'username'> | null): string;
export declare function getActorUsername(actor?: Actor): string | null;
