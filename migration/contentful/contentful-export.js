const contentfulExport = require('contentful-export');
const config = require('./cli-constants');
const fileManager = require('./migration-file-manager')
const getEntryIds = require('./utils/getEntryIds');

const convertToSysArray = (entries) => [`sys.id[in]=${entries.join(',').replace(/\s/g, '')}`];

module.exports = async (input) => {
    const { exportEnvironmentId, exportAssets } = input

    const entries = await getEntryIds(input);

    if (!entries) {
        throw Error(
            `Cannot export type ${config.blacklistExports?.join(',')} from ${exportEnvironmentId}`
        );
    }

    //set the export env
    config.exportEnv = exportEnvironmentId;

    //build export config
    const canExportAssets = exportAssets === 'Yes' && entries.assetIds?.length;
    const options = {
        ...config.exportOptions,
        environmentId: exportEnvironmentId,
        queryEntries: convertToSysArray(entries.entryIds),
        ...(canExportAssets) && {
            queryAssets: convertToSysArray(entries.assetIds)
        }
    }

    // contentful api trigger
    await contentfulExport(options).then(
        () => fileManager.resetAssets(canExportAssets)
    ).catch((e) => {
        throw Error('Data export Failed', e);
    })
}