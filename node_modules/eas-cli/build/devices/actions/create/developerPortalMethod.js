"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDeviceLabel = exports.runDeveloperPortalMethodAsync = void 0;
const tslib_1 = require("tslib");
const apple_utils_1 = require("@expo/apple-utils");
const AppleDeviceMutation_1 = require("../../../credentials/ios/api/graphql/mutations/AppleDeviceMutation");
const AppleDeviceQuery_1 = require("../../../credentials/ios/api/graphql/queries/AppleDeviceQuery");
const authenticate_1 = require("../../../credentials/ios/appstore/authenticate");
const generated_1 = require("../../../graphql/generated");
const log_1 = tslib_1.__importDefault(require("../../../log"));
const ora_1 = require("../../../ora");
const prompts_1 = require("../../../prompts");
const chunk_1 = tslib_1.__importDefault(require("../../../utils/expodash/chunk"));
const DEVICE_IMPORT_CHUNK_SIZE = 10;
const DEVICE_CLASS_TO_GRAPHQL_TYPE = {
    [apple_utils_1.DeviceClass.IPAD]: generated_1.AppleDeviceClass.Ipad,
    [apple_utils_1.DeviceClass.IPHONE]: generated_1.AppleDeviceClass.Iphone,
    [apple_utils_1.DeviceClass.MAC]: generated_1.AppleDeviceClass.Mac,
};
async function runDeveloperPortalMethodAsync(graphqlClient, appStoreApi, account, appleTeam) {
    const appleAuthCtx = await appStoreApi.ensureAuthenticatedAsync();
    const unregisteredPortalDevices = await findUnregisteredPortalDevicesAsync(graphqlClient, appleAuthCtx, account.name, appleTeam);
    if (unregisteredPortalDevices.length === 0) {
        log_1.default.log('All your devices registered on Apple Developer Portal are already imported to EAS.');
        return;
    }
    const devicesToImport = await chooseDevicesToImportAsync(unregisteredPortalDevices);
    await importDevicesAsync(graphqlClient, account.id, appleTeam, devicesToImport);
}
exports.runDeveloperPortalMethodAsync = runDeveloperPortalMethodAsync;
async function importDevicesAsync(graphqlClient, accountId, appleTeam, devices) {
    const spinner = (0, ora_1.ora)(`Importing ${devices.length} Apple device${devices.length === 1 ? '' : 's'} to EAS`).start();
    const deviceChunks = (0, chunk_1.default)(devices, DEVICE_IMPORT_CHUNK_SIZE);
    try {
        for (const deviceChunk of deviceChunks) {
            await importDeviceChunkAsync(graphqlClient, accountId, appleTeam, deviceChunk);
        }
    }
    catch (err) {
        spinner.fail();
        throw err;
    }
    spinner.succeed();
}
async function importDeviceChunkAsync(graphqlClient, accountId, appleTeam, devices) {
    const promises = devices.map(device => {
        return AppleDeviceMutation_1.AppleDeviceMutation.createAppleDeviceAsync(graphqlClient, {
            appleTeamId: appleTeam.id,
            identifier: device.attributes.udid,
            name: device.attributes.name,
            deviceClass: DEVICE_CLASS_TO_GRAPHQL_TYPE[device.attributes.deviceClass] ?? undefined,
        }, accountId);
    });
    await Promise.all(promises);
}
async function findUnregisteredPortalDevicesAsync(graphqlClient, appleAuthCtx, accountName, appleTeam) {
    const expoRegisteredDevices = await AppleDeviceQuery_1.AppleDeviceQuery.getAllByAppleTeamIdentifierAsync(graphqlClient, accountName, appleTeam.appleTeamIdentifier, { useCache: false });
    const expoRegisteredDevicesByUdid = expoRegisteredDevices.reduce((acc, device) => {
        acc[device.identifier] = device;
        return acc;
    }, {});
    const portalDevices = await apple_utils_1.Device.getAsync((0, authenticate_1.getRequestContext)(appleAuthCtx));
    return portalDevices.filter(portalDevice => !(portalDevice.attributes.udid in expoRegisteredDevicesByUdid) &&
        [apple_utils_1.DeviceClass.IPAD, apple_utils_1.DeviceClass.IPHONE, apple_utils_1.DeviceClass.APPLE_TV, apple_utils_1.DeviceClass.MAC].includes(portalDevice.attributes.deviceClass));
}
async function chooseDevicesToImportAsync(devices) {
    const { chosenDevices } = await (0, prompts_1.promptAsync)({
        type: 'multiselect',
        name: 'chosenDevices',
        message: 'Which devices do you want to import to EAS?',
        choices: devices.map(device => ({
            value: device,
            title: formatDeviceLabel(device),
            selected: true,
        })),
    });
    return chosenDevices;
}
function formatDeviceLabel(device) {
    const deviceDetails = formatDeviceDetails(device);
    return `${device.attributes.name} - ${device.attributes.udid})${deviceDetails !== '' ? ` - ${deviceDetails}` : ''}`;
}
exports.formatDeviceLabel = formatDeviceLabel;
function formatDeviceDetails(device) {
    let details = device.attributes.deviceClass;
    if (device.attributes.model) {
        details = device.attributes.model;
    }
    return details === '' ? details : `(${details})`;
}
