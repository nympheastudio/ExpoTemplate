"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDeviceLabel = exports.chooseDevicesAsync = void 0;
const prompts_1 = require("../.././../prompts");
const AppleDevice_1 = require("../../../graphql/types/credentials/AppleDevice");
async function chooseDevicesAsync(allDevices, preselectedDeviceIdentifiers = []) {
    const preselectedDeviceIdentifierSet = new Set(preselectedDeviceIdentifiers);
    const isSelected = (device) => preselectedDeviceIdentifierSet.size === 0 ||
        preselectedDeviceIdentifierSet.has(device.identifier);
    const { devices } = await (0, prompts_1.promptAsync)({
        type: 'multiselect',
        name: 'devices',
        selectionFormat: '<num> devices selected',
        message: 'Select devices for the ad hoc build:',
        hint: '- Space to select. Return to submit',
        choices: allDevices.map(device => ({
            value: device,
            title: formatDeviceLabel(device),
            selected: isSelected(device),
        })),
        instructions: false,
        min: 1,
    });
    return devices;
}
exports.chooseDevicesAsync = chooseDevicesAsync;
function formatDeviceLabel(device) {
    const deviceDetails = formatDeviceDetails(device);
    return `${device.identifier}${deviceDetails !== '' ? ` ${deviceDetails}` : ''}${device.name ? ` (${device.name})` : ''}${device.createdAt ? ` (created at: ${device.createdAt})` : ''}`;
}
exports.formatDeviceLabel = formatDeviceLabel;
function formatDeviceDetails(device) {
    let details = '';
    if (device.deviceClass) {
        details += AppleDevice_1.APPLE_DEVICE_CLASS_LABELS[device.deviceClass];
    }
    if (device.model) {
        details += details === '' ? device.model : ` ${device.model}`;
    }
    return details === '' ? details : `(${details})`;
}
