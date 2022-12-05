import { SWRConfiguration } from 'swr'
import { SwrUseQueryOutput, useQuery } from '../use-query'
import {
    Products,
    QueryProductsArgs,
    Aggregation,
    Maybe
} from '@pylot-data/pylotschema'
import { Keywords } from '@pylot-data/pylotschema'
import { productSearchSuggestionQuery } from './graphql/productSearchSuggestionQuery'

type ProductResultWithData = {
    keywords: Keywords
    products: Products
    aggregations?: Maybe<Array<Maybe<Aggregation>>>
}

type UseSearchResult = {
    keywords: Keywords
    products: Products
    aggregations?: Maybe<Array<Maybe<Aggregation>>>
} & SwrUseQueryOutput<ProductResultWithData>

export const useSearchSuggestion = (
    searchTerm: string,
    swrOptions: SWRConfiguration = {}
): UseSearchResult => {
    const variables = {
        search: searchTerm,
        currentPage: 1
    }

    const { data, ...rest } = useQuery<
        QueryProductsArgs,
        ProductResultWithData
    >(productSearchSuggestionQuery, variables, swrOptions)

    const products = data?.data?.products!
    const keywords = data?.data?.keywords!
    const aggregations = data?.data?.products?.aggregations

    return {
        products,
        aggregations,
        keywords,
        ...rest
    }
}
