// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import type { PylotFrontendConfig } from '../config/config.d'
import type { FrontendConfig } from './graphql/getConfig.d'
import { defaultConfig } from '../config'
import { GraphQLError, graphqlFetch } from '../framework/pylot/graphqlFetch'
import { deepMerge } from '@typescript-eslint/experimental-utils/dist/eslint-utils/deepMerge'
import { defaultLocale } from '../config/hooks/useStoreConfig'
import stringify from 'fast-json-stable-stringify'
import { removeOldData } from './utils/removeOldData'
import { defaultRegionalLocales } from './utils/usePreloadedData'
import { warmUpTranslations } from './utils/warmUpTranslations'

/* eslint-disable @typescript-eslint/no-var-requires */
require('@next/env').loadEnvConfig(`${__dirname}./../`)
global.fetch = require('node-fetch')
const fs = require('fs')
const prettier = require('prettier')
const prettierConfig = require('../.prettierrc.js')
const { getConfig } = require(`./graphql/getConfig`)
/* eslint-enable @typescript-eslint/no-var-requires */

const preloadItem = (
    name: string,
    item: {
        queryPath?: string
        variables?: Record<string, unknown> | null
        fetchConfig?: Record<string, unknown>
    },
    locale?: string
) => {
    const { queryPath, variables, fetchConfig } = item
    if (!queryPath) return
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const query = require(`../${queryPath}`)
    graphqlFetch({
        query: query.default,
        variables,
        locale,
        fetchOptions: fetchConfig
    }).then(async (resp) => {
        if (resp.errors) {
            return console.error(resp.errors)
        }
        fs.writeFile(
            `./preload/data/${locale}_${name}.json`,
            stringify(resp),
            (err: never) =>
                err
                    ? console.error(err)
                    : console.info(`Preloaded ${locale}/${name}`)
        )
    })
}

const logConfigQueryErrors = (errors: GraphQLError[], region: string): void => {
    console.log(`Configuration data for ${region} region has errors:`)
    errors.forEach((error) => {
        console.error('\x1b[31m%s\x1b[0m', error.message)
        if ('debugMessage' in error) {
            console.debug('\x1b[31m%s\x1b[0m', error['debugMessage'])
        }
    })
    console.info(stringify(errors))
    // If default store config fails to load, build process must be interrupted
    if (`${DEFAULT_LANGUAGE}-${region}` === defaultLocale) {
        throw new Error(
            `Failed to load default configuration. The build process is interrupted`
        )
    }
}

const saveConfigFile = (config: FrontendConfig, locale: string): void => {
    const filePath = `./config/stores/${locale}.ts`
    const formattedConfig = prettier.format(
        `import type { PylotFrontendConfig } from '../config.d'
             export const config: PylotFrontendConfig =${stringify(config)}`,
        { ...prettierConfig, parser: 'babel' }
    )
    fs.writeFileSync(filePath, formattedConfig, (err: never) =>
        err
            ? console.error(err)
            : console.info('\x1b[32m%s\x1b[0m', `Loaded config: ${locale}`)
    )
}

const DEFAULT_LANGUAGE = 'en'

const preloadStoreData = async (locale: string) => {
    await graphqlFetch<null, { config: FrontendConfig }>({
        query: getConfig,
        locale
    })
        .then(async ({ errors, data }) => {
            if (errors) {
                logConfigQueryErrors(errors, locale)
                return
            }
            // Merge config with default data
            const mergedConfig = deepMerge(
                defaultConfig,
                data.config
            ) as PylotFrontendConfig

            const localeParts = locale.split('-')
            saveConfigFile(mergedConfig, localeParts[1])
            if (!mergedConfig.preload) {
                return
            }

            // Preload content parts for all the locales
            Object.entries(mergedConfig.preload).forEach(([name, item]) => {
                if (item && typeof item !== 'string' && item.queryPath) {
                    preloadItem(name, item, locale)
                }
            })
        })
        .catch((error) => {
            if (error && error['message']) {
                console.log('\x1b[31m%s\x1b[0m', error['message'])
            } else {
                console.log('\x1b[31m%s\x1b[0m', 'Invalid backend data')
            }
            // Uncaught errors should interrupt the build process
            process.exit(1)
        })
}

warmUpTranslations().then(() =>
    console.info('\x1b[32m%s\x1b[0m', `Warmed up translations cache`)
)

removeOldData()

// Preload default locale for each region, as there may be region-specific content
Object.entries(defaultRegionalLocales).forEach(([region, language]) =>
    preloadStoreData(`${language}-${region}`)
)
