const contentfulImport = require('contentful-import');
const config = require('./cli-constants');

module.exports = async (input) => {
    const { shouldImport, importEnvironmentId } = input;

    if (shouldImport === 'No') return;

    const options = {
        ...config.importOptions,
        environmentId: importEnvironmentId
    }

    //trigger import contentful api
    await contentfulImport(options).then(() => {
        console.log(`success: Importing completed to ${importEnvironmentId}`);
    }).catch((e) => {
        console.log('Exception:', e)
    })
}