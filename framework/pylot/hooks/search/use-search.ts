import { SWRInfiniteConfiguration } from 'swr'
import type { GraphQLError } from '@pylot-data/graphqlFetch'
import {
    usePaginatedQuery,
    SwrUsePaginatedQueryOutput
} from '../use-paginated-query'
import type { RequestInit } from '@vercel/fetch'
import {
    Products,
    QueryProductsArgs,
    ProductInterface,
    Maybe
} from '@pylot-data/pylotschema'
import { productSearchQuery } from './graphql/productSearchQuery'
import type { SearchCriteria } from '@corratech/corsair-filters-and-sort'

type UseCategoryResult = {
    productsResult?: Maybe<Products>
    productItems: ProductInterface[]
    isLastPage: boolean
    isLoading: boolean
    error: GraphQLError | undefined
    productsSwrResult: SwrUsePaginatedQueryOutput<{
        data: { products: Products }
    }>
}

export const useSearch = (
    searchTerm: string,
    searchFilters: QueryProductsArgs & { searchCriteria: SearchCriteria[] },
    swrOptions: SWRInfiniteConfiguration = {},
    fetchOptions?: RequestInit,
    disabled = false
): UseCategoryResult => {
    const { pageSize, searchCriteria = [], sort, currentPage } = searchFilters

    const variables: QueryProductsArgs & {
        searchCriteria?: SearchCriteria[]
    } = {
        search: searchTerm,
        currentPage,
        pageSize,
        sort
    }

    if (searchCriteria.length > 0) {
        variables.searchCriteria = searchCriteria
    }

    const productsSwrResult = usePaginatedQuery<
        QueryProductsArgs & { searchCriteria?: SearchCriteria[] },
        { data: { products: Products } }
    >(
        disabled ? null : productSearchQuery,
        variables,
        'currentPage',
        swrOptions,
        fetchOptions
    )

    const { size } = productsSwrResult
    const initialSizeOffset = (swrOptions.initialSize ?? 1) - 1
    // currentPageIndex is used to get data for the current page
    const currentPageIndex = size - 1 - initialSizeOffset

    const mostRecentProductsQueryResult =
        productsSwrResult.data?.[currentPageIndex]?.data

    const productsResult = mostRecentProductsQueryResult?.products

    const isLastPage =
        mostRecentProductsQueryResult?.products?.page_info?.current_page ===
            mostRecentProductsQueryResult?.products?.page_info?.total_pages ??
        false

    const products =
        productsSwrResult?.data
            ?.slice(0, size - initialSizeOffset)
            ?.reduce<ProductInterface[]>((acc, resultPage) => {
                const productItemsLength =
                    searchTerm && resultPage?.data?.products?.items?.length
                // due to ?s used above, this condition will check that
                // products.items exists AND has length > 0
                if (productItemsLength) {
                    return [
                        ...acc,
                        // see comment above -> we know this is defined and contains Product Items
                        ...(resultPage.data?.products
                            ?.items! as ProductInterface[])
                    ]
                }

                return acc
            }, []) ?? []

    return {
        productsResult,
        productItems: products as ProductInterface[],
        isLastPage,
        isLoading: !productsSwrResult.data && productsSwrResult.isValidating,
        error: productsSwrResult.error,
        productsSwrResult
    }
}
