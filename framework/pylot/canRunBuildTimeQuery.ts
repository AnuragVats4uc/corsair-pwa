import { defaultRegionByLanguage } from './getRequestHeaders'

const LIMIT_BUILD_TIME_SSR_QUERIES = ['products', 'contentJson']

// Allows skipping GraphQL queries for non-default locales during build time
export const canRunBuildTimeQuery = (
    queryName: string,
    locale = 'en-US'
): boolean => {
    if (!process.env.IS_BUILD) {
        return true
    }
    if (!LIMIT_BUILD_TIME_SSR_QUERIES.includes(queryName)) {
        return true
    }
    const localeParts = locale.split('-')
    if (localeParts.length !== 2) {
        return true
    }
    const lang = localeParts[0]
    const region = localeParts[1]
    return defaultRegionByLanguage[lang] === region
}
