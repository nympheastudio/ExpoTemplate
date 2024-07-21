"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printJsonOnlyOutput = exports.enableJsonOutput = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const log_1 = tslib_1.__importDefault(require("../log"));
let stdoutWrite;
function enableJsonOutput() {
    if (stdoutWrite) {
        return;
    }
    stdoutWrite = process.stdout.write;
    process.stdout.write = process.stderr.write.bind(process.stderr);
}
exports.enableJsonOutput = enableJsonOutput;
function printJsonOnlyOutput(value) {
    (0, assert_1.default)(stdoutWrite, 'this should only be called with --json flag');
    try {
        process.stdout.write = stdoutWrite;
        log_1.default.log(JSON.stringify(sanitizeValue(value), null, 2));
    }
    finally {
        process.stdout.write = process.stderr.write.bind(process.stderr);
    }
}
exports.printJsonOnlyOutput = printJsonOnlyOutput;
function sanitizeValue(value) {
    if (Array.isArray(value)) {
        return value.map(val => sanitizeValue(val));
    }
    else if (value && typeof value === 'object') {
        const result = {};
        Object.keys(value).forEach(key => {
            if (key !== '__typename' && value[key] !== null) {
                result[key] = sanitizeValue(value[key]);
            }
        });
        return result;
    }
    else {
        return value;
    }
}
