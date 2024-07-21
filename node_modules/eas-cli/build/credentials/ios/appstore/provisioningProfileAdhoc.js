"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrReuseAdhocProvisioningProfileAsync = void 0;
const apple_utils_1 = require("@expo/apple-utils");
const authenticate_1 = require("./authenticate");
const bundleId_1 = require("./bundleId");
const distributionCertificate_1 = require("./distributionCertificate");
const ora_1 = require("../../../ora");
const authType_1 = require("../utils/authType");
function uniqueItems(items) {
    const set = new Set(items);
    return [...set];
}
async function registerMissingDevicesAsync(context, udids) {
    const allDevices = await apple_utils_1.Device.getAsync(context);
    const alreadyAdded = allDevices.filter(device => udids.includes(device.attributes.udid));
    const alreadyAddedUdids = alreadyAdded.map(i => i.attributes.udid);
    await Promise.all(udids.map(async (udid) => {
        if (!alreadyAddedUdids.includes(udid)) {
            const device = await apple_utils_1.Device.createAsync(context, {
                name: 'iOS Device (added by Expo)',
                udid,
            });
            alreadyAdded.push(device);
        }
    }));
    return alreadyAdded;
}
async function findProfileAsync(context, { bundleId, certSerialNumber, profileType, }) {
    const expoProfiles = (await (0, bundleId_1.getProfilesForBundleIdAsync)(context, bundleId)).filter(profile => {
        return (profile.attributes.profileType === profileType &&
            profile.attributes.name.startsWith('*[expo]') &&
            profile.attributes.profileState !== apple_utils_1.ProfileState.EXPIRED);
    });
    const expoProfilesWithCertificate = [];
    // find profiles associated with our development cert
    for (const profile of expoProfiles) {
        const certificates = await profile.getCertificatesAsync();
        if (certificates.some(cert => cert.attributes.serialNumber === certSerialNumber)) {
            expoProfilesWithCertificate.push(profile);
        }
    }
    if (expoProfilesWithCertificate) {
        // there is an expo managed profile with our desired certificate
        // return the profile that will be valid for the longest duration
        return {
            profile: expoProfilesWithCertificate.sort(sortByExpiration)[expoProfilesWithCertificate.length - 1],
            didUpdate: false,
        };
    }
    else if (expoProfiles) {
        // there is an expo managed profile, but it doesn't have our desired certificate
        // append the certificate and update the profile
        const distributionCertificate = await (0, distributionCertificate_1.getDistributionCertificateAsync)(context, certSerialNumber);
        if (!distributionCertificate) {
            throw new Error(`Certificate for serial number "${certSerialNumber}" does not exist`);
        }
        const profile = expoProfiles.sort(sortByExpiration)[expoProfiles.length - 1];
        profile.attributes.certificates = [distributionCertificate];
        return {
            profile: (0, authType_1.isAppStoreConnectTokenOnlyContext)(profile.context)
                ? // Experimentally regenerate the provisioning profile using App Store Connect API.
                    await profile.regenerateManuallyAsync()
                : // This method does not support App Store Connect API.
                    await profile.regenerateAsync(),
            didUpdate: true,
        };
    }
    // there is no valid provisioning profile available
    return { profile: null, didUpdate: false };
}
function sortByExpiration(a, b) {
    return (new Date(a.attributes.expirationDate).getTime() -
        new Date(b.attributes.expirationDate).getTime());
}
async function findProfileByIdAsync(context, profileId, bundleId) {
    let profiles = await (0, bundleId_1.getProfilesForBundleIdAsync)(context, bundleId);
    profiles = profiles.filter(profile => profile.attributes.profileType === apple_utils_1.ProfileType.IOS_APP_ADHOC);
    return profiles.find(profile => profile.id === profileId) ?? null;
}
async function manageAdHocProfilesAsync(context, { udids, bundleId, certSerialNumber, profileId, profileType, }) {
    // We register all missing devices on the Apple Developer Portal. They are identified by UDIDs.
    const devices = await registerMissingDevicesAsync(context, udids);
    let existingProfile;
    let didUpdate = false;
    if (profileId) {
        existingProfile = await findProfileByIdAsync(context, profileId, bundleId);
        // Fail if we cannot find the profile that was specifically requested
        if (!existingProfile) {
            throw new Error(`Could not find profile with profile id "${profileId}" for bundle id "${bundleId}"`);
        }
    }
    else {
        // If no profile id is passed, try to find a suitable provisioning profile for the App ID.
        const results = await findProfileAsync(context, { bundleId, certSerialNumber, profileType });
        existingProfile = results.profile;
        didUpdate = results.didUpdate;
    }
    if (existingProfile) {
        // We need to verify whether the existing profile includes all user's devices.
        let deviceUdidsInProfile = existingProfile?.attributes?.devices?.map?.(i => i.attributes.udid) ?? [];
        deviceUdidsInProfile = uniqueItems(deviceUdidsInProfile.filter(Boolean));
        const allDeviceUdids = uniqueItems(udids);
        const hasEqualUdids = deviceUdidsInProfile.length === allDeviceUdids.length &&
            deviceUdidsInProfile.every(udid => allDeviceUdids.includes(udid));
        if (hasEqualUdids && existingProfile.isValid()) {
            const result = {
                profileName: existingProfile?.attributes?.name,
                provisioningProfileId: existingProfile?.id,
                provisioningProfile: existingProfile?.attributes.profileContent,
            };
            if (didUpdate) {
                result.didUpdate = true;
            }
            return result;
        }
        // We need to add new devices to the list and create a new provisioning profile.
        existingProfile.attributes.devices = devices;
        if ((0, authType_1.isAppStoreConnectTokenOnlyContext)(existingProfile.context)) {
            // Experimentally regenerate the provisioning profile using App Store Connect API.
            await existingProfile.regenerateManuallyAsync();
        }
        else {
            // This method does not support App Store Connect API.
            await existingProfile.regenerateAsync();
        }
        const updatedProfile = (await findProfileAsync(context, { bundleId, certSerialNumber, profileType })).profile;
        if (!updatedProfile) {
            throw new Error(`Failed to locate updated profile for bundle identifier "${bundleId}" and serial number "${certSerialNumber}"`);
        }
        return {
            didUpdate: true,
            profileName: updatedProfile.attributes.name,
            provisioningProfileId: updatedProfile.id,
            provisioningProfile: updatedProfile.attributes.profileContent,
        };
    }
    // No existing profile...
    // We need to find user's distribution certificate to make a provisioning profile for it.
    const distributionCertificate = await (0, distributionCertificate_1.getDistributionCertificateAsync)(context, certSerialNumber);
    if (!distributionCertificate) {
        // If the distribution certificate doesn't exist, the user must have deleted it, we can't do anything here :(
        throw new Error(`No distribution certificate for serial number "${certSerialNumber}" is available to make a provisioning profile against`);
    }
    const bundleIdItem = await (0, bundleId_1.getBundleIdForIdentifierAsync)(context, bundleId);
    // If the provisioning profile for the App ID doesn't exist, we just need to create a new one!
    const newProfile = await apple_utils_1.Profile.createAsync(context, {
        bundleId: bundleIdItem.id,
        // apple drops [ if its the first char (!!),
        name: `*[expo] ${bundleId} AdHoc ${Date.now()}`,
        certificates: [distributionCertificate.id],
        devices: devices.map(device => device.id),
        profileType,
    });
    return {
        didUpdate: true,
        didCreate: true,
        profileName: newProfile.attributes.name,
        provisioningProfileId: newProfile.id,
        provisioningProfile: newProfile.attributes.profileContent,
    };
}
async function createOrReuseAdhocProvisioningProfileAsync(authCtx, udids, bundleIdentifier, distCertSerialNumber, profileType) {
    const spinner = (0, ora_1.ora)(`Handling Apple ad hoc provisioning profiles`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(authCtx);
        const { didUpdate, didCreate, profileName, ...adhocProvisioningProfile } = await manageAdHocProfilesAsync(context, {
            udids,
            bundleId: bundleIdentifier,
            certSerialNumber: distCertSerialNumber,
            profileType,
        });
        if (didCreate) {
            spinner.succeed(`Created new profile: ${profileName}`);
        }
        else if (didUpdate) {
            spinner.succeed(`Updated existing profile: ${profileName}`);
        }
        else {
            spinner.succeed(`Used existing profile: ${profileName}`);
        }
        return {
            ...adhocProvisioningProfile,
            teamId: authCtx.team.id,
            teamName: authCtx.team.name,
        };
    }
    catch (error) {
        spinner.fail(`Failed to handle Apple profiles`);
        throw error;
    }
}
exports.createOrReuseAdhocProvisioningProfileAsync = createOrReuseAdhocProvisioningProfileAsync;
