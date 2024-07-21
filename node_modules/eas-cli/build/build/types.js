"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildDistributionType = exports.BuildStatus = void 0;
var BuildStatus;
(function (BuildStatus) {
    BuildStatus["NEW"] = "new";
    BuildStatus["IN_QUEUE"] = "in-queue";
    BuildStatus["IN_PROGRESS"] = "in-progress";
    BuildStatus["PENDING_CANCEL"] = "pending-cancel";
    BuildStatus["ERRORED"] = "errored";
    BuildStatus["FINISHED"] = "finished";
    BuildStatus["CANCELED"] = "canceled";
})(BuildStatus || (exports.BuildStatus = BuildStatus = {}));
var BuildDistributionType;
(function (BuildDistributionType) {
    BuildDistributionType["STORE"] = "store";
    BuildDistributionType["INTERNAL"] = "internal";
    /** @deprecated Use simulator flag instead */
    BuildDistributionType["SIMULATOR"] = "simulator";
})(BuildDistributionType || (exports.BuildDistributionType = BuildDistributionType = {}));
