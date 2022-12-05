const fs = require('fs');
const config = require('./cli-constants')

/**
 * Reset the assets[] in the JSON to prevent unwanted import of assets
 * @param {} exportAssets 
 * @returns 
 */
const resetAssets = (canExportAssets) => {
    if (canExportAssets) return;

    try {
        const { baseUrl, directory, file } = config.paths;
        const path = `${baseUrl}/${directory}/${file}`;
        const data = fs.readFileSync(path, 'utf8');
        const json = JSON.parse(data)

        if (json.hasOwnProperty('assets')) {
            json.assets.length = 0;
        }
        fs.writeFileSync(path, JSON.stringify(json), { encoding: 'utf8' });

    } catch (e) {
        throw Error('Unable to process the export file for rest', e);
    }
}

/**
 * Create Folder to store the exported JSON data 
 * user to import on later process
 */
const createDirectory = () => {
    console.log(`${config.paths.baseUrl}/${config.paths.directory}`);
    try {
        const directory = `${config.paths.baseUrl}/${config.paths.directory}`;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory)
        }
    } catch (e) {
        throw Error('Unable to create folder for migration', e);
    }
}

module.exports = {
    createDirectory,
    resetAssets
}