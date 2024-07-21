"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNewDevice = void 0;
const tslib_1 = require("tslib");
const generated_1 = require("../../graphql/generated");
const formatFields_1 = tslib_1.__importDefault(require("../../utils/formatFields"));
const DEVICE_CLASS_DISPLAY_NAMES = {
    [generated_1.AppleDeviceClass.Iphone]: 'iPhone',
    [generated_1.AppleDeviceClass.Ipad]: 'iPad',
    [generated_1.AppleDeviceClass.Mac]: 'Mac',
    [generated_1.AppleDeviceClass.Unknown]: 'Unknown',
};
function formatDeviceClass(device) {
    if (!device.deviceClass || !DEVICE_CLASS_DISPLAY_NAMES[device.deviceClass]) {
        return 'Unknown';
    }
    return [DEVICE_CLASS_DISPLAY_NAMES[device.deviceClass], 'model' in device ? device.model : '']
        .filter(value => !!value)
        .join(' ');
}
function formatDevice(device, team) {
    const fields = [
        { label: 'UDID', value: device.identifier },
        { label: 'Name', value: device.name ?? 'Unknown' },
        {
            label: 'Class',
            value: formatDeviceClass(device),
        },
    ];
    if (team) {
        fields.push({ label: 'Apple Team ID', value: team.appleTeamIdentifier }, { label: 'Apple Team Name', value: team.appleTeamName ?? 'Unknown' });
    }
    return (0, formatFields_1.default)(fields);
}
exports.default = formatDevice;
function formatNewDevice(device, team) {
    const fields = [
        { label: 'Name', value: device.name ?? '(empty)' },
        {
            label: 'Class',
            value: formatDeviceClass(device),
        },
        { label: 'UDID', value: device.identifier },
    ];
    if (team) {
        fields.push({ label: 'Apple Team ID', value: team.appleTeamIdentifier }, { label: 'Apple Team Name', value: team.appleTeamName ?? 'Unknown' });
    }
    return (0, formatFields_1.default)(fields);
}
exports.formatNewDevice = formatNewDevice;
