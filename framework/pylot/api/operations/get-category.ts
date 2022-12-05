import type { CategoryFilterInput, Products } from '@pylot-data/fwrdschema'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import {
    oldCategoryQuery,
    productsQuery
} from '@pylot-data/hooks/category/graphql/categoryQuery'
import type { Maybe, CategoryTree } from '@pylot-data/pylotschema'
import { oldCategoryIdQuery } from './graphql/categoryUidQuery'
import type { RequestInit } from '@vercel/fetch'
import {
    SearchCriteria,
    SearchCriteriaFilterActions
} from '@corratech/corsair-filters-and-sort'
import { ProductAttributeSortInput } from '@pylot-data/hooks/category/use-category'

export type CategoryVariables = {
    categoryFilter: CategoryFilterInput
}

export type CategoryProductVariables = {
    currentPage?: number | null
    pageSize?: number | null
    searchCriteria: SearchCriteria[]
    sort?: ProductAttributeSortInput
}

export type CategoryResult = {
    categories: {
        items: Maybe<Array<Maybe<CategoryTree>>>
    }
}

export type CategoryProductResult = {
    products: Maybe<Products>
}

export type GetCategoryResult = CategoryResult & CategoryProductResult

async function getCategory({
    url_path,
    pageSize,
    currentPage,
    sort,
    fetchOptions,
    locale = ''
}: {
    url_path: string
    pageSize: number
    currentPage: number
    sort?: ProductAttributeSortInput
    fetchOptions?: RequestInit
    locale?: string
}): Promise<GetCategoryResult | undefined | null> {
    // TODO: replace oldGetCategoryUid with the getCategoryUid
    const categoryUidData = await graphqlFetch<
        { categoryFilter: CategoryFilterInput },
        { categories: { items: CategoryTree[] } }
    >({
        query: oldCategoryIdQuery,
        variables: {
            categoryFilter: {
                url_path: {
                    eq: url_path
                }
            }
        },
        locale
    })

    const categoryUid = categoryUidData?.data?.categories?.items?.[0]?.uid

    if (!categoryUid) {
        return null
    }

    // TODO: replace oldGetCategoryData with the getCategoryData
    const categoryDataPromise = graphqlFetch<CategoryVariables, CategoryResult>(
        {
            query: oldCategoryQuery,
            variables: {
                categoryFilter: {
                    url_path: {
                        eq: url_path
                    }
                }
            },
            fetchOptions,
            locale
        }
    )

    const productDataPromise = graphqlFetch<
        CategoryProductVariables,
        CategoryProductResult
    >({
        query: productsQuery,
        variables: {
            pageSize,
            currentPage,
            searchCriteria: [
                {
                    attribute_code: 'category_url_key',
                    filter_action: SearchCriteriaFilterActions.EQ,
                    filter_value: url_path
                }
            ],
            ...(sort && { sort })
        },
        fetchOptions,
        locale
    })

    const [categoryData, productData] = await Promise.all([
        categoryDataPromise,
        productDataPromise
    ])

    return {
        categories: categoryData.data.categories,
        products: productData.data.products
    }
}

export default getCategory
