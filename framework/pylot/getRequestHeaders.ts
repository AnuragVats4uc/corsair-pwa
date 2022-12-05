import type { RequestInit } from '@vercel/fetch'

type PylotRequestHeaders = {
    'x-pylot-query'?: string
    'x-pylot-backend'?: string
    Store?: string
    Authorization?: string
    locale?: string
    region?: string
    'Content-Type'?: 'application/json'
    sid: string
    cid?: string
    preview?: string
    'preview-date'?: string
}

const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US'

export const defaultRegionByLanguage: Record<string, string> = {
    en: 'US',
    de: 'DE',
    es: 'ES',
    fr: 'FR',
    it: 'IT',
    ja: 'JP',
    ko: 'KR',
    pt: 'PT',
    ru: 'RU',
    zh: 'CN',
    pl: 'PL'
}

const getLocaleAndRegion = (
    localeString = defaultLocale
): Pick<PylotRequestHeaders, 'locale' | 'region'> => {
    const localeParts = localeString.split('-')
    const defaultRegion = defaultRegionByLanguage[localeParts[0]]
    // Use the second part of locale string as region, if it is available
    const region = localeParts.length > 1 ? localeParts[1] : defaultRegion
    // In Corsair we are using the same content for all the regional locale versions (en-US, en-GB and so on),
    // hence we need only the language part of the locale to be passed in GraphQL requests
    return { locale: localeParts[0], region }
}

export const getRequestHeaders = ({
    fetchOptions,
    locale,
    queryName,
    requestMethod,
    isPreview,
    previewDate
}: {
    fetchOptions?: RequestInit
    locale?: string
    queryName: string
    requestMethod: 'GET' | 'POST'
    isPreview: boolean
    previewDate?: number
}): PylotRequestHeaders => {
    const headers: PylotRequestHeaders = {
        ...fetchOptions?.headers,
        ...getLocaleAndRegion(locale),
        'x-pylot-query': queryName,
        sid: ''
    }

    const setSid = (): void => {
        const sid = {
            sid: Math.random().toString(16).substr(2),
            expire: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        }
        window.localStorage.setItem('sid', JSON.stringify(sid))
        headers['sid'] = JSON.stringify(sid.sid)
    }

    const checkSidExpiry = (): void => {
        const sid = window.localStorage.getItem('sid') ?? null
        if (!sid) {
            setSid()
        } else {
            const parsedSid = JSON.parse(sid)
            const now = new Date()
            if (now.getTime() > parsedSid.expire) {
                setSid()
            } else {
                headers['sid'] = parsedSid.sid
            }
        }
    }

    if (typeof window !== 'undefined') {
        checkSidExpiry()
        const cid = window.localStorage.getItem('cid') ?? null
        if (cid) {
            headers['cid'] = cid
        }
    }

    if (requestMethod === 'POST') {
        headers['Content-Type'] = 'application/json'
    }

    if (process.env.NEXT_PUBLIC_X_PYLOT_BACKEND) {
        headers['x-pylot-backend'] = process.env.NEXT_PUBLIC_X_PYLOT_BACKEND
    }

    if (process.env.NEXT_PUBLIC_STORE_CODE) {
        headers.Store = process.env.NEXT_PUBLIC_STORE_CODE
    }

    if (typeof window !== 'undefined') {
        const savedToken = window.localStorage.getItem('pylot_token') || null
        if (savedToken) {
            headers.Authorization = `Bearer ${savedToken}`
        }
    }
    if (isPreview && previewDate) {
        headers.preview = 'true'
        headers['preview-date'] = previewDate.toString()
    }

    return headers
}
