// eslint-disable-next-line
const { localeUrlSubpaths_Hyphens } = require('./localesConfig')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Backend = require('./next-i18next-backend')

const storeCode = process.env.NEXT_PUBLIC_STORE_CODE || 'default'
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US'

const storeLocalesMap = {
    [storeCode]: localeUrlSubpaths_Hyphens
}

module.exports = {
    i18n: {
        localeDetection: false, // Akamai will handle redirects
        defaultLocale,
        locales: storeLocalesMap[storeCode]
    },
    nsSeparator: '||',
    keySeparator: '|',
    fallbackLng: 'en',
    nonExplicitSupportedLngs: true,
    use: [Backend],
    serializeConfig: false,
    ns: ['common'],
    preload: [defaultLocale]
}
