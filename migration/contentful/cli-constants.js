require('dotenv').config()
/**
 * Store the exported data on a path to re-import
 * to the different environment
 */
const paths = {
    directory: '.contentful-migration',
    file: 'data.json',
    baseUrl: `./migration/contentful/`
}

//globally set the export env for validtion
let exportEnv = '';

/**
 * Restrict the export and import of products and category
 * these are data pushed by exteranl triggers
 */
const blacklistExports = ['product', 'category'];

/**
 * Contentful credentials
 */
const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}

/**
 * defaut keys needs for export / import
 */
const defaultOptions = {
    spaceId: contentfulConfig.spaceId,
    managementToken: contentfulConfig.managementToken,
}

/**
 * required params for export the data
 */
const exportOptions = {
    ...defaultOptions,
    contentOnly: true,
    exportDir: `${paths.baseUrl}/${paths.directory}`,
    contentFile: paths.file
}

/**
 * required params for importing the data
 */
const importOptions = {
    ...defaultOptions,
    contentFile: `${paths.baseUrl}/${paths.directory}/${paths.file}`,
    errorLogFile: `${paths.baseUrl}/${paths.directory}`
}

module.exports = {
    paths,
    exportEnv,
    defaultOptions,
    exportOptions,
    importOptions,
    contentfulConfig,
    blacklistExports
}