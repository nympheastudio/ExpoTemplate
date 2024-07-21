import { Actor } from './User';
import { AccountFragment } from '../graphql/generated';
export declare function ensureActorHasPrimaryAccount(user: Actor): AccountFragment;
