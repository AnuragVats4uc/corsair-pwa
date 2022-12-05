import { productsFragment } from './productsFragment'

export const productSearchQuery = /* GraphQL */ `
query productSearch(
    $search: String
    $pageSize: Int = 12
    $currentPage: Int = 0
    $sort: ProductAttributeSortInput = {}
    $searchCriteria: [SearchCriteriaInput!]
) {
    products(
        search: $search
        pageSize: $pageSize
        currentPage: $currentPage
        sort: $sort,
        searchCriteria: $searchCriteria
    ) {
        ${productsFragment}
    }
}
`
