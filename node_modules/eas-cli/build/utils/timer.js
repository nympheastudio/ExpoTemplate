"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMilliseconds = exports.endTimer = exports.startTimer = exports.hasTimer = void 0;
const LABEL = 'DEFAULT';
const startTimes = {};
function hasTimer(label) {
    return startTimes[label] ?? null;
}
exports.hasTimer = hasTimer;
function startTimer(label = LABEL) {
    startTimes[label] = Date.now();
}
exports.startTimer = startTimer;
function endTimer(label = LABEL, clear = true) {
    const endTime = Date.now();
    const startTime = startTimes[label];
    if (startTime) {
        const delta = endTime - startTime;
        if (clear) {
            delete startTimes[label];
        }
        return delta;
    }
    throw new Error(`Timer '${label}' has not be started yet`);
}
exports.endTimer = endTimer;
/**
 * Optimally format milliseconds
 *
 * @example `1h 2m 3s`
 * @example `5m 18s`
 * @example `40s`
 * @param duration
 */
function formatMilliseconds(duration) {
    const portions = [];
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
        portions.push(hours + 'h');
        duration = duration - hours * msInHour;
    }
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
        portions.push(minutes + 'm');
        duration = duration - minutes * msInMinute;
    }
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
        portions.push(seconds + 's');
    }
    return portions.join(' ');
}
exports.formatMilliseconds = formatMilliseconds;
