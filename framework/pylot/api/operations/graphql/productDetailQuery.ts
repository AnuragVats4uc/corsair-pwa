export const productDetailQuery = /* GraphQL */ `
    query productDetail($urlKey: String) {
        productDetail: products(filter: { url_key: { eq: $urlKey } }) {
            items {
                __typename
                id
                uid
                sku
                name
                url_key
                stock_status
                backorder {
                    date
                    available
                }
                short_description {
                    __typename
                    html
                }
                description {
                    __typename
                    html
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
                        final_price {
                            __typename
                            value
                            currency
                        }
                    }
                }
                media_gallery {
                    __typename
                    url
                    disabled
                    label
                    position
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
                small_image {
                    __typename
                    url
                }
                categories {
                    __typename
                    name
                    url_path
                    breadcrumbs {
                        __typename
                        category_uid
                        category_name
                    }
                }
                ... on ConfigurableProduct {
                    configurable_options {
                        __typename
                        attribute_code
                        attribute_id
                        id
                        label
                        values {
                            __typename
                            default_label
                            label
                            store_label
                            use_default_value
                            value_index
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
                        }
                        product {
                            __typename
                            id
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
                    __typename
                }
                ... on GiftCardProduct {
                    allow_open_amount
                    open_amount_min
                    open_amount_max
                    giftcard_type
                    is_redeemable
                    lifetime
                    allow_message
                    message_max_length
                    gift_card_options {
                        ... on CustomizableFieldOption {
                            title
                            required
                            value {
                                uid
                            }
                        }
                    }
                    giftcard_amounts {
                        uid
                        website_id
                        website_value
                        attribute_id
                        value
                    }
                }
                meta_title
                meta_keyword
                meta_description
                canonical_url
            }
            __typename
        }
    }
`
