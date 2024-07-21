"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDistributionTypeToGraphQLDistributionType = void 0;
const types_1 = require("../build/types");
const generated_1 = require("../graphql/generated");
const buildDistributionTypeToGraphQLDistributionType = (buildDistribution) => {
    if (buildDistribution === types_1.BuildDistributionType.STORE) {
        return generated_1.DistributionType.Store;
    }
    else if (buildDistribution === types_1.BuildDistributionType.INTERNAL) {
        return generated_1.DistributionType.Internal;
    }
    else if (buildDistribution === types_1.BuildDistributionType.SIMULATOR) {
        return generated_1.DistributionType.Simulator;
    }
    else {
        return undefined;
    }
};
exports.buildDistributionTypeToGraphQLDistributionType = buildDistributionTypeToGraphQLDistributionType;
