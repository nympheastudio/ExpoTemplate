"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function groupBy(list, getKey) {
    return list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) {
            previous[group] = [];
        }
        previous[group].push(currentItem);
        return previous;
    }, {});
}
exports.default = groupBy;
