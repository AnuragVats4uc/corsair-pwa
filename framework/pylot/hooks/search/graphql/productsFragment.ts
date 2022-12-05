export const productsFragment = /* GraphQL */ `
queryID
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
    tech_specs {
        code
        value
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
    sku
    image {
        url
    }
    badge
    media_gallery {
        disabled
        label
        position
        url
    }
    small_image {
        __typename
        url
    }
    url_key
    categories {
        name
        url_path
        breadcrumbs {
            category_id
            category_name
        }
    }
    ... on ConfigurableProduct {
        variant_type
        configurable_options {
            __typename
            attribute_code
            attribute_id
            id
            label
            values {
                __typename
                value_index
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
                uid
                code
                value_index
                label
                variant_text
            }
            product {
                __typename
                id
                uid
                name
                url_key
                small_image {
                    __typename
                    url
                }
                image {
                    url
                }
                sku
                badge
                stock_status
                tech_specs {
                    code
                    value
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
            }
        }
        __typename
    }
}
page_info {
    __typename
    total_pages
    current_page
}
total_count
queryID
`
