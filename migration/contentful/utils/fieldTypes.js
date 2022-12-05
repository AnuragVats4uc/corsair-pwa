const config = require('../cli-constants');
/**
 * Check if its a normal entry
 * @param {} item 
 * @param {*} key 
 * @returns 
 */
const isEntry = (item, key) => {
    return typeof item === 'object'
        && key === 'sys'
        && item.type === 'Entry'
}

/**
 * Check if its a Linked Entry in contnetful
 * @param {*} item 
 * @param {*} key 
 * @returns 
 */
const isLinkEntry = (item, key) => {
    return typeof item === 'object'
        && key === 'sys'
        && item.type === 'Link'
        && item.linkType === 'Entry'
}

/**
 * Check if its a Asset
 * @param {*} item 
 * @param {*} key 
 * @returns 
 */
const isAsset = (item, key) => {
    return typeof item === 'object'
        && key === 'sys' && item.type === 'Asset'
        || typeof item === 'object' && key === 'sys'
        && item.type === 'Link' && item.linkType === 'Asset'
}

const isEntryData = (item, key) => {
    return isEntry(item, key) || isLinkEntry(item, key);
}

/**
 * check if the contenttype is restricted to export
 * @param {*} item 
 * @returns 
 */
const isRestrictedEntry = (item) => {
    return typeof item === 'object'
        && typeof item?.contentType === 'object'
        && item?.contentType?.sys
        && config.blacklistExports.includes(item?.contentType?.sys?.id)
}

module.exports = {
    isEntry,
    isLinkEntry,
    isAsset,
    isEntryData,
    isRestrictedEntry
}