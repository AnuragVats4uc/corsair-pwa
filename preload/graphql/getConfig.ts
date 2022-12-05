export const getConfig = /* GraphQL */ `
    {
        config {
            is_fallback
            base {
                algolia {
                    appId
                    apiKey
                    index
                    defaultUserToken
                }
                menu {
                    submenu
                    submenu_maxitems
                }
                url {
                    baseUrl
                    mediaBackend {
                        enabled
                        baseMediaUrl
                    }
                    model {
                        category {
                            suffix
                            directory
                        }
                        cmsPage {
                            suffix
                            directory
                        }
                        product {
                            suffix
                            directory
                        }
                    }
                }
                wishlist {
                    enabled
                    multiple_wishlists
                    multiple_wishlist_number
                }
                route {
                    cms_no_route
                    cms_home_page
                }
                shopifyUrl
                yotpo {
                    enabled
                    api_key
                }
                product {
                    visibleListAttributes
                }
                oneTrust {
                    enabled
                    dataDomainScript
                }
                gigya {
                    enabled
                    apiKey
                }
                freeShipping {
                    currency
                    amount
                }
                melissa {
                    apiKey
                    enabled
                }
            }
            static {
                products {
                    count
                }
                categories {
                    count
                    root
                }
            }
            preload {
                menu {
                    variables {
                        category_uid
                        onlyTopLevel
                    }
                }
                footer {
                    variables {
                        identifiers
                    }
                    role {
                        copyright
                        links
                        social
                    }
                }
            }
            seo {
                default {
                    title
                    titleTemplate
                    description
                    openGraph {
                        type
                        locale
                        url
                        site_name
                        images {
                            url
                            alt
                        }
                    }
                    twitter {
                        handle
                        site
                        cardType
                    }
                }
                product {
                    attributes {
                        name
                        description
                        image
                        price_amount
                        price_currency
                        item_condition
                        gtin
                        brand
                        manufacturer
                        model
                        sku
                        mpn
                        seller
                        alternate_name
                        review_count
                        review_summary
                    }
                    description {
                        regExp
                        maxLength
                    }
                    image {
                        count
                        placeholder
                        width
                    }
                    price {
                        currency
                        precision
                        validUntilDays
                    }
                    itemConditionMap
                    defaultBrand
                    defaultSeller
                    bestRating
                }
                searchBox {
                    allowedPath
                    potentialActions {
                        target
                        queryInput
                    }
                }
                organization {
                    allowedPath
                    content {
                        type
                        legalName
                        tickerSymbol
                        logo
                        name
                        email
                        address {
                            streetAddress
                            addressLocality
                            addressRegion
                            postalCode
                        }
                        contactPoint {
                            telephone
                            contactType
                            contactOption
                            areaServed
                            availableLanguage {
                                name
                                alternateName
                            }
                        }
                        sameAs
                    }
                }
                tagManager {
                    gtm {
                        enabled
                        containerId
                    }
                }
            }
        }
    }
`
