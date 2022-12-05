import { useBaseUrl } from '@config/hooks/useBaseUrl'
import type { ConfigurableProduct } from '@pylot-data/fwrdschema'
import type {
    Maybe,
    SimpleProduct,
    ProductInterface
} from '@pylot-data/pylotschema'
import type { PylotFrontendConfig, ModelType } from 'config'
import { getStoreConfig } from 'config'

interface IProductURL {
    page: ModelType
    product: SimpleProduct | ConfigurableProduct | ProductInterface | undefined
    url_key?: Maybe<string>
    config?: PylotFrontendConfig
    absolute?: boolean
}

// Returns the product URL directly
export const useBuildProductUrl = (args: IProductURL): string => {
    const {
        page,
        product,
        url_key = args?.product?.url_key,
        config,
        absolute = true
    } = args
    const storeConfig = config || getStoreConfig()

    const category = product?.categories ? product.categories[0] : null
    const categoryUrlSlug = category?.url_path
        ? category.url_path?.trim().replace(/\s+/g, '-').toLowerCase()
        : null
    const skuName = product?.sku
        ? product.sku.trim().replace(/\s+/g, '-').toLowerCase()
        : null

    const { directory, suffix } = storeConfig.base.url.model[page] ?? {}

    const { host = null } = typeof window !== 'undefined' ? window.location : {}

    let baseUrl = '/'
    if (absolute) {
        baseUrl =
            process.env.NEXT_ENV === 'localhost' || host?.includes('localhost')
                ? storeConfig.base.url.localHostBaseUrl
                : storeConfig.base.url.baseUrl
    }

    const {
        baseUrl: baseUrlFormated,
        region: currentRegion,
        language: currentLanguage
    } = useBaseUrl(baseUrl)

    const basePath = `${baseUrlFormated}/${currentRegion?.toLowerCase()}/${currentLanguage}/${directory}`

    return `${basePath}/${categoryUrlSlug}/${skuName}/${url_key}${suffix}`
}

// Duplicate of the above function, but this one returns a function which can be used to build the URL
export const useProductUrlBuilder = (
    // Use the same type as above, minus the product and url_key,
    // which will be passed to the returned-function instead of to the hook
    args: Omit<IProductURL, 'product' | 'url_key'>
): ((args: {
    product: SimpleProduct | ConfigurableProduct | ProductInterface | undefined
    url_key?: Maybe<string>
}) => string) => {
    const { page, config, absolute = true } = args
    const storeConfig = config || getStoreConfig()

    const { host = null } = typeof window !== 'undefined' ? window.location : {}
    let baseUrl = '/'
    if (absolute) {
        baseUrl =
            process.env.NEXT_ENV === 'localhost' || host?.includes('localhost')
                ? storeConfig.base.url.localHostBaseUrl
                : storeConfig.base.url.baseUrl
    }

    const {
        baseUrl: baseUrlFormated,
        region: currentRegion,
        language: currentLanguage
    } = useBaseUrl(baseUrl)

    return (args) => {
        const { product, url_key = args?.product?.url_key } = args
        const category = product?.categories ? product.categories[0] : null
        const categoryUrlSlug = category?.url_path
            ? category.url_path?.trim().replace(/\s+/g, '-').toLowerCase()
            : null
        const skuName = product?.sku
            ? product.sku.trim().replace(/\s+/g, '-').toLowerCase()
            : null

        const { directory, suffix } = storeConfig.base.url.model[page] ?? {}
        const basePath = `${baseUrlFormated}/${currentRegion?.toLowerCase()}/${currentLanguage}/${directory}`

        return `${basePath}/${categoryUrlSlug}/${skuName}/${url_key}${suffix}`
    }
}
