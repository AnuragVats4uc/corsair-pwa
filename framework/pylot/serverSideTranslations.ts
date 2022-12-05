import nextI18NextConfig from 'next-i18next.config.js'
import { serverSideTranslations as i18nextSST } from 'next-i18next/serverSideTranslations'

// Override of the default serverSideTranslations, using the current config
export const serverSideTranslations = (
    initialLocale: string,
    namespacesRequired?: string[] | undefined
) => {
    // For some reason, namespacesRequired are not processed properly with explicit config argument
    if (namespacesRequired) {
        nextI18NextConfig.ns = namespacesRequired
    }
    return i18nextSST(initialLocale, namespacesRequired, nextI18NextConfig)
}

export default serverSideTranslations
