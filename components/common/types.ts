import { Feature } from './ProductFeatures/ProductFeatures'
import {
    CTAType,
    EmbedVideoType,
    ImageLinkType,
    ImageType,
    URLType,
    VideoType
} from '../../framework/pylot/hooks/contentful/use-content-json'
import { VerticalLightingGalleryData } from './VerticalLightingGallery/VerticalLightingGallery'
import { BannerType } from '@components/common/HeroBanner/HeroBanner'
import { HorizontalLightingGalleryData } from './HorizontalLightingGallery/HorizontalLightingGallery'
import { SmartHomeProduct } from './SmartHome/SmartHome.interfaces'
import { VidGalleryResponse } from './VidGallery/VidGallery'
import { ProductAwardsInterface } from './ProductAwards/ProductAwards'
import { IOverlayContent } from './OverlayProductBlock/BlockFullScreen'
import { HydroXBlockResponse } from './HydroXBlock/HydroXBlock'
import { RichCarouselType } from './RichCarousel/RichCarousel'
import { GridImage } from './ImageGrid/ImageGrid'
import { ContentCardTileInterface } from './ContentCardTiles/ContentCardTile'
import { CarouselHowType } from './CarouselHow/CarouselHow'
import { ParallaxGalleryResponse } from './ParallaxGallery/ParallaxGallery'
import { CorsairOneBlockType } from './CorsairOneBlock/CorsairOneBlock'
import { ProfileProps } from './ProfileGrid/types'
import { ImageTwoTileResponse } from './ImageTwoTile/ImageTwoTile'
import { BannerWithTwoImagesResponse } from './BannerWithTwoImages/BannerWithTwoImages'
import type {
    CartItemPrices,
    PriceRange,
    ProductInterface
} from '@pylot-data/pylotschema'

import { ISmal2TileWToggle } from './Smal2TileWToggle/types'
import { SmartCaseType } from './SmartCases/SmartCases.interfaces'
import { TwotilewithCalloutResponse } from './TwotilewithCallout/TwotilewithCallout'
import { LeftRightTextResponse } from './LeftRightText/LeftRightText'
import {
    HorizontalGraphSingleBarsType,
    VerticalGraphDoubleBarsType,
    VerticalGraphSingleBarsType
} from './Graphs/types'
import { CusChartsGraphs } from './ChartsAndGraphs/types'

import { BuiltMultiMount } from './BuiltInMultiMount/types'
import { StandardBannerResponse } from './StandardBanner/StandardBanner'
import { BannerIntereactiveCalloutResponse } from './BannerIntereactiveCallout/BannerIntereactiveCallout'
import { TabbedOverlayResponse } from './TabbedOverlay/TabbedOverlay'
import { BannerItemType, CarouselType } from './Carousel/Carousel'
import { BannerTextAlignments } from './Banner23Tile/Banner2Tile/Banner2Tile'
import { CategoryInterface } from './CategorySlider/Category'
import { LogoType } from './LogoSlider/LogoSlider'
import { BelowTheLine } from './BelowTheLine/BelowTheLineTypes'
import { VerticalTabsSectionResponse } from './VerticalTabsSection/VerticalTabsSection'
import { BlockTwoTileResponse } from './BlockTwoTile/BlockTwoTileTypes'
import { IMGGridSystemProps } from './IMGGridSystem/types'
import { FullPanelCardsType } from './FullPanelCards/FullPanelCards'
import { Banner23TileProps } from './Banner23Tile/types'
import { ListsTableInterface } from './ListsTable/ListsTable'
import { Content } from './TableComparison/TableComparison.interfaces'
import { CustomersAlsoBoughtContent } from './CustomersAlsoBought/CustomersAlsoBought'
import { CarouselImageTextType } from './CarouselImageText'
import { CslContainerTiles } from './CarouselProductTiles/CarouselProductTiles'
import { OverlayProductContentCardsResponse } from './ProductOverviewTab/OverlayProductContentCards/OverlayProductContentCards'
import { CslContainer } from './CarouselTestimonial/CarouselTestimonial'
export interface Meta {
    contentType: string
}
export interface FAQItemType {
    question: string
    answer: string
    title: string
    meta: Meta
}

export interface RibbonData {
    active: boolean
    desktop: boolean
    mobile: boolean
    textsAndLinks: URLType[]
    background: ImageType
    backgroundMobile: ImageType
}

export interface RibbonsData {
    ribbons: RibbonData[]
}

export interface FAQModuleType {
    title: string
    identifier: string
    heading: string
    defaultNum: number
    meta: Meta
    showMore: string
    showLess: string
    faqItem: FAQItemType[]
    useFaqSchema: boolean
}
export interface FAQModuleProps {
    faqModule: FAQModuleType
}

export interface FAQModuleCollectionType {
    faqModule: FAQModuleType
    title: string
    identifier: string
    heading: string
    defaultNum: number
    showMore: string
    showLess: string
    meta: Meta
    useFaqSchema: boolean
    faqItem: FAQItemType[]
}
export interface FAQModuleCollectionProps {
    items: FAQModuleCollectionType[]
}

export interface IHeroBannerType extends BannerType {
    meta: IMeta<'heroBanner'>
}
export interface IVidGalleryType extends VidGalleryResponse {
    meta: IMeta<'vidGallery'>
}

export interface IHydroXBlockResponse extends HydroXBlockResponse {
    meta: IMeta<'hydroXContentBlock'>
}

export interface IParallaxGalleryProps extends ParallaxGalleryResponse {
    meta: IMeta<'parallaxGallery'>
}

export interface IBlockTwoTileResponse extends BlockTwoTileResponse {
    meta: IMeta<'blockTwoTile'>
}

export interface IImageTwoTile extends ImageTwoTileResponse {
    meta: IMeta<'imageTwoTile'>
}
export interface ISmartCases extends SmartCaseType {
    meta: IMeta<'smartCases'>
}
export interface ITwotilewithCallout extends TwotilewithCalloutResponse {
    meta: IMeta<'twoTileWithCallout'>
}
export interface IBannerIntereactiveCalloutResponse
    extends BannerIntereactiveCalloutResponse {
    meta: IMeta<'bannerWithInteractiveCallouts'>
}
export interface ITwotilewithCallout extends TwotilewithCalloutResponse {
    meta: IMeta<'twoTileWithCallout'>
}
export interface IVerticalTabsSection extends VerticalTabsSectionResponse {
    meta: IMeta<'verticalTabsSection'>
}
export interface IVerticalGraphSingleBarsType
    extends VerticalGraphSingleBarsType {
    meta: IMeta<'verticalGraphSingleBars'>
}

export interface IHorizontalGraphSingleBarsType
    extends HorizontalGraphSingleBarsType {
    meta: IMeta<'horizontalGraphSingleBars'>
}

export interface IVerticalGraphDoubleBarsType
    extends VerticalGraphDoubleBarsType {
    meta: IMeta<'verticalGraphDoubleBars'>
}

export interface ICusChartsGraphs extends CusChartsGraphs {
    meta: IMeta<'cusChartsGraphs'>
}

export interface IStandardBannerProps extends StandardBannerResponse {
    meta: IMeta<'itStandardBanner'>
}

export interface ITabbedOverlayProps extends TabbedOverlayResponse {
    meta: IMeta<'imageVideoTabbedOverlay'>
}

export interface ILeftRightTextProps extends LeftRightTextResponse {
    meta: IMeta<'leftRightText'>
}

export interface IBannerWithTwoImagesProps extends BannerWithTwoImagesResponse {
    meta: IMeta<'bannerWith2Images'>
}

export interface IIMGGridSystemProps extends IMGGridSystemProps {
    meta: IMeta<'imgGridSystem'>
}

export interface IBanner23TileProps extends Banner23TileProps {
    meta: IMeta<'it23Banners'>
}

export interface IMeta<T = string> {
    contentType: T
}

export interface ITabItem<T, C = unknown> {
    title?: string
    tabName: string
    url: string
    meta: IMeta<T>
    type:
        | 'accessories-parts'
        | 'accessories'
        | 'blog-articles'
        | 'compatibility'
        | 'overview'
        | 'package-contents'
        | 'support'
        | 'reviews'
        | 'downloads'
    content: C[]
    visible?: boolean
}

export interface ICalloutBlockItem {
    heading: string
    meta: IMeta<'calloutBlockItem'>
    subheading: string
    title: string
}

export interface IHTMLBlock {
    title: string
    meta: IMeta<'htmlMarkup'>
    markup: string
    linkedScript?: JsCssScript[]
}

export type JsCssScript = {
    meta: IMeta<'linkedJsCss'>
    templateName: string
    linkedJs?: string[]
    linkedCss?: string[]
}
export interface ICalloutBlock {
    title: string
    heading: string
    image: ImageType
    calloutBlockItems: ICalloutBlockItem[]
    backgroundColor: string
    meta: IMeta<'calloutBlock'>
    markup: any
    url: string
    shopifyUrl?: string
    script: string
}
export interface IProductContentfulResponse<T, D = string> {
    name: string
    sku: string
    shortDescription: string
    isEnabled: boolean
    isVisible: boolean
    identifier: string
    useFaqSchema: boolean
    tabs: ITabItem<T>[]
    meta: IMeta<D>
    promoMessage: {
        content: string
    }
    linkedProducts?: IProductContentfulResponse<T, D>[]
    calloutBlock: ICalloutBlock
    carouselContent: ICarouselContent
    embedVideo: EmbedVideoType
    features: Feature[]
    awards: ProductAwardsInterface
    verticalLightingGallery: VerticalLightingGalleryData
    horizontalLightingGallery: HorizontalLightingGalleryData
    imageTwoTileCallout: ImageTwoTileResponse
    nonInteractiveProductBlock: IProductBlocks
    packageContents?: IProductContentfulResponse<T, D>
    socialDefaultMedia: ImageType
    items: FAQModuleCollectionType[]
    carouselHow: CarouselHowType[]
    twoTileCallout: TwotilewithCalloutResponse
    bannerIntereactiveCallouts: BannerIntereactiveCalloutResponse
    verticalGraphSingleBars: VerticalGraphSingleBarsType
    horizontalGraphSingleBars: HorizontalGraphSingleBarsType
    verticalGraphDoubleBars: VerticalGraphDoubleBarsType
    contentModules: ContentModulesProps
    productFamily: ProductFamilyResponse
    customersAlsoBought: CustomersAlsoBoughtContent
    ribbons?: RibbonData[]
    banner: ImageWithDescriptionResponse
    shipsWithin: Text
}

export interface IGenericProductBlock<T = string> {
    heading?: string
    text?: string
    copy?: string
    imageWidth?: string
    imageHeight?: string
    productImage: ImageType
    mobileImage?: ImageType
    meta: IMeta<T>
}

export interface IProductBlock {
    title: string
    heading: string
    image: ImageLinkType
    cta: CTAType
    meta: IMeta<'productBlock'>
    text: string
    sku: string
    link: URLType
}

export interface ILearnMoreBlock {
    title: string
    products: IProductBlock[]
    backgroundImage: ImageLinkType
    meta: IMeta<'addToCartLearnMoreBlock'>
    heading: string
    subheading: string
    bodyCopy: string
}

export type ImageComponent = {
    description: string
    heading: string
    headingColor: string
    image: ImageType
    newTab: boolean
    title: string
    url: string
    videoUrl: string
}

export interface ICarouselContent {
    title: string
    subHeading: string
    copy: string
    subtitle: string
    contents: ImageComponent[]
    backgroundColor: string
    subHeadingColor: string
    headingColor: string
    copyColor: string
    headerTitle: string
    meta: IMeta<'productImageContents'>
    markup: any
    url: string
    developmentUrl?: string
    script: string
}
export interface IVerticalLightingGalleryData
    extends VerticalLightingGalleryData {
    meta: IMeta<'verticalLightingGallery'>
}

export interface ICopyBlock {
    title: string
    heading: string
    text: string
    meta: IMeta<'copyBlock'>
    backgroundColorHex?: string
    backgroundImage?: ImageType
}

export interface ICopyBlocksWrapper {
    contentCards: ICopyBlock[]
    title: string
    meta: IMeta<'copyBlocksWrapper'>
}
export interface IHorizontalLightingGalleryData
    extends HorizontalLightingGalleryData {
    meta: IMeta<'horizontalLightingGallery'>
}

export interface ISmartHome {
    title: string
    video: VideoType
    backgroundImage: ImageType
    headerTitle: string
    subtitle: string
    headerIcon: ImageType
    ctaLabel: string
    ctaUrl: string
    products: SmartHomeProduct[]
    fullWidth: boolean
    meta: IMeta<'smartHome'>
}

export interface ICarouselHowType extends CarouselHowType {
    meta: IMeta<'carouselHow'>
}
export interface IRichCarouselType extends RichCarouselType {
    meta: IMeta<'richCarousel'>
}

export interface ICorsairOneBlockType extends CorsairOneBlockType {
    meta: IMeta<'corsairOneBlock'>
}

// extend OverviewItem type with more interfaces ICalloutBlock | A | B
export type OverviewItem =
    | ICalloutBlock
    | ICarouselContent
    | ILearnMoreBlock
    | IHeroBannerType
    | IVerticalLightingGalleryData
    | IHorizontalLightingGalleryData
    | IProductBlocks
    | IInteractiveCardsSection
    | ISmartHome
    | IProductCallouts
    | IVidGalleryType
    | ITestimonialCarousel
    | IOverlayContent
    | IStandardCardsSection
    | ICarouselHowType
    | IINTProducts
    | IHydroXBlockResponse
    | ImageGridSystem
    | IParallaxGalleryProps
    | ImageGallerySystem
    | ICorsairOneBlockType
    | IBlockTwoTileResponse
    | ProfileProps
    | IImageTwoTile
    | ISmal2TileWToggle
    | ISmartCases
    | ITwotilewithCallout
    | IVerticalGraphSingleBarsType
    | IHorizontalGraphSingleBarsType
    | IVerticalGraphDoubleBarsType
    | ICusChartsGraphs
    | BuiltMultiMount
    | IStandardBannerProps
    | IBannerIntereactiveCalloutResponse
    | ITabbedOverlayProps
    | ISmartCases
    | CategorySliderProps
    | ILeftRightTextProps
    | BelowTheLine
    | IBannerWithTwoImagesProps
    | IVerticalTabsSection
    | IHTMLBlock
    | IIMGGridSystemProps
    | CarouselType
    | FullPanelCardsType
    | ImageWithDescriptionResponse
    | IBanner23TileProps
    | ListsTableInterface
    | Content
    | IPageSection
    | CarouselImageTextType
    | CslContainerTiles
    | CslContainer
    | OverlayProductContentCardsResponse

export type ContentModulesProps = [
    {
        title: string
        identifier: string
        bannerItems: BannerItemType[]
        textAlignment?: BannerTextAlignments
        isSpaceBetweenTiles?: boolean
        meta: IMeta<'banner2Tile'>
    },
    {
        autoPlay?: boolean
        bannerItems: BannerItemType[]
        duration?: number
        randomOrder: boolean
        meta: IMeta<'banners'>
    },
    {
        title?: string
        backgroundImage?: ImageType
        identifier: string
        heading?: string
        collections?: CategoryInterface[]
        meta: IMeta<'categorySlider'>
    },
    {
        title: string
        identifier: string
        bannerItems: BannerItemType[]
        meta: IMeta<'banneriCue'>
    },
    {
        title: string
        video: VideoType
        backgroundImage: ImageType
        headerTitle: string
        subtitle: string
        headerIcon: ImageType
        ctaLabel: string
        ctaUrl: string
        products: SmartHomeProduct[]
        fullWidth: boolean
        meta: IMeta<'smartHome'>
    },
    {
        title: string
        identifier: string
        bannerItems: BannerItemType[]
        layout?: string
        meta: IMeta<'banner3Tile'>
    }
]

export type CarouselProps = {
    autoPlay?: boolean
    bannerItems: BannerItemType[]
    duration?: number
    randomOrder: boolean
    meta: IMeta<'banners'>
}

export type CategorySliderProps = {
    title?: string
    backgroundImage?: ImageType
    identifier: string
    heading?: string
    collections?: CategoryInterface[]
    meta: IMeta<'categorySlider'>
}

export interface IOverviewItems {
    content: Array<OverviewItem>
}

export interface IProductBlock {
    heading: string
    text: string
    title: string
    productImage: {
        title: string
        description: string
        file: {
            contentType: string
            details: {
                image: {
                    width: number
                    height: number
                }
                size: number
            }
            fileName: string
            url: string
        }
        meta: Record<string, unknown>
    }
    meta: IMeta<'productBlock'>
}

export interface IProductBlocks {
    title: string
    mainImage: {
        title: string
        description: string
        file: {
            contentType: string
            details: {
                image: {
                    width: number
                    height: number
                }
                size: number
            }
            fileName: string
            url: string
        }
        meta: Record<string, unknown>
    }
    backgroundImage: {
        title: string
        description: string
        file: {
            contentType: string
            details: {
                image: {
                    width: number
                    height: number
                }
                size: number
            }
            fileName: string
            url: string
        }
        meta: Record<string, unknown>
    }
    link: URLType
    heading: string
    secondaryHeading: string
    meta: IMeta<'nonInteractiveProductBlock'>
    block: IProductBlock[]
    secondaryBlock: IProductBlock[]
}

export interface IInteractiveCard {
    title: string
    backgroundImage: ImageLinkType
    thumbnailImage: ImageType
    subheading: string
    subheadingPlacement: 'bottom' | 'top'
    textPlacement: string
    cta: CTAType
    heading: string
    text: string
    textWidth?: string
    productCards: IProductBlock[]
    meta: IMeta<'interactiveCard'>
    displayAsCta: 'cta' | 'icons'
    socialIcons: ImageLinkType[]
}
export interface IInteractiveCardsSection {
    title: string
    interactiveCardItems: IInteractiveCard[]
    backgroundColor: string
    heading: string
    text: string
    meta: IMeta<'interactiveCardsSection'>
}

export interface IProductCalloutItem {
    title: string
    heading: string
    text: string
    desktopItemSide: string
    meta: IMeta<'productCalloutItem'>
}

export interface IProductCallouts {
    title: string
    heading: string
    theme: string
    image: ImageType
    imageWidth?: string
    imageHeight?: string
    meta: IMeta<'productCallout'>
    calloutItems: IProductCalloutItem[]
}
export interface ITestimonialBlock {
    title: string
    desktopMainImagePosition: string
    headingTitle: string
    mobileMainImagePosition: string
    paginationTitle: string
    text: string
    desktopTextPosition: string
    meta: IMeta<'testimonialBlock'>
    mainImage: ImageType
    logo?: ImageType
    logoHeading?: string
}

export interface ITestimonialCarousel {
    title: string
    backgroundColorHex: string
    textColor: string
    heading: string
    meta: IMeta<'testimonialCarousel'>
    testimonialBlocks: ITestimonialBlock[]
    pageBackgroundImage?: ImageType
}

export interface IDarkLightTheme {
    meta: IMeta<'darkAndLightTheme'>
    title: string
    theme: 'dark' | 'light'
    backgroundDark: string
    backgroundLight: string
    colorLight: string
    colorDark: string
}

export interface IStandardCard {
    theme?: IDarkLightTheme
    meta: IMeta<'standardContentCard'>
    image?: ImageLinkType
    text: string
    heading: string
    title: string
}

export interface IStandardCardsSection {
    title: string
    heading: string
    subheading: string
    standardCards: IStandardCard[]
    theme?: IDarkLightTheme | undefined
    text?: string
    meta: IMeta<'standardCardsSection'>
    pageBackgroundImage?: ImageType
}

export interface MenuLink {
    color: string
    meta: { contentType: string }
    target: string
    text: string
    url: string
    openModal: boolean
}

export interface Text {
    text: string
    meta: { contentType: string }
    description: string
}
export interface IBlogArticle {
    articleName: string
    author: string
    featuredImage: ImageLinkType
    linkToArticle: string
    meta: IMeta<'blogPostEntry'>
    publishDate: string
    title: string
}

export interface IBlogTab {
    title: string
    tabName: string
    content: IBlogArticle[]
    meta: IMeta<'blogArticlesPdpTab'>
}

export interface IINTProductItem {
    title: string
    heading: string
    productImage: ImageLinkType
    meta: IMeta<'intProducts'>
    cta: CTAType
    theme: IDarkLightTheme
}

export interface IINTProducts {
    heading: string
    title: string
    text?: string
    mainImage: ImageLinkType
    cta: CTAType
    theme: IDarkLightTheme
    intProductList: IINTProductItem[]
    meta: IMeta<'intProducts'>
}
export interface IContentCardTiles {
    backgroundImage?: ImageType
    copy?: string
    heading?: string
    meta: {
        contentType: string
    }
    subHeading?: string
    tile?: ContentCardTileInterface[]
    title?: string
}

export interface ILogoSlider {
    backgroundColor?: string
    backgroundImage?: ImageType
    heading?: string
    logos?: LogoType[]
    meta: {
        contentType: string
    }
    title: string
}

export interface ImageGridSystem {
    identifier: string
    primaryGrid: GridImage
    secondaryGrid: GridImage[]
    title: string
    meta: IMeta<'imageGrid'>
    backgroundSilder?: ImageType[]
}

export interface ImageGallerySystem {
    title: string
    ratio: boolean
    images: {
        title: string
        description: string
        file: {
            url: string
            details: {
                image: {
                    width: number
                    height: number
                }
            }
        }
    }[]
    meta: IMeta<'img4Up'>
    pageBackgroundImage?: ImageType
}

export interface IAccessoriesParts {
    title: string
    tabName: string
    description: string
    urlSlug: string
    url: string
    meta: IMeta<'accessoriesParts'>
}
export interface ProductFamilyBlockType {
    meta: Meta
    primaryImage: ImageType
    productSlug: string
    showPrice: boolean
    sku: string
    title: string
    description: string
    variants: ProductFamilyBlockVariantType[]
}

export interface ProductFamilyResponse {
    title: string
    identifier: string
    heading: string
    backgroundColor: string
    loopCarousel: boolean
    meta: Meta
    productBlocks: ProductFamilyBlockType[]
}

export interface ProductFamilyBlockVariantType {
    name: string
    sku: string
    meta: {
        contentType: string
    }
    colorSwatch: ImageType
    variantImage: ImageType
}

export interface IBackgroundColor {
    colorHex: string
    gradientColor: boolean
    meta: IMeta<'backgroundColor'>
    opacity: number
    title: string
    gradient: string
    backgroundImage?: ImageType
}

export interface IPageSection {
    backgroundColor: IBackgroundColor
    pageBackgroundImage: ImageType
    meta: IMeta<'pageSection'>
    title: string
    contentModules: Array<{
        identifier: string
        [k: string]: any
        meta: IMeta<string>
    }>
}
export interface ProductType {
    heading: string
    description: string
    image: ImageType
    price_range: CartItemPrices | PriceRange
    product: ProductInterface
    __typename: string
}

export type PimProductOption = {
    option_id: number
    option_name: string
    value: string
    sort_order: number
}

export type PimProductOptionValue = {
    option_id: number
    option_name: string
    value: {
        id: number
        value: string
    }
}

export type ProductRelation = {
    id: number
    name: string
    values: {
        id: number
        name: string
        sku: string
        web_id: string
        option_values: PimProductOption[]
    }[]
}

export type PimParentOption = {
    id: number
    name: string
    values: {
        id: number
        option_id: number
        value: string
    }[]
}

export type ImageWithDescriptionResponse = {
    heading: string
    subheading: string
    headingText: string
    ctaButton: string
    backgroundColor: string
    meta: IMeta<'itImageWithDescription'>
    title1stImage: string
    disclaimerCopy: string
    titleFontColor: string
    title2ndImage: string
    titleFontColor2ndImage: string
    lineBelowColor: string
    lineBelowColor2ndImage: string
    copy2ndImage: string
    copy: string
    desktopMedia: ImageType
    mobileMedia: ImageType[]
    disclaimerCopy2ndImage: string
}

export type ImageWithDescriptionProps = {
    content: ImageWithDescriptionResponse | null
}

export interface verticalPaddings {
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
}
