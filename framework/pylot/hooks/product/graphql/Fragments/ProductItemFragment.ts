export const ProductItemFragment = /* GraphQL */ `
    __typename
    id
    name
    sku
    url_key
    stock_status
    backorder {
            date
            available
        }
    badge
    small_image {
        __typename
        url
    }
    image {
        url
    }
    thumbnail {
        url
    }
    categories {
        name
        url_path
        breadcrumbs {
            category_id
            category_name
        }
    }
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
`
