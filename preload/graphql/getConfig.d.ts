import { SubmenuMode } from '@components/corra/MegaMenu'

export type Maybe<T> = T | null

export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type FrontendConfig = {
    __typename?: 'FrontendConfig'
    base: Maybe<BaseConfig>
    preload: Maybe<PreloadConfig>
    seo: Maybe<SeoConfig>
    static: Maybe<StaticRenderConfig>
    is_fallback: Scalars['Boolean']
}

export type BaseConfig = {
    __typename?: 'BaseConfig'
    url?: Maybe<UrlConfig>
    menu?: Maybe<MenuConfig>
    wishlist?: Maybe<WishlistConfig>
    route?: Maybe<RouteConfig>
    yotpo?: Maybe<YotpoConfig>
    product?: Maybe<ProductConfig>
    oneTrust?: Maybe<OneTrustConfig>
    gigya?: Maybe<GigyaConfig>
    algolia?: Maybe<AlgoliaConfig>
    freeShipping?: Maybe<FreeShippingConfig[]>
    melissa?: Maybe<MelissaConfig>
}

export type FreeShippingConfig = {
    __typename?: 'FreeShippingConfig'
    currency?: Maybe<Scalars['String']>
    amount?: Maybe<Scalars['Float']>
}

export type AlgoliaConfig = {
    __typename?: 'AlgoliaConfig'
    appId: Maybe<Scalars['String']>
    apiKey: Maybe<Scalars['String']>
    index: Maybe<Scalars['String']>
    defaultUserToken: Maybe<Scalars['String']>
}

export type UrlConfig = {
    __typename?: 'UrlConfig'
    baseUrl?: Maybe<Scalars['String']>
    mediaBackend?: Maybe<MediaBackendConfig>
    model?: Maybe<ModelUrlConfig>
}

export type MediaBackendConfig = {
    __typename?: 'MediaBackendConfig'
    enabled?: Maybe<Scalars['Boolean']>
    baseMediaUrl?: Maybe<Scalars['String']>
}

export type ModelUrlConfig = {
    __typename?: 'ModelUrlConfig'
    category?: Maybe<ModelUrlData>
    cmsPage?: Maybe<ModelUrlData>
    product?: Maybe<ModelUrlData>
}

export type ModelUrlData = {
    __typename?: 'ModelUrlData'
    suffix?: Maybe<Scalars['String']>
    directory?: Maybe<Scalars['String']>
}

export type MenuConfig = {
    __typename?: 'MenuConfig'
    submenu?: Maybe<SubmenuMode>
    submenu_maxitems?: Maybe<Scalars['Int']>
}

export type PreloadConfig = {
    __typename?: 'PreloadConfig'
    menu?: Maybe<MenuPreloadConfig>
    header?: Maybe<HeaderPreloadConfig>
    footer?: Maybe<FooterPreloadConfig>
}

export type MenuPreloadConfig = {
    __typename?: 'MenuPreloadConfig'
    variables?: Maybe<MenuPreloadVariables>
}

export type MenuPreloadVariables = {
    __typename?: 'MenuPreloadVariables'
    category_uid?: Maybe<Scalars['String']>
    onlyTopLevel?: Maybe<Scalars['Boolean']>
}

export type HeaderPreloadConfig = {
    __typename?: 'HeaderPreloadConfig'
    variables?: Maybe<HeaderPreloadVariables>
}

export type HeaderPreloadVariables = {
    __typename?: 'HeaderPreloadVariables'
    identifiers?: Maybe<Array<Scalars['String']>>
}

export type FooterPreloadConfig = {
    __typename?: 'FooterPreloadConfig'
    variables?: Maybe<FooterPreloadVariables>
    role?: Maybe<FooterPreloadBlockRoles>
}

export type FooterPreloadVariables = {
    __typename?: 'FooterPreloadVariables'
    identifiers?: Maybe<Array<Scalars['String']>>
}

export type FooterPreloadBlockRoles = {
    __typename?: 'FooterPreloadBlockRoles'
    copyright?: Maybe<Scalars['String']>
    links?: Maybe<Scalars['String']>
    social?: Maybe<Scalars['String']>
}

export type SeoConfig = {
    __typename?: 'SeoConfig'
    default?: Maybe<DefaultSeoConfig>
    product?: Maybe<ProductSeoConfig>
    searchBox?: Maybe<SearchBoxSeoConfig>
    organization?: Maybe<OrganizationSeoConfig>
    tagManager?: Maybe<TagManagerConfig>
}

export type DefaultSeoConfig = {
    __typename?: 'DefaultSeoConfig'
    title?: Maybe<Scalars['String']>
    titleTemplate?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    openGraph?: Maybe<OpenGraphSeoConfig>
    twitter?: Maybe<TwitterSeoConfig>
}

export type OpenGraphSeoConfig = {
    __typename?: 'OpenGraphSeoConfig'
    type?: Scalars['String']
    locale?: Scalars['String']
    url?: Scalars['String']
    site_name?: Scalars['String']
    images?: Array<OpenGraphImage>
}

export type OpenGraphImage = {
    __typename?: 'OpenGraphImage'
    url: Scalars['String']
    alt?: Scalars['String']
}

export type TwitterSeoConfig = {
    __typename?: 'TwitterSeoConfig'
    handle?: Scalars['String']
    site?: Scalars['String']
    cardType?: Scalars['String']
}

export type ProductSeoConfig = {
    __typename?: 'ProductSeoConfig'
    attributes?: Maybe<ProductAttributesSeoConfig>
    description?: Maybe<ProductDescriptionSeoConfig>
    image?: Maybe<ProductImageSeoConfig>
    price?: Maybe<ProductPriceSeoConfig>
    itemConditionMap?: Maybe<Scalars['String']>
    defaultBrand?: Maybe<Scalars['String']>
    defaultSeller?: Maybe<Scalars['String']>
    bestRating?: Maybe<Scalars['Int']>
}

export type ProductAttributesSeoConfig = {
    __typename?: 'ProductAttributesSeoConfig'
    name?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Array<Maybe<Scalars['String']>>>
    image?: Maybe<Array<Maybe<Scalars['String']>>>
    price_amount?: Maybe<Array<Maybe<Scalars['String']>>>
    price_currency?: Maybe<Array<Maybe<Scalars['String']>>>
    item_condition?: Maybe<Array<Maybe<Scalars['String']>>>
    gtin?: Maybe<Array<Maybe<Scalars['String']>>>
    brand?: Maybe<Array<Maybe<Scalars['String']>>>
    manufacturer?: Maybe<Array<Maybe<Scalars['String']>>>
    model?: Maybe<Array<Maybe<Scalars['String']>>>
    sku?: Maybe<Array<Maybe<Scalars['String']>>>
    mpn?: Maybe<Array<Maybe<Scalars['String']>>>
    seller?: Maybe<Array<Maybe<Scalars['String']>>>
    alternate_name?: Maybe<Array<Maybe<Scalars['String']>>>
    review_count?: Maybe<Array<Maybe<Scalars['String']>>>
    review_summary?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ProductDescriptionSeoConfig = {
    __typename?: 'ProductDescriptionSeoConfig'
    regExp?: Maybe<Scalars['String']>
    maxLength?: Maybe<Scalars['Int']>
}

export type ProductImageSeoConfig = {
    __typename?: 'ProductImageSeoConfig'
    count?: Maybe<Scalars['Int']>
    placeholder?: Maybe<Scalars['String']>
    width?: Maybe<Scalars['Int']>
}

export type ProductPriceSeoConfig = {
    __typename?: 'ProductPriceSeoConfig'
    currency?: Maybe<CurrencyEnum>
    precision?: Maybe<Scalars['Int']>
    validUntilDays?: Maybe<Scalars['Int']>
}

export type SearchBoxSeoConfig = {
    __typename?: 'SearchBoxSeoConfig'
    allowedPath?: Maybe<Scalars['String']>
    potentialActions?: Maybe<Array<Maybe<SearchBoxPotentialAction>>>
}

export type SearchBoxPotentialAction = {
    __typename?: 'SearchBoxPotentialAction'
    target?: Maybe<Scalars['String']>
    queryInput?: Maybe<Scalars['String']>
}

export type OrganizationSeoConfig = {
    __typename?: 'OrganizationSeoConfig'
    allowedPath?: Maybe<Scalars['String']>
    content?: Maybe<OrganizationContentSeo>
}

export type OrganizationContentSeo = {
    __typename?: 'OrganizationContentSeo'
    type?: Maybe<Scalars['String']>
    legalName?: Maybe<Scalars['String']>
    tickerSymbol?: Maybe<Scalars['String']>
    logo?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    address?: Maybe<OrganizationAddressSeo>
    contactPoint?: Maybe<Array<Maybe<OrganizationContactPointSeo>>>
    sameAs?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type OrganizationAddressSeo = {
    __typename?: 'OrganizationAddressSeo'
    streetAddress?: Maybe<Scalars['String']>
    addressLocality?: Maybe<Scalars['String']>
    addressRegion?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
}

export type AvailableLanguage = {
    __typename?: 'AvailableLanguage'
    name?: Maybe<Scalars['String']>
    alternateName?: Maybe<Scalars['String']>
}

export type OrganizationContactPointSeo = {
    __typename?: 'OrganizationContactPointSeo'
    telephone?: Maybe<Scalars['String']>
    contactType?: Maybe<Scalars['String']>
    contactOption?: Maybe<Scalars['String']>
    areaServed?: Maybe<Array<Maybe<Scalars['String']>>>
    availableLanguage?: Maybe<AvailableLanguage>
}

export type StaticRenderConfig = {
    __typename?: 'StaticRenderConfig'
    categories?: Maybe<StaticCategoriesConfig>
    products?: Maybe<StaticProductsConfig>
}

export type StaticCategoriesConfig = {
    __typename?: 'StaticCategoriesConfig'
    count?: Maybe<Scalars['Int']>
    root?: Maybe<Scalars['String']>
}

export type StaticProductsConfig = {
    __typename?: 'StaticProductsConfig'
    count?: Maybe<Scalars['Int']>
}

export type TagManagerConfig = {
    gtm?: Maybe<GTMConfig>
}

export type GTMConfig = {
    containerId?: Maybe<Scalars['String']>
    enabled?: Maybe<Scalars['Boolean']>
}

export type WishlistConfig = {
    enabled?: Maybe<Scalars['Boolean']>
    multiple_wishlists?: Maybe<Scalars['Boolean']>
    multiple_wishlist_number?: Maybe<Scalars['Int']>
}

export type RouteConfig = {
    cms_no_route?: Maybe<Scalars['String']>
    cms_home_page?: Maybe<Scalars['String']>
}

export type YotpoConfig = {
    enabled?: Maybe<Scalars['Boolean']>
    api_key?: Maybe<Scalars['String']>
}

export type ProductConfig = {
    visibleListAttributes?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type MelissaConfig = {
    apiKey: string
    enabled: boolean
}
