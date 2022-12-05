import type { RequestInit } from '@vercel/fetch'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import { ConfigurableProduct, GiftCardProduct } from '@pylot-data/fwrdschema'
import { productDetailQuery } from '@pylot-data/hooks/product/graphql/productDetailQuery'
import type { SearchCriteria } from '@corratech/corsair-filters-and-sort'
import { SearchCriteriaFilterActions } from '@corratech/corsair-filters-and-sort'
import { RequireAtLeastOne } from '@lib/utils/typeUtils'

export type ProductVariablesInterface = {
    currentPage?: number
    pageSize?: number
    searchCriteria: SearchCriteria[]
}

export type OutputInterface = {
    productDetail: {
        items: ConfigurableProduct[] & GiftCardProduct[]
    }
}

type GetProductArgs = RequireAtLeastOne<
    {
        sku?: string | null
        url_key?: string | null
        category_url_key?: string | null
        locale: string
        fetchOptions?: RequestInit
        isPreview?: boolean
        previewDate?: number
    },
    'sku' | 'url_key' | 'category_url_key'
>

async function getProduct({
    sku,
    url_key,
    category_url_key,
    locale,
    fetchOptions,
    isPreview,
    previewDate
}: GetProductArgs): Promise<OutputInterface> {
    const searchCriteria = []
    if (sku) {
        searchCriteria.push({
            attribute_code: 'sku',
            filter_action: SearchCriteriaFilterActions.EQ,
            filter_value: sku
        })
    }
    if (url_key) {
        searchCriteria.push({
            attribute_code: 'url_key',
            filter_action: SearchCriteriaFilterActions.EQ,
            filter_value: url_key
        })
    }
    if (category_url_key) {
        searchCriteria.push({
            attribute_code: 'category_url_key',
            filter_action: SearchCriteriaFilterActions.EQ,
            filter_value: category_url_key
        })
    }

    const productData = await graphqlFetch<
        ProductVariablesInterface,
        OutputInterface
    >({
        query: productDetailQuery,
        variables: {
            searchCriteria,
            pageSize: 1
        },
        fetchOptions,
        locale,
        isPreview: !!isPreview,
        previewDate: previewDate
    })

    return productData.data
}

export default getProduct
