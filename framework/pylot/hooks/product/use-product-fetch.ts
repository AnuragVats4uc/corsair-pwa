import type {
    OutputInterface,
    ProductVariablesInterface
} from '@pylot-data/api/operations/get-product'
import { SwrUseQueryOutput, useQuery } from '@pylot-data/hooks/use-query'
import { GiftCardTypeEnum } from '@pylot-data/enums/GiftCardTypeEnum.d'
import { RequestInit } from '@vercel/fetch'
import { SWRConfiguration } from 'swr'
import getProduct from '@pylot-data/api/operations/get-product'
import { useRouter } from 'next/router'
import { RequireAtLeastOne } from '@lib/utils/typeUtils'

export enum ProductType {
    CONFIGURABLE_PRODUCT = 'ConfigurableProduct',
    SIMPLE_PRODUCT = 'SimpleProduct',
    GROUPED_PRODUCT = 'GroupedProduct',
    GIFT_CARD_PRODUCT = 'GiftCardProduct',
    DOWNLOADABLE_PRODUCT = 'DownloadableProduct',
    BUNDLE_PRODUCT = 'BundleProduct',
    VIRTUAL_PRODUCT = 'VirtualProduct'
}

//Define the current supported product type
const SUPPORTED_PRODUCT_TYPES = [
    ProductType.SIMPLE_PRODUCT,
    ProductType.CONFIGURABLE_PRODUCT,
    ProductType.GIFT_CARD_PRODUCT
]

export type UseProductFetchReturn<ProductType> = {
    product: ProductType
    isSupportedProductType: boolean
    isConfig: boolean
    isGiftCard: boolean
} & SwrUseQueryOutput<OutputInterface>

type ProductOptions = RequireAtLeastOne<
    {
        productUrl?: string | null // backwards compatibility
        sku?: string | null
        url_key?: string | null
        category_url_key?: string | null
    },
    'productUrl' | 'sku' | 'url_key' | 'category_url_key'
>

type ProcessedProductOptions = RequireAtLeastOne<
    {
        sku?: string | null
        url_key?: string | null
        category_url_key?: string | null
    },
    'sku' | 'url_key' | 'category_url_key'
>

export type UseProductFetch<ProductType> = (
    productOptions: ProductOptions,
    swrOptions?: SWRConfiguration,
    fetchOptions?: RequestInit
) => UseProductFetchReturn<ProductType>

const placeholder_image = {
    __typename: 'ProductImage',
    disabled: false,
    label: 'Product image coming soon',
    position: 0,
    url: `${
        typeof window !== 'undefined' ? window.location.origin : ''
    }/images/default-product-image.png`
}

export const useProductFetch: UseProductFetch<any> = (
    productOptions,
    swrOptions,
    fetchOptions
) => {
    const { locale } = useRouter()

    // Backward compatibility
    if (productOptions.productUrl) {
        productOptions.url_key = productOptions.productUrl
        delete productOptions.productUrl
    }
    const processedProductOptions = productOptions as ProcessedProductOptions

    let preview: string | null = ''
    let previewDate: string | null = ''
    if (typeof window !== 'undefined') {
        preview = window.localStorage.getItem('isPreview')
        previewDate = window.localStorage.getItem('previewDate')
    }

    // useQuery to fetch data
    const SWRResult = useQuery<ProductVariablesInterface, OutputInterface>(
        `algolia-product-detail-${locale}-${Object.values(productOptions).join(
            '-'
        )}`,
        {
            searchCriteria: []
        },
        swrOptions,
        fetchOptions,
        {
            overrideFetcher: async () => {
                try {
                    const res = await getProduct({
                        ...processedProductOptions,
                        locale: locale || 'en-US',
                        fetchOptions,
                        isPreview: !!preview,
                        previewDate: previewDate
                            ? parseInt(previewDate)
                            : undefined
                    })
                    return {
                        data: res
                    }
                } catch (error) {
                    console.log(error)
                    return {
                        data: {
                            productDetail: {
                                items: []
                            }
                        },
                        errors: [error]
                    } as any // INDEXER TODO
                }
            }
        }
    )

    const product =
        SWRResult.data?.data?.productDetail?.items[0] ||
        swrOptions?.initialData.data?.data?.productDetail?.items[0]!

    const productType = product?.__typename as ProductType | undefined
    const isConfig = productType === ProductType.CONFIGURABLE_PRODUCT
    const isGiftCard =
        productType === ProductType.GIFT_CARD_PRODUCT &&
        product?.giftcard_type === GiftCardTypeEnum.Virtual

    //check if the product type is supported to render the product page
    const isSupportedProductType = SUPPORTED_PRODUCT_TYPES.includes(
        productType as ProductType
    )

    if (product && (!product.image || product.image.url === '')) {
        product.image = placeholder_image
    }
    if (
        product &&
        (!product.media_gallery.length || product.media_gallery[0].url === '')
    ) {
        product.media_gallery = [placeholder_image]
    }

    return {
        product,
        isSupportedProductType,
        isConfig,
        isGiftCard,
        ...SWRResult
    }
}
