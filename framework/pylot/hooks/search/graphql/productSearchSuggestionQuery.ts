export const productSearchSuggestionQuery = /* GraphQL */ `
    query productSearch(
        $search: String
        $pageSize: Int = 4
        $currentPage: Int = 0
    ) {
        products(
            search: $search
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            total_count
            queryID
            aggregations {
                label
                attribute_code
                options {
                    label
                    value
                    __typename
                }
                __typename
            }
            items {
                name
                uid
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
                }
                categories {
                    url_path
                }
                small_image {
                    __typename
                    url
                }
                image {
                    url
                }
                url_key
                sku
            }
        }
        keywords(search: $search) {
            keywords
        }
    }
`
