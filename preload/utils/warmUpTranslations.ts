import { defaultLocale } from '../../config/hooks/useStoreConfig'
import { getTranslation } from './../../framework/pylot/api/operations/get-translation'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const localeConfig = require('../../localesConfig') as {
    LANGUAGE_CODES_MAP: string[]
}

const namespaces = ['common', 'account', 'pdp', 'plp', 'cms']

// Preload all the namespace-language combinations, so that during the build time cached response can be used
export const warmUpTranslations = async (): Promise<unknown[]> => {
    const defaultRegion = defaultLocale.split('-')[1]
    return Promise.all(
        Object.values(localeConfig.LANGUAGE_CODES_MAP).map((language) =>
            Promise.all(
                namespaces.map((namespace) =>
                    getTranslation([namespace], `${language}-${defaultRegion}`)
                )
            )
        )
    )
}
