"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePodfile = void 0;
const fs_1 = __importDefault(require("fs"));
const iosConstants_1 = require("./iosConstants");
const OneSignalLog_1 = require("./OneSignalLog");
const FileManager_1 = require("./FileManager");
async function updatePodfile(iosPath) {
    const podfile = await FileManager_1.FileManager.readFile(`${iosPath}/Podfile`);
    const matches = podfile.match(iosConstants_1.NSE_PODFILE_REGEX);
    if (matches) {
        OneSignalLog_1.OneSignalLog.log("OneSignalNotificationServiceExtension target already added to Podfile. Skipping...");
    }
    else {
        fs_1.default.appendFile(`${iosPath}/Podfile`, iosConstants_1.NSE_PODFILE_SNIPPET, (err) => {
            if (err) {
                OneSignalLog_1.OneSignalLog.error("Error writing to Podfile");
            }
        });
    }
}
exports.updatePodfile = updatePodfile;
