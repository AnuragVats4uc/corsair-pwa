import { onConfigurableProductFragment } from './Fragments/onConfigurableProductFragment'
import { ProductItemFragment } from './Fragments/ProductItemFragment'
import { onGiftCardProductFragment } from './Fragments/onGiftCardProductFragment'

export const productDetailQuery = /* GraphQL */ `
    query productDetail($searchCriteria: [SearchCriteriaInput!]!, $pageSize: Int = 12, $currentPage: Int = 1) {
        productDetail: products(
            searchCriteria: $searchCriteria
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            items {
                uid
                ${ProductItemFragment}
                bundle_products {
                    image
                    name
                    sku
                    prices {
                        code
                        msrp
                        __typename
                    }
                }
                short_description {
                    __typename
                    html
                }
                description {
                    __typename
                    html
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
                        }
                    }
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
                ${onConfigurableProductFragment}
                ${onGiftCardProductFragment}
                related_products {
                    ${ProductItemFragment}
                    ${onConfigurableProductFragment}
                }
                meta_title
                meta_keyword
                meta_description
                canonical_url
                cross_sell_skus
                related_accessories_skus
                customers_also_bought_skus
                not_sellable
                show_variants
                free_shipping
                ships_within
                tech_specs {
                    code
                    value
                    is_comparable
                }
            }
            queryID
        }
    }
`
