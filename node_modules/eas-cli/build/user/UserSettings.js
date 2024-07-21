"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const json_file_1 = tslib_1.__importDefault(require("@expo/json-file"));
const path_1 = tslib_1.__importDefault(require("path"));
const paths_1 = require("../utils/paths");
const SETTINGS_FILE_PATH = path_1.default.join((0, paths_1.getConfigDirectory)(), 'user-settings.json');
const UserSettings = new json_file_1.default(SETTINGS_FILE_PATH, {
    jsonParseErrorDefault: {},
    cantReadFileDefault: {},
    ensureDir: true,
});
exports.default = UserSettings;
