"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortBy(list, what, order = 'asc') {
    const compareByFn = what &&
        ((a, b) => {
            const r = a[what] > b[what] ? 1 : b[what] > a[what] ? -1 : 0;
            return order === 'asc' ? r : -r;
        });
    return list.concat().sort(compareByFn);
}
exports.default = sortBy;
