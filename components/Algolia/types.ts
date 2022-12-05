import {
    ConfigurableAttributeOption,
    ConfigurableProductOptions,
    CurrencyEnum
} from '@pylot-data/pylotschema'

export const FE_TO_SHOPIFY_REGIONS_MAP = {
    BR: 'BR',
    CA: 'CA',
    CN: 'CN',
    EU: 'NL', // note: the frontend uses EU but we fetch the NL price list
    FR: 'FR',
    DE: 'DE',
    WW: 'US', // note: WW is non-transactional and not supported by shopify so we use the US for data, but we will not display it
    IT: 'IT',
    JP: 'JP',
    KR: 'KR',
    LM: 'US', // note: LM is non-transactional and not supported by shopify so we use the US for data, but we will not display it
    PL: 'PL',
    PT: 'PT',
    RU: 'RU',
    ES: 'ES',
    TW: 'TW',
    UK: 'GB', // note: frontend uses UK for this, but Shopify requires GB
    US: 'US'
} as const

export type AlgoliaObjectPrice = {
    fp?: number // final price
    p?: number // price
    d?: number // discount
}

export type AlgoliaPrice = AlgoliaObjectPrice | number

export type AlgoliaPriceRange = {
    c: CurrencyEnum // currency
    max?: AlgoliaPrice // max price
    min: AlgoliaPrice // min price
}

export type AlgoliaImage = {
    url: string
    label: string
}

export type AlgoliaCategory = {
    n: string // name
    p: string // path
}

export type AlgoliaProduct = {
    __typename?: string
    objectID: number
    uid?: number
    name: string
    sku: string
    url_key: string
    description: string
    backorder?: {
        date?: string
        available?: boolean
    }
    stock_status: boolean | string
    price_range: Record<
        keyof typeof FE_TO_SHOPIFY_REGIONS_MAP,
        AlgoliaPriceRange
    >
    image: AlgoliaImage
    small_image?: AlgoliaImage
    media_gallery: AlgoliaImage[]
    metaTitle: string
    meta_description: string
    categories: AlgoliaCategory[]
    variants?: [
        {
            product: AlgoliaProduct
            attributes: ConfigurableAttributeOption[]
        }
    ]
    configurable_options?: ConfigurableProductOptions[]
}
