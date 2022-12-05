import dynamic from 'next/dynamic'
import { Layout } from '@components/common'
import { ProductPrice } from '@components/common/ProductPrice/ProductPrice'
import { ProductInfo } from '@components/corra/ProductInfo'
import { Breadcrumbs } from '@corratech/pylot-breadcrumbs'
import {
    GalleryTypeEnum,
    ProductGallery
} from '@corratech/corsair-product-gallery'
import { GiftCardProduct } from '@corratech/pylot-product-giftcard'
import { SEO } from '@corratech/corsair-seo'
import { usePdpTracking } from '@corratech/pylot-tag-manager'
import { Container } from '@corratech/pylot-ui'
import { VariantSelector } from '@components/common/VariantSelector'
import { getYotpoBottomLineApi, yotpoJsonLd } from '@corratech/pylot-yotpo'
import s from '@pagestyles/PDP.module.scss'
import getProduct from '@pylot-data/api/operations/get-product'
import { ProductStockStatus } from '@pylot-data/enums/ProductStockStatus.d'
import { useProductFetch } from '@pylot-data/hooks/product/use-product-fetch'
import { useProductUI } from '@pylot-data/hooks/product/use-product-ui'
import {
    ConfigurableProduct,
    ConfigurableVariant
} from '@pylot-data/pylotschema'
import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { StockStatus } from '@components/corra/StockStatus'
import cn from 'classnames'
import { filterEmptyTabs, Tabs } from '@components/common/Tabs'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import { useContentJson } from '@pylot-data/hooks/contentful/use-content-json'
import { AddToCart } from '@components/corra/AddToCart'
import ProductPromo from '@components/common/ProductPromo/ProductPromo'
import type {
    IProductContentfulResponse,
    IProductBlocks
} from '@components/common/types'
import type { TypeComponentsTab } from '@components/common/Tabs/ProductTabContent'
import { FAQModuleCollection } from '@components/common/FAQModule/FAQModuleCollection'
import ProductContentCarousel from '@components/common/ProductContentCarousel/ProductContentCarousel'
import ProductBlocksWrapper from '@components/common/ProductBlocks/ProductBlocksWrapper'
import { ProductFeatures } from '@components/common/ProductFeatures/ProductFeatures'
import ProductAwards from '@components/common/ProductAwards'
import { Badge } from '@components/common/ProductTile/Badge'
import {
    SocialDefaultContent,
    socialDefaultContent
} from '@config/seo/defaultContents'
import WorksWell from '@components/common/WorksWell'
import { ContentPage } from '@components/common/ContentPage/ContentPage'
import { convertProductContentfulToContentPage } from '@lib/utils/ConvertProductContentfulToContentPage'
import ProductFamily from '@components/common/ProductFamily'
import CustomersAlsoBought from '@components/common/CustomersAlsoBought/CustomersAlsoBought'
import { useRibbon } from '@pylot-data/hooks/ribbon/use-ribbon'
import ShippingInfo, {
    ShippingInfoProps
} from '@components/common/ShippingInfo/ShippingInfo'
import { isTransactionalView } from 'helpers'
import FindRetailer from '@components/common/FindRetailer'

const CarouselHow = dynamic(
    import('@components/common/CarouselHow/CarouselHow')
)
const VerticalGraphDoubleBars = dynamic(
    import('@components/common/Graphs/VerticalGraphDoubleBars')
)
const HorizontalGraphSingleBars = dynamic(
    import('@components/common/Graphs/HorizontalGraphSingleBars')
)
const VerticalGraphSingleBars = dynamic(
    import('@components/common/Graphs/VerticalGraphSingleBars')
)
const BannerIntereactiveCallout = dynamic(
    import('@components/common/BannerIntereactiveCallout')
)
const TwotilewithCalloutMedia = dynamic(
    import('@components/common/TwotilewithCallout')
)
const ImageTwoTile = dynamic(import('@components/common/ImageTwoTile'))
const HorizontalLightingGallery = dynamic(
    import('@components/common/HorizontalLightingGallery')
)
const VerticalLightingGallery = dynamic(
    import('@components/common/VerticalLightingGallery')
)
const NotFound = dynamic(
    () => import('@components/404').then((mod) => mod.NotFound) as any
)

export const PRODUCT_CONTENT_TYPE = 'product'

export const getStaticPaths: GetStaticPaths = async () => {
    // Disabled preloading
    return {
        paths: [],
        fallback: true
    }
}

interface PreviewData {
    time: number
}

export const getStaticProps: GetStaticProps = async ({
    locale,
    params,
    preview,
    previewData
}: GetStaticPropsContext) => {
    const productUrl = (params!.product_slug as string).replace('.html', '')
    const previewDate = previewData as PreviewData

    try {
        const product = await getProduct({
            sku: params!.sku as string,
            url_key: params!.product_slug as string,
            locale: locale || '',
            isPreview: preview,
            previewDate: previewDate?.time
        })

        if (!product || !product?.productDetail?.items.length) {
            return preview
                ? { props: {} }
                : {
                      notFound: true
                  }
        }

        const { data: productContentful } = await getContentJson<
            IProductContentfulResponse<TypeComponentsTab>
        >({
            queryVariables: {
                identifier: [productUrl],
                contentType: PRODUCT_CONTENT_TYPE,
                options: {
                    level: 6
                }
            },
            locale: locale
        })

        const newContentJson: {
            contentJson?: Array<Record<string, unknown>>
        } = {}

        if (productContentful.contentJson[0]?.entries) {
            const contentJsonEntries = JSON.parse(
                productContentful.contentJson[0].entries
            )
            newContentJson.contentJson = [
                {
                    ...productContentful.contentJson[0],
                    entries: JSON.stringify({
                        ...contentJsonEntries,
                        shipsWithin: null
                    })
                }
            ]
        }

        return {
            props: {
                url_key: productUrl,
                productData: product,
                productDataContentful: {
                    ...productContentful,
                    ...newContentJson
                },
                ...(await serverSideTranslations(locale!, [
                    'common',
                    'pdp',
                    'cms'
                ]))
            },
            revalidate: 14400
        }
    } catch (e) {
        console.log('PDP GETSTATICPROPS ERROR')
        console.log(e)
        return {
            props: {
                url_key: productUrl,
                ...(await serverSideTranslations(locale!, ['common']))
            },
            revalidate: 14400
        }
    }
}

export default function PDP({
    productData,
    productDataContentful
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
    const router = useRouter()
    const { t } = useTranslation(['common', 'pdp'])
    const url_sku = router.query.sku as string
    const url_key = router.query.product_slug as string
    const category_slug =
        productData?.productDetail?.items[0].categories[0].url_path
    const { locale } = router
    const queryID = productData?.productDetail?.queryID

    useEffect(() => {
        if (router.query.category_slug !== category_slug) {
            router.push(
                `/p/${category_slug}/${router.query.sku}/${router.query.product_slug}`,
                undefined,
                { shallow: true }
            )
        }
    }, [])

    const { data } = useContentJson<
        IProductContentfulResponse<TypeComponentsTab>
    >(
        {
            identifier: [url_key],
            contentType: PRODUCT_CONTENT_TYPE,
            options: {
                level: 6
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: { data: productDataContentful }
        }
    )
    const productContentful = data ? data[0]?.parsedEntries : null

    const { 1: setRibbon } = useRibbon()
    setRibbon(productContentful?.ribbons)

    const {
        product,
        isSupportedProductType,
        isConfig,
        isGiftCard,
        isValidating,
        error
    } = useProductFetch(
        {
            sku: url_sku,
            url_key,
            category_url_key: category_slug
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: { data: productData }
        }
    )

    const review = getYotpoBottomLineApi({
        id: product?.id
    })

    const {
        setSelectedOptions,
        selectedOptions,
        options,
        variant,
        mediaGalleryEntries,
        buttonLabel: buttonLabelWithoutAdding,
        isButtonDisabled,
        selectedOptionUIDs,
        isOutOfStock
    } = useProductUI(product, {
        preselectedOptions: {},
        sku: router.query.sku as string
    })

    usePdpTracking(product, isValidating)

    //route fallback
    if (router.isFallback) {
        return (
            <Container clean className={s['container-classes']}>
                <div>
                    {t('Page for this product was not generated beforehand.')}
                    <br />
                    {t('Loading...')}
                </div>
            </Container>
        )
    }

    if (!product) {
        return <NotFound />
    }

    //Error handler for PDP page
    if (!product && error) {
        return (
            <Container clean className={s['container-classes']}>
                <h1>{t('Error!!!')}</h1>
            </Container>
        )
    }

    //Warning if the product type is not supported
    if (!isSupportedProductType) {
        return (
            <Container clean className={s['container-classes']}>
                <h1>{`${product?.__typename} ${t('is not supported')}`}</h1>
            </Container>
        )
    }

    const {
        name,
        description,
        price_range: productPriceRange,
        badge,
        cross_sell_skus,
        customers_also_bought_skus,
        show_variants,
        not_sellable,
        free_shipping,
        ships_within,
        bundle_products,
        backorder
    } = product

    const {
        sku,
        price_range: variantPriceRange,
        name: variantName,
        badge: variantBadge
    } = variant

    const { seoImage } = socialDefaultContent
    const socialContent: SocialDefaultContent = {
        ...socialDefaultContent,
        seoImage: productContentful?.socialDefaultMedia || seoImage
    }

    const expectedDate = backorder?.date
        ? new Date(backorder?.date).toLocaleDateString()
        : ''

    const shippingInfo: ShippingInfoProps = {
        freeShipping: free_shipping,
        shipsWithin: ships_within,
        shipsWithinMessage: productContentful?.shipsWithin?.text,
        expectedDate,
        backorderEnabled: backorder?.available
    }

    return (
        <Container className={s['pdp-dark-bg']} clean>
            <div className={s['container-classes']} id="container-classes">
                <SEO
                    product={yotpoJsonLd({ product, review })}
                    socialDefaultContent={socialContent}
                />
                <div className={cn(s['pdp-container'], 'full-screen-mode')}>
                    <div
                        className={s['pdp-left-container']}
                        id="pdp-left-container"
                    >
                        <div className={s['pdp-breadcrumbs']}>
                            {product.categories?.length ? (
                                <Breadcrumbs
                                    product={product}
                                    separator=" > "
                                />
                            ) : null}
                        </div>
                        <ProductGallery
                            bundleProducts={bundle_products}
                            galleryControlDimensions={{ width: 22, height: 22 }}
                            mediaGalleryEntries={mediaGalleryEntries.map(
                                (asset) => {
                                    if (!asset?.url || asset?.url === '') {
                                        return {
                                            ...asset,
                                            url: `${
                                                typeof window !== 'undefined'
                                                    ? window.location.origin
                                                    : ''
                                            }/images/default-product-image.png`
                                        }
                                    } else return asset
                                }
                            )}
                            embedVideoUrl={productContentful?.embedVideo?.url}
                            config={{
                                mobile: {
                                    gallerytype: GalleryTypeEnum.SCROLL,
                                    zoom: false,
                                    loop: true,
                                    fullscreen: false,
                                    sliderProps: {
                                        main: {
                                            navigation: false,
                                            pagination: false,
                                            allowTouchMove: true
                                        }
                                    }
                                },
                                desktop: {
                                    gallerytype: GalleryTypeEnum.SCROLL,
                                    zoom: false,
                                    fullscreen: true,
                                    thumb: true,
                                    sliderProps: {
                                        main: {
                                            navigation: false,
                                            pagination: false,
                                            maxSlides: 5
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className={s['product-main']}>
                        <div className={s['product-details']}>
                            <div className={s['product-topinfo']}>
                                <div
                                    className={cn(
                                        s['product-topbar'],
                                        'flex items-center justify-between'
                                    )}
                                >
                                    {isTransactionalView('stock', locale) &&
                                        !not_sellable && (
                                            <StockStatus
                                                isOutOfStock={isOutOfStock}
                                            />
                                        )}
                                    <Badge
                                        isPdpPage
                                        label={variantBadge || badge}
                                        className={s['badge-container']}
                                    />
                                </div>
                                <h1 className={s['product-name']}>
                                    {name || variantName}
                                </h1>
                                <div
                                    className={s['sku']}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={sku}
                                >
                                    {t('SKU: ')}
                                    {sku}
                                </div>
                                <div className={s['product-info']}>
                                    <ProductInfo
                                        description={description}
                                        bundles={bundle_products}
                                    />
                                </div>
                                {isTransactionalView('pdp', locale) &&
                                    !not_sellable && (
                                        <div className={s['pdp-price']}>
                                            <ProductPrice
                                                priceRange={
                                                    variantPriceRange ||
                                                    productPriceRange
                                                }
                                                showCurrencyCode
                                                splitSymbol
                                                isGiftCard={isGiftCard}
                                            />
                                        </div>
                                    )}
                                <ProductPromo
                                    message={
                                        productContentful?.promoMessage?.content
                                    }
                                />
                                {isTransactionalView('stock', locale) && (
                                    <ShippingInfo {...shippingInfo} />
                                )}
                                {
                                    // TODO - Remove this validation when is get real Retailer data
                                    ['CC-9011141-WW', 'CC-9011140-WW'].includes(
                                        sku
                                    ) && <FindRetailer />
                                }
                            </div>
                            {!isGiftCard ? (
                                isConfig &&
                                show_variants && (
                                    <VariantSelector
                                        categories={product?.categories}
                                        notSellable={not_sellable}
                                        disableAll={
                                            (product as ConfigurableProduct)
                                                .stock_status ===
                                            ProductStockStatus.OutOfStock
                                        }
                                        variants={
                                            (product?.variants ||
                                                []) as ConfigurableVariant[]
                                        }
                                        options={options}
                                        selectedOptions={selectedOptions}
                                        setSelectedOptions={setSelectedOptions}
                                        variant={variant}
                                    />
                                )
                            ) : (
                                <GiftCardProduct product={product} />
                            )}
                            {isTransactionalView('worksWellWith', locale) &&
                                cross_sell_skus?.length > 0 && (
                                    <WorksWell productsSkus={cross_sell_skus} />
                                )}
                            <ProductFeatures
                                features={productContentful?.features}
                            />
                            <ProductAwards awards={productContentful?.awards} />
                        </div>
                    </div>
                </div>
            </div>
            {productContentful?.horizontalLightingGallery && (
                <HorizontalLightingGallery
                    content={productContentful.horizontalLightingGallery}
                />
            )}
            {productContentful?.verticalLightingGallery && (
                <VerticalLightingGallery
                    content={productContentful.verticalLightingGallery}
                />
            )}
            {productContentful?.imageTwoTileCallout && (
                <ImageTwoTile content={productContentful.imageTwoTileCallout} />
            )}
            {productContentful?.twoTileCallout && (
                <TwotilewithCalloutMedia
                    content={productContentful.twoTileCallout}
                />
            )}
            {productContentful?.bannerIntereactiveCallouts && (
                <BannerIntereactiveCallout
                    content={productContentful.bannerIntereactiveCallouts}
                />
            )}
            {isTransactionalView('customersAlsoBought', locale) &&
                productContentful?.customersAlsoBought &&
                customers_also_bought_skus?.length > 0 && (
                    <CustomersAlsoBought
                        content={productContentful.customersAlsoBought}
                        customers_also_bought_skus={
                            productData.productDetail.items[0]
                                .customers_also_bought_skus
                        }
                    />
                )}
            {isTransactionalView('addToCart', locale) && !not_sellable && (
                <AddToCart
                    priceRange={variantPriceRange || productPriceRange}
                    isButtonDisabled={isButtonDisabled}
                    product={product}
                    buttonLabel={buttonLabelWithoutAdding}
                    variant={variant}
                    selectedOptionUIDs={selectedOptionUIDs}
                    isGiftCard={isGiftCard}
                    queryID={queryID}
                />
            )}
            {productContentful?.verticalGraphSingleBars && (
                <VerticalGraphSingleBars
                    content={productContentful.verticalGraphSingleBars}
                />
            )}
            {productContentful?.horizontalGraphSingleBars && (
                <HorizontalGraphSingleBars
                    content={productContentful.horizontalGraphSingleBars}
                />
            )}
            {productContentful?.verticalGraphDoubleBars && (
                <VerticalGraphDoubleBars
                    content={productContentful.verticalGraphDoubleBars}
                />
            )}
            {productContentful?.tabs?.length && (
                <div
                    className={cn(s['container-classes'], s['tabs-container'])}
                >
                    <Tabs
                        defaultTab={0}
                        tabs={filterEmptyTabs(productContentful.tabs, [
                            {
                                contentType: 'blog-articles',
                                filterKey: 'blogEntries'
                            }
                        ])}
                        linkedProducts={productContentful.linkedProducts}
                        packageContents={productContentful?.packageContents}
                        productData={product}
                    />
                </div>
            )}
            {productContentful?.contentModules && (
                <ContentPage
                    pageContent={convertProductContentfulToContentPage(
                        productContentful!
                    )}
                />
            )}
            <ProductContentCarousel
                carouselContent={productContentful?.carouselContent}
            />
            {productContentful?.nonInteractiveProductBlock && (
                <ProductBlocksWrapper
                    productBlocks={
                        productContentful.nonInteractiveProductBlock as IProductBlocks
                    }
                />
            )}
            {productContentful?.items?.length && (
                <div className={cn(s['container-classes'], s['faq-container'])}>
                    <FAQModuleCollection items={productContentful.items} />
                </div>
            )}
            {productContentful?.carouselHow?.length && (
                <CarouselHow carouselHow={productContentful?.carouselHow[0]} />
            )}
            {productContentful?.productFamily?.productBlocks?.length && (
                <ProductFamily content={productContentful?.productFamily} />
            )}
        </Container>
    )
}

PDP.Layout = Layout
