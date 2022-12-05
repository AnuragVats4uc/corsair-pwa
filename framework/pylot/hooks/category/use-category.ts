import type {
    CategoryResult,
    CategoryVariables
} from '../../api/operations/get-category'
import type { SearchCriteria } from '@corratech/corsair-filters-and-sort'
import { SearchCriteriaFilterActions } from '@corratech/corsair-filters-and-sort'
import {
    SwrUsePaginatedQueryOutput,
    usePaginatedQuery
} from '../use-paginated-query'
import { SwrUseQueryOutput, useQuery } from '@pylot-data/hooks/use-query'
import type {
    CategoryTree,
    ProductInterface,
    Maybe
} from '@pylot-data/pylotschema'
import type { Products, QueryProductsArgs } from '@pylot-data/fwrdschema'
import { SWRConfiguration, SWRInfiniteConfiguration } from 'swr'
import { oldCategoryQuery, productsQuery } from './graphql/categoryQuery'
import type { RequestInit } from '@vercel/fetch'
import { GraphQLError } from '@pylot-data/graphqlFetch'
import { SortEnum } from '@pylot-data/enums/SortEnum.d'
import { useRef } from 'react'

type UseCategoryResult = {
    category?: Maybe<CategoryTree>
    productsResult?: Maybe<Products>
    productItems: ProductInterface[]
    isLast: boolean
    isLoading: boolean
    error: GraphQLError | undefined
    categoriesSwrResult: SwrUseQueryOutput<CategoryResult>
    productsSwrResult: SwrUsePaginatedQueryOutput<{
        data: { products: Products }
    }>
}

export type ProductAttributeSortInput = {
    relevance?: Maybe<SortEnum>
    featured?: Maybe<SortEnum>
    published_at?: Maybe<SortEnum>
    popularity?: Maybe<SortEnum>
    price?: Maybe<SortEnum>
}

export type ProductInputQueryType = QueryProductsArgs & {
    searchCriteria?: SearchCriteria[]
    sort?: ProductAttributeSortInput
}

export const useCategory = (
    urlPath: string,
    categoryUid: string,
    productsInput: ProductInputQueryType,
    categorySwrOptions: SWRConfiguration,
    productSwrOptions: SWRInfiniteConfiguration = {},
    fetchOptions: RequestInit,
    disabled = false
): UseCategoryResult => {
    const { pageSize, searchCriteria = [], sort, currentPage } = productsInput
    const categorySwrResult = useQuery<CategoryVariables, CategoryResult>(
        disabled ? null : oldCategoryQuery,
        {
            categoryFilter: {
                url_path: {
                    eq: urlPath
                }
            }
        },
        categorySwrOptions,
        fetchOptions
    )

    const processedSearchCriteria = [...searchCriteria]
    const urlKeyCriterion = searchCriteria.find(
        (item: { attribute_code: string }) =>
            ['category_url_key'].includes(item.attribute_code)
    )
    if (!(urlKeyCriterion && urlKeyCriterion.filter_value)) {
        processedSearchCriteria.push({
            attribute_code: 'category_url_key',
            filter_action: SearchCriteriaFilterActions.EQ,
            filter_value: urlPath
        })
    }

    const productsRef = useRef<typeof productSwrOptions.initialData>()
    const productsSwrResult = usePaginatedQuery<
        QueryProductsArgs & { searchCriteria?: SearchCriteria[] },
        { data: { products: Products } }
    >(
        !disabled && urlPath ? productsQuery : null,
        {
            currentPage,
            pageSize,
            sort,
            searchCriteria: processedSearchCriteria
        },
        'currentPage',
        {
            ...productSwrOptions,
            initialData:
                // If product list is filtered, use the previous result as initialData
                productsRef && searchCriteria.length
                    ? productsRef.current
                    : productSwrOptions.initialData
        },
        fetchOptions
    )
    if (productsSwrResult.data && productsRef) {
        productsRef.current = productsSwrResult.data
    }

    const { size } = productsSwrResult
    const initialSizeOffset = (productSwrOptions.initialSize ?? 1) - 1

    // currentPageIndex is used to get data for the current page
    const currentPageIndex = size - 1 - initialSizeOffset

    const category = categorySwrResult.data?.data?.categories?.items?.[0]

    const mostRecentProductsQueryResult =
        productsSwrResult.data?.[currentPageIndex]?.data
    const productsResult = mostRecentProductsQueryResult?.products

    const isLast =
        mostRecentProductsQueryResult?.products?.page_info?.current_page ===
            mostRecentProductsQueryResult?.products?.page_info?.total_pages ??
        false

    const productItems =
        productsSwrResult?.data
            ?.slice(0, size - initialSizeOffset)
            ?.reduce<ProductInterface[]>((acc, resultPage) => {
                const productItemsLength =
                    resultPage.data?.products?.items?.length
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

    const imageURL = productItems[0]?.image?.url

    if (category && imageURL) {
        category.image = imageURL
    }

    return {
        category,
        productsResult,
        productItems: productItems as ProductInterface[],
        isLast,
        isLoading: !productsSwrResult.data,
        error: productsSwrResult.error,
        categoriesSwrResult: categorySwrResult,
        productsSwrResult
    }
}
