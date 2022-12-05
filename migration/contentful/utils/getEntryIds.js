const contentfulClient = require('./contentful-client')
const fieldTypes = require('./fieldTypes');
const isRestrictedEntry = require('./isRestrictedEntry');
const mergeObjects = require('./merge-objects');

/**
 * Get Entries List
 * @param {*} exportEnvironmentId 
 * @param {*} queryEntries 
 * @param {*} entry 
 * @returns 
 */
const getContentfulEntry = async (
    exportEnvironmentId,
    queryEntries
) => {
    const client = contentfulClient(exportEnvironmentId)
    const content = await client.getEntry(queryEntries.trim());
    return getLinkedEntries(content);
}

/**
 * Generate the default entry format
 * @returns 
 */
const generateEntry = () => ({
    entryIds: [],
    assetIds: [],
    linkedIds: []
})

/**
 * Loop through the object tree and fetch entryids and assetsids
 * @param {*} entries 
 * @param {*} entry 
 * @returns 
 */
const getLinkedEntries = (entries, entry = generateEntry()) => {
    const { isEntryData, isAsset, isLinkEntry } = fieldTypes;

    if (!entries || isRestrictedEntry(entries)) return;

    Object.entries(entries).forEach(([key, value]) => {
        const { entryIds, assetIds, linkedIds } = entry;
        //push linked entry ids
        if (isEntryData(value, key)
            && !entryIds.includes(value.id)) {
            entryIds.push(value.id);
        }

        //push linked assets id
        if (isAsset(value, key)
            && !assetIds.includes(value.id)) {
            assetIds.push(value.id);
        }

        if (isLinkEntry(value, key)
            && !linkedIds.includes(value.id)) {
            linkedIds.push(value.id);
        }

        //if fields re-iterate the loop
        if (key === 'fields') getLinkedEntries(value, entry);

        //if array re-iterate the loop
        if (Array.isArray(value)) {
            value?.forEach(item => getLinkedEntries(item, entry))
        }

        //if object re-iterate the loop
        if (typeof value === 'object') {
            getLinkedEntries(value, entry);
        }
    })

    return entry;
}


/**
 * Loop through the linkedIds and fetch entryids and assets ids
 * @param {*} entires 
 * @param {*} environmentId 
 * @returns 
 */
const getRootLinkedIds = async (entires, environmentId) => {
    if (!entires?.linkedIds?.length) return;

    return await Promise.all(entires.linkedIds?.map(async (id) => {
        const collection = await getContentfulEntry(environmentId, id);

        if (collection?.linkedIds?.length) {
            getRootLinkedIds(collection, environmentId);
        }

        return collection;
    }))

}

/**
 * Ids and assets neede for the entire export of the entry.
 * @param {*} input 
 * @returns 
 */
const getEntryIds = async (input) => {
    const { exportEnvironmentId, queryEntries } = input;
    const entries = await getContentfulEntry(exportEnvironmentId, queryEntries);

    if (!entries) return null;

    const linkedData = await getRootLinkedIds(entries, exportEnvironmentId);
    //merge the linked assets with entry assets and remove the duplicated entries
    mergeObjects(linkedData, entries);
    return entries;
}

module.exports = getEntryIds
