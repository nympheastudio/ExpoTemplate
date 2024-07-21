"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasPaginatedQueryFlags = exports.getLimitFlagWithCustomValues = exports.getPaginatedQueryOptions = void 0;
const core_1 = require("@oclif/core");
const getPaginatedQueryOptions = (flags) => {
    return {
        ...('limit' in flags && { limit: flags.limit }),
        offset: flags.offset ?? 0,
        nonInteractive: flags['non-interactive'] ?? false,
        json: flags.json ?? false,
    };
};
exports.getPaginatedQueryOptions = getPaginatedQueryOptions;
const parseFlagInputStringAsInteger = (input, flagName, lowerLimit, upperLimit) => {
    const inputAsNumber = Number(input);
    if (isNaN(inputAsNumber)) {
        throw new Error(`Unable to parse ${input} as a number`);
    }
    if (inputAsNumber < lowerLimit || inputAsNumber > upperLimit) {
        throw new Error(`--${flagName} must be between ${lowerLimit} and ${upperLimit}`);
    }
    return inputAsNumber;
};
const getLimitFlagWithCustomValues = ({ defaultTo, limit, }) => core_1.Flags.integer({
    description: `The number of items to fetch each query. Defaults to ${defaultTo} and is capped at ${limit}.`,
    // eslint-disable-next-line async-protect/async-suffix
    parse: async (input) => parseFlagInputStringAsInteger(input, 'limit', 1, limit),
});
exports.getLimitFlagWithCustomValues = getLimitFlagWithCustomValues;
exports.EasPaginatedQueryFlags = {
    offset: core_1.Flags.integer({
        description: 'Start queries from specified index. Use for paginating results. Defaults to 0.',
        // eslint-disable-next-line async-protect/async-suffix
        parse: async (input) => parseFlagInputStringAsInteger(input, 'offset', 0, Number.MAX_SAFE_INTEGER),
    }),
    limit: (0, exports.getLimitFlagWithCustomValues)({ defaultTo: 50, limit: 100 }),
};
