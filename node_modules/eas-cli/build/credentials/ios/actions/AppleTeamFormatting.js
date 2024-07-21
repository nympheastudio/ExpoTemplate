"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAppleTeam = void 0;
function formatAppleTeam({ appleTeamIdentifier, appleTeamName, }) {
    return `Team ID: ${appleTeamIdentifier}${appleTeamName ? `, Team name: ${appleTeamName}` : ''}`;
}
exports.formatAppleTeam = formatAppleTeam;
