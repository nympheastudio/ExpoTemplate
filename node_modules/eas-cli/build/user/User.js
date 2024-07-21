"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActorUsername = exports.getActorDisplayName = void 0;
/**
 * Resolve the name of the actor, either normal user, sso user or robot user.
 * This should be used whenever the "current user" needs to be displayed.
 * The display name CANNOT be used as project owner.
 */
function getActorDisplayName(actor) {
    switch (actor?.__typename) {
        case 'User':
            return actor.username;
        case 'Robot':
            return actor.firstName ? `${actor.firstName} (robot)` : 'robot';
        case 'SSOUser':
            return actor.username;
        case undefined:
            return 'unknown';
    }
}
exports.getActorDisplayName = getActorDisplayName;
function getActorUsername(actor) {
    switch (actor?.__typename) {
        case 'User':
        case 'SSOUser':
            return actor.username;
        case 'Robot':
        case undefined:
            return null;
    }
}
exports.getActorUsername = getActorUsername;
