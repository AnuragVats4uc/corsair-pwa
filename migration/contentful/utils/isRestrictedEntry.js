const fieldTypes = require('./fieldTypes');

/**
 * check if the specified entry is restricted to export
 * @param {*} entries 
 * @returns 
 */
module.exports = (entries) => {
    let shouldRestrict = false;
    Object.entries(entries).forEach(([key, value]) => {
        if (fieldTypes.isRestrictedEntry(value)) {
            shouldRestrict = true;
            return;
        }
    })
    return shouldRestrict;
}