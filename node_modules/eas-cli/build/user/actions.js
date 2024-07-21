"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureActorHasPrimaryAccount = void 0;
function ensureActorHasPrimaryAccount(user) {
    if (user.__typename === 'User' || user.__typename === 'SSOUser') {
        return user.primaryAccount;
    }
    throw new Error('This action is not supported for robot users.');
}
exports.ensureActorHasPrimaryAccount = ensureActorHasPrimaryAccount;
