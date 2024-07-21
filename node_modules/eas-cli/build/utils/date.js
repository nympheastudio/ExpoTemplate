"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNow = void 0;
function getBiggestInterval(seconds) {
    let interval = seconds / 31536000;
    if (interval > 1) {
        return [interval, 'year'];
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return [interval, 'month'];
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return [interval, 'day'];
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return [interval, 'hour'];
    }
    interval = seconds / 60;
    if (interval > 1) {
        return [interval, 'minute'];
    }
    interval = seconds;
    return [interval, 'second'];
}
/**
 * Time elapsed between now and the provided date. For example: '3 months'
 */
function fromNow(date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const [intervalAmountFloat, intervalType] = getBiggestInterval(seconds);
    const intervalAmount = Math.floor(intervalAmountFloat);
    return `${intervalAmount} ${intervalType}${intervalAmount > 1 ? 's' : ''}`;
}
exports.fromNow = fromNow;
