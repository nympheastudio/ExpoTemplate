"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeviceData = exports.promptForUDIDAsync = exports.promptForNameAsync = exports.promptForDeviceClassAsync = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const generated_1 = require("../../../graphql/generated");
const log_1 = tslib_1.__importDefault(require("../../../log"));
const prompts_1 = require("../../../prompts");
const udids_1 = require("../../udids");
const formatDevice_1 = require("../../utils/formatDevice");
async function promptForDeviceClassAsync(initial) {
    const choices = [
        { title: 'iPhone', value: generated_1.AppleDeviceClass.Iphone },
        { title: 'iPad', value: generated_1.AppleDeviceClass.Ipad },
        { title: 'Mac', value: generated_1.AppleDeviceClass.Mac },
        { title: 'Not sure (leave empty)', value: null },
    ];
    const values = choices.map(({ value }) => value);
    const { deviceClass } = await (0, prompts_1.promptAsync)({
        type: 'select',
        name: 'deviceClass',
        message: 'Device class (optional):',
        choices,
        initial: initial !== undefined && values.indexOf(initial),
    });
    return deviceClass;
}
exports.promptForDeviceClassAsync = promptForDeviceClassAsync;
async function promptForNameAsync(initial) {
    const { name } = await (0, prompts_1.promptAsync)({
        type: 'text',
        name: 'name',
        message: 'Device name (optional):',
        initial,
    });
    return name;
}
exports.promptForNameAsync = promptForNameAsync;
async function promptForUDIDAsync(initial) {
    const { udid } = await (0, prompts_1.promptAsync)({
        type: 'text',
        name: 'udid',
        message: 'UDID:',
        initial,
        validate: (rawVal) => {
            const val = (0, udids_1.normalizeUDID)(rawVal);
            if (!val || val === '') {
                return 'UDID cannot be empty';
            }
            else if (val.length !== 25 && val.length !== 40) {
                return 'UDID should be a 25 or 40-character string';
            }
            else if (!(0, udids_1.isValidUDID)(val)) {
                return 'UDID is invalid';
            }
            else {
                return true;
            }
        },
        format: (val) => (0, udids_1.normalizeUDID)(val),
    });
    return udid;
}
exports.promptForUDIDAsync = promptForUDIDAsync;
function printDeviceData(deviceData, appleTeam) {
    log_1.default.newLine();
    log_1.default.log(`We are going to register the following device in our database.
  This device will ${chalk_1.default.bold('not')} be registered on the Apple Developer Portal until it is chosen for an internal distribution build.`);
    log_1.default.newLine();
    log_1.default.log((0, formatDevice_1.formatNewDevice)({ ...deviceData, identifier: deviceData.udid }, appleTeam));
    log_1.default.newLine();
}
exports.printDeviceData = printDeviceData;
