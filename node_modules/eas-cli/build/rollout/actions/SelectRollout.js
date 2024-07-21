"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectRollout = void 0;
const SelectChannel_1 = require("../../channel/actions/SelectChannel");
const ora_1 = require("../../ora");
const branch_mapping_1 = require("../branch-mapping");
/**
 * Select an existing rollout for the project.
 */
class SelectRollout {
    async runAsync(ctx) {
        let assetSpinner = null;
        const afterEachFilterQuery = (_externalQueryParams, totalNodesFetched, _dataset, willFetchAgain) => {
            if (willFetchAgain && !assetSpinner) {
                assetSpinner = (0, ora_1.ora)().start('Fetching channels...');
            }
            if (assetSpinner) {
                assetSpinner.text = `Fetched ${totalNodesFetched} channels`;
            }
        };
        const selectChannelAction = new SelectChannel_1.SelectChannel({
            printedType: 'rollout',
            filterPredicate: branch_mapping_1.isRollout,
            afterEachFilterQuery,
        });
        const channelInfo = await selectChannelAction.runAsync(ctx);
        if (assetSpinner) {
            assetSpinner.succeed(`Fetched all channels`);
        }
        return channelInfo;
    }
}
exports.SelectRollout = SelectRollout;
