import { useRouter } from 'next/router'
import type { PylotFrontendConfig } from '../config.d'

export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US'

// In Corsair implementation, we do not use base store code prefix, so store code becomes the same as the current locale
export const getStoreCode = (locale = defaultLocale): string => locale

// Load store-specific (if available) or default config
export const getStoreConfig = (locale?: string): PylotFrontendConfig => {
    const region = (locale ?? defaultLocale).split('-')[1]
    /* eslint-disable @typescript-eslint/no-var-requires */
    const { config } = require(`@config/stores/${region}`) as {
        config: PylotFrontendConfig
    }
    return config
}

export const useStoreConfig = (): PylotFrontendConfig => {
    const { locale } = useRouter()
    return getStoreConfig(locale)
}
