import { productsFragment } from '@pylot-data/hooks/search/graphql/productsFragment'

// TODO: once support for UIDs is added, start utilizing categoryQuery
export const oldCategoryQuery = /* GraphQL */ `
    query categories($categoryFilter: CategoryFilterInput) {
        categories(filters: $categoryFilter) {
            items {
                name
                url_key
                url_path
                uid
                meta_title
                meta_keywords
                meta_description
                breadcrumbs {
                    category_level
                    category_name
                    category_url_key
                    category_url_path
                    __typename
                }
                children {
                    name
                    uid
                    url_path
                    url_key
                }
            }
        }
    }
`

export const productsQuery = /* GraphQL */ `
    query products($searchCriteria: [SearchCriteriaInput!]!, $pageSize: Int = 12, $currentPage: Int = 1, $sort: ProductAttributeSortInput = {}){
        products(
            searchCriteria: $searchCriteria
            pageSize: $pageSize
            currentPage: $currentPage
            sort: $sort
        ) {
            ${productsFragment}
        }
    }
`

export const productSearchQuery = /* GraphQL */ `
    query products($search: String = '', $searchCriteria: [SearchCriteriaInput!]!, $pageSize: Int = 12, $currentPage: Int = 1, $sort: ProductAttributeSortInput = {}){
        products(
            search: $search
            searchCriteria: $searchCriteria
            pageSize: $pageSize
            currentPage: $currentPage
            sort: $sort
        ) {
            ${productsFragment}
        }
    }
`

export const categoryQuery = /* GraphQL */ `
    query categories(
        $categoryFilter: CategoryFilterInput
        $pageSize: Int = 12
        $currentPage: Int = 0
        $filter: ProductAttributeFilterInput = {}
        $sort: ProductAttributeSortInput = {}
    ) {
        categories(filters: $categoryFilter) {
            items {
                name
                url_key
                url_path
                uid
                meta_title
                meta_keywords
                meta_description
                breadcrumbs {
                    category_level
                    category_name
                    category_url_key
                    category_url_path
                    __typename
                }
                children {
                    name
                    uid
                    url_key
                    url_path
                }
            }
        }
        products(
            pageSize: $pageSize
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ) {
            aggregations {
                __typename
                attribute_code
                count
                label
                options {
                    __typename
                    label
                    value
                    count
                }
            }
            __typename
            sort_fields {
                __typename
                default
                options {
                    __typename
                    label
                    value
                }
            }
            items {
                __typename
                id
                uid
                name
                stock_status
                show_variants
                free_shipping
                ships_within
                not_sellable
                price_range {
                    __typename
                    minimum_price {
                        __typename
                        regular_price {
                            __typename
                            value
                            currency
                        }
                        final_price {
                            __typename
                            value
                            currency
                        }
                        discount {
                            __typename
                            amount_off
                        }
                    }
                    maximum_price {
                        __typename
                        regular_price {
                            __typename
                            value
                            currency
                        }
                        final_price {
                            __typename
                            value
                            currency
                        }
                        discount {
                            __typename
                            amount_off
                        }
                    }
                }
                sku
                small_image {
                    __typename
                    url
                }
                url_key
                ... on ConfigurableProduct {
                    configurable_options {
                        __typename
                        attribute_code
                        attribute_id
                        attribute_uid
                        id
                        label
                        values {
                            __typename
                            value_index
                            uid
                            label
                            swatch_data {
                                __typename
                                value
                                ... on ImageSwatchData {
                                    thumbnail
                                    __typename
                                }
                            }
                        }
                    }
                    variants {
                        __typename
                        attributes {
                            __typename
                            code
                            value_index
                            label
                        }
                        product {
                            __typename
                            id
                            small_image {
                                __typename
                                url
                            }
                            sku
                            stock_status
                        }
                    }
                    __typename
                }
            }
            page_info {
                __typename
                total_pages
            }
            total_count
        }
    }
`
