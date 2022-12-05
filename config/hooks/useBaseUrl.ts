import { useRouter } from 'next/router'
import { defaultLocale } from '@config/hooks/useStoreConfig'
import {
    defaultRegionalLocales,
    TDefaultRegionalLocales
} from '@preload/utils/usePreloadedData'

export interface IBaseUrl {
    baseUrl: string
    region: TDefaultRegionalLocales
    language: string
}

export const useBaseUrl = (baseUrl: string): IBaseUrl => {
    const router = useRouter()
    const { locale = defaultLocale } = router
    const language = locale.split('-')[0]
    const region = locale.split('-')[1]

    const baseUrlFormated = baseUrl?.split('/')?.slice(0, 3)?.join('/')

    if (!baseUrlFormated || !language || !region) {
        return {
            baseUrl: '',
            region: defaultRegionalLocales.UK as TDefaultRegionalLocales,
            language: ''
        }
    }

    return {
        baseUrl: baseUrlFormated,
        region: region as TDefaultRegionalLocales,
        language: language
    }
}
