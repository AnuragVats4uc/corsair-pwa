import type { GraphqlFetchOutput } from '@pylot-data/graphqlFetch'
import type { Products } from '@pylot-data/fwrdschema'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import type { Maybe, QueryProductsArgs } from '@pylot-data/pylotschema'
import type { RequestInit } from '@vercel/fetch'
import type { SearchCriteria } from '@corratech/corsair-filters-and-sort'
import { productSearchQuery } from '@pylot-data/hooks/search/graphql/productSearchQuery'
export type ProductSearchResult = {
    products: Maybe<Products>
}

async function searchProducts({
    searchTerm,
    searchCriteria = [],
    pageSize,
    currentPage = 1,
    fetchOptions,
    locale = ''
}: {
    searchTerm: string
    searchCriteria?: SearchCriteria[]
    pageSize?: number
    currentPage?: number
    fetchOptions?: RequestInit
    locale?: string
}): Promise<GraphqlFetchOutput<ProductSearchResult> | undefined | null> {
    const productData = await graphqlFetch<
        QueryProductsArgs & { searchCriteria: SearchCriteria[] },
        ProductSearchResult
    >({
        query: productSearchQuery,
        variables: {
            searchCriteria,
            search: searchTerm,
            pageSize,
            currentPage
        },
        fetchOptions,
        locale
    })

    return productData
}

export default searchProducts
