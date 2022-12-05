const REGION_CODES_MAP = {
    brazil: 'BR',
    canada: 'CA',
    china: 'CN',
    europe: 'EU',
    france: 'FR',
    germany: 'DE',
    global: 'WW',
    italy: 'IT',
    japan: 'JP',
    korea: 'KR',
    latin_america: 'LM',
    poland: 'PL',
    portugal: 'PT',
    russia: 'RU',
    spain: 'ES',
    taiwan: 'TW',
    united_kingdom: 'UK',
    united_states: 'US'
}

const LANGUAGE_CODES_MAP = {
    english: 'en',
    german: 'de',
    spanish: 'es',
    french: 'fr',
    italian: 'it',
    japanese: 'ja',
    korean: 'ko',
    portuguese: 'pt',
    russian: 'ru',
    chinese: 'zh',
    polish: 'pl'
}

const subpathsToHypensMap = {}
const localeUrlSubpaths_Hyphens = []

Object.values(REGION_CODES_MAP).forEach((region) =>
    Object.values(LANGUAGE_CODES_MAP).forEach((lang) => {
        localeUrlSubpaths_Hyphens.push(`${lang}-${region}`)
        subpathsToHypensMap[
            `${region.toLowerCase()}/${lang}` // using toLowerCase to match Corsair's existing URL structure
        ] = `${lang}-${region}`
    })
)

const REGION_CODES_MAP_FOR_TESTING = {
    united_states: 'US'
}

const LANGUAGE_CODES_MAP_FOR_TESTING = {
    english: 'en'
}

const subpathsToHypensMapForTesting = {}
const localeUrlSubpaths_HyphensForTesting = []

Object.values(REGION_CODES_MAP_FOR_TESTING).forEach((region) =>
    Object.values(LANGUAGE_CODES_MAP_FOR_TESTING).forEach((lang) => {
        localeUrlSubpaths_HyphensForTesting.push(`${lang}-${region}`)
        subpathsToHypensMapForTesting[
            `${region.toLowerCase()}/${lang}` // using toLowerCase to match Corsair's existing URL structure
        ] = `${lang}-${region}`
    })
)

module.exports = process.env.IS_GIT_HOOK
    ? {
          LANGUAGE_CODES_MAP: LANGUAGE_CODES_MAP_FOR_TESTING,
          REGION_CODES_MAP: REGION_CODES_MAP_FOR_TESTING,
          subpathsToHypensMap: subpathsToHypensMapForTesting,
          localeUrlSubpaths_Hyphens: localeUrlSubpaths_HyphensForTesting
      }
    : {
          LANGUAGE_CODES_MAP,
          REGION_CODES_MAP,
          subpathsToHypensMap,
          localeUrlSubpaths_Hyphens
      }
