import { defaultLocale } from '../../config/hooks/useStoreConfig'
import { useRouter } from 'next/router'
import { defaultRegionByLanguage } from '../../framework/pylot/getRequestHeaders'

// A list of regions and their default locales
// Only these locales are preloaded
export const defaultRegionalLocales = {
    BR: 'pt',
    CA: 'en',
    CN: 'zh',
    EU: 'en',
    FR: 'fr',
    DE: 'de',
    WW: 'en',
    IT: 'it',
    JP: 'ja',
    KR: 'ko',
    LM: 'es',
    PL: 'pl',
    PT: 'pt',
    RU: 'ru',
    ES: 'es',
    TW: 'zh',
    UK: 'en',
    US: 'en'
}

export type TDefaultRegionalLocales = keyof typeof defaultRegionalLocales

const isPreloadedRegion = (region: string): region is TDefaultRegionalLocales =>
    region in defaultRegionalLocales

// Based on the locale, provided by router, first identify the region to load the data for,
// then based on that region identify the locale that can be loaded for it (among preloaded locales)
const getPreloadedLocale = (locale = defaultLocale): string => {
    const localeParts = locale.split('-')
    const language = localeParts[0]
    let region = localeParts[1]
    // Resolve region for locales without region (en/es/zh...)
    if (!region) {
        const defaultRegion = defaultLocale.split('-')[1]
        region = defaultRegionByLanguage[language] ?? defaultRegion
    }
    if (!isPreloadedRegion(region)) {
        return defaultLocale
    }
    const defaultLanguageForRegion = defaultRegionalLocales[region]
    return `${defaultLanguageForRegion}-${region}`
}

// Load file from locale folder if exists, or from default locale folder
export const usePreloadedData = (name: string): string => {
    const result = '{}'
    const { locale: routerLocale } = useRouter()
    // Important: do not merge store code resolution and require statement
    // (this is needed for webpack to index /data/ folder correctly)
    try {
        const preloadedLocale = getPreloadedLocale(routerLocale)
        return require(`../data/${preloadedLocale}_${name}.json`)
    } catch (e) {
        try {
            return require(`../data/${defaultLocale}_${name}.json`)
        } catch (e) {
            return result
        }
    }
}
