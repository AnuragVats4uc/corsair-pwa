export const onConfigurableProductFragment = /* GraphQL */ `
    ... on ConfigurableProduct {
        variant_type
        configurable_options {
            __typename
            attribute_code
            attribute_id
            id
            uid
            label
            values {
                __typename
                default_label
                label
                store_label
                use_default_value
                value_index
                uid
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
                badge
                thumbnail {
                    url
                }
                image {
                   url
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
                }
                media_gallery {
                    __typename
                    disabled
                    label
                    position
                    url
                    ... on ProductVideo {
                        video_content {
                            media_type
                            video_provider
                            video_url
                            video_title
                            video_description
                            video_metadata
                            __typename
                        }
                        __typename
                    }
                }
                sku
                stock_status
            }
        }
    }
`
