/**
 * Merge the linked assets with entires assets to migrate
 * @param {*} linkedEntries 
 * @param {*} entries 
 */
module.exports = async (linkedEntries, entries) => {
    if (!linkedEntries?.length) return;

    Object.entries(linkedEntries)?.forEach(([key, linedEntry]) => {
        if (linedEntry.entryIds?.length) {
            entries.entryIds = [...new Set([...entries.entryIds, ...linedEntry.entryIds])]
        }

        if (linedEntry.assetIds?.length) {
            entries.assetIds = [...new Set([...entries.assetIds, ...linedEntry.assetIds])]
        }
    })
}