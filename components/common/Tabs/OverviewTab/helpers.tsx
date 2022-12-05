import { CalloutBlock } from '@components/common/CalloutBlock'
import { HtmlBlock } from '@components/common/HtmlBlock'
import { IFrameEmbed } from '@components/common/IFrameEmbed'
import { InteractiveCardSection } from '@components/common/InteractiveCardSection'
import { LearnMoreAddToCartBlock } from '@components/common/LearnMoreAddToCartBlock'
import ProductBlocksWrapper from '@components/common/ProductBlocks/ProductBlocksWrapper'
import ProductContentCarousel from '@components/common/ProductContentCarousel/ProductContentCarousel'
import { SmalCode } from '@components/common/SmalCode'
import type {
    CategorySliderProps,
    IBannerIntereactiveCalloutResponse,
    IBlockTwoTileResponse,
    ICalloutBlock,
    ICarouselContent,
    ICarouselHowType,
    ICorsairOneBlockType,
    IHorizontalGraphSingleBarsType,
    IHorizontalLightingGalleryData,
    IHydroXBlockResponse,
    IImageTwoTile,
    IInteractiveCardsSection,
    IINTProducts,
    ILearnMoreBlock,
    ILogoSlider,
    ImageGallerySystem,
    ImageGridSystem,
    IParallaxGalleryProps,
    IProductBlocks as IProductBlocksType,
    IProductCallouts,
    ISmartCases,
    ISmartHome,
    ITabbedOverlayProps,
    ITestimonialCarousel,
    ITwotilewithCallout,
    IVerticalGraphDoubleBarsType,
    IVerticalGraphSingleBarsType,
    IVerticalLightingGalleryData,
    IVidGalleryType,
    OverviewItem as OverviewItemType,
    ProductFamilyResponse,
    ILeftRightTextProps,
    IBannerWithTwoImagesProps,
    IVerticalTabsSection,
    ICusChartsGraphs,
    ImageWithDescriptionResponse,
    IHTMLBlock,
    IIMGGridSystemProps,
    IBanner23TileProps,
    IPageSection
} from '@components/common/types'
import type { ISmal2TileWToggle } from '@components/common/Smal2TileWToggle/types'
import VerticalLightingGallery from '@components/common/VerticalLightingGallery'
import HorizontalLightingGallery from '@components/common/HorizontalLightingGallery'
import dynamic from 'next/dynamic'
import ProductCallouts from '@components/common/ProductCallouts/ProductCallouts'
import TestimonialCarousel from '@components/common/TestimonialCarousel/TestimonialCarousel'
import { OverlayProductBlock } from '@components/common/OverlayProductBlock'
import type { IOverlayContent } from '@components/common/OverlayProductBlock/BlockFullScreen'
import { INTProducts } from '@components/common/INTProducts'
import HydroXBlock from '@components/common/HydroXBlock/HydroXBlock'
import ImageGrid from '@components/common/ImageGrid'
import ParallaxGallery from '@components/common/ParallaxGallery'
import ImageGallery from '@components/common/ImageGallery'
import BlockTwoTile from '@components/common/BlockTwoTile'
import { ProfileProps } from '@components/common/ProfileGrid/types'
import ImageTwoTile from '@components/common/ImageTwoTile'
import Smal2TileWrapper from '@components/common/Smal2TileWToggle/components/Smal2TileWrapper'
import SmartCases from '@components/common/SmartCases'
import TwotilewithCallout from '@components/common/TwotilewithCallout'
import VerticalGraphSingleBars from '@components/common/Graphs/VerticalGraphSingleBars'
import HorizontalGraphSingleBars from '@components/common/Graphs/HorizontalGraphSingleBars'
import VerticalGraphDoubleBars from '@components/common/Graphs/VerticalGraphDoubleBars'
import BuiltInMultiMount from '@components/common/BuiltInMultiMount'
import { BuiltMultiMount } from '@components/common/BuiltInMultiMount/types'
import ListsTable from '@components/common/ListsTable/ListsTable'
import TabbedOverlay from '@components/common/TabbedOverlay'
import LogoSlider from '@components/common/LogoSlider'
import { FullPanelCardsType } from '@components/common/FullPanelCards/FullPanelCards'
import { BelowTheLine } from '@components/common/BelowTheLine/BelowTheLineTypes'
import GenericContainer from '@components/common/GenericContainer'
import { StandardBannerResponse } from '@components/common/StandardBanner/StandardBanner'
import { CarouselType } from '@components/common/Carousel/Carousel'
import { Content } from '@components/common/TableComparison/TableComparison.interfaces'
import type { CslContainerTiles } from '@components/common/CarouselProductTiles/CarouselProductTiles'
import type { CslContainer } from '@components/common/CarouselTestimonial/CarouselTestimonial'
import type { CarouselImageTextType } from '@components/common/CarouselImageText'
import { OverlayProductContentCardsResponse } from '@components/common/ProductOverviewTab/OverlayProductContentCards/OverlayProductContentCards'

const HeroBanners = dynamic(
    () => import('@components/common/HeroBanners/HeroBanners')
)
const VidGallery = dynamic(() => import('@components/common/VidGallery'))
const CarouselHow = dynamic(() => import('@components/common/CarouselHow'))
const CorsairOneBlock = dynamic(
    () => import('@components/common/CorsairOneBlock')
)
const ProfileGrid = dynamic(() => import('@components/common/ProfileGrid'))
const ProductFamily = dynamic(() => import('@components/common/ProductFamily'))
const CategorySlider = dynamic(
    () => import('@components/common/CategorySlider')
)
const SmartHome = dynamic(() => import('@components/common/SmartHome'))
const BannerIntereactiveCallout = dynamic(
    () => import('@components/common/BannerIntereactiveCallout')
)
const FullPanelCards = dynamic(
    () => import('@components/common/FullPanelCards')
)
const BelowTheLine = dynamic(() => import('@components/common/BelowTheLine'))
const TableComparisonWrapper = dynamic(
    () => import('@components/common/TableComparison/TableComparison')
)
const LeftRightText = dynamic(() => import('@components/common/LeftRightText'))
const BannerWithTwoImages = dynamic(
    () => import('@components/common/BannerWithTwoImages')
)
const VerticalTabsSection = dynamic(
    () => import('@components/common/VerticalTabsSection')
)
const CusChartsGraphs = dynamic(
    () => import('@components/common/ChartsAndGraphs')
)
const ImageWithDescription = dynamic(
    () => import('@components/common/ImageWithDescription')
)
const MergeContainerStandard = dynamic(
    () => import('@components/common/MergeContainerStandard')
)
const IMGGridSystem = dynamic(() => import('@components/common/IMGGridSystem'))
const Banners = dynamic(() => import('@components/common/Banners/Banners'))
const Banner23Tile = dynamic(() => import('@components/common/Banner23Tile'))
const PageSection = dynamic(
    () => import('@components/common/PageSection/index')
)

const OverlayProductContentCards = dynamic(
    () =>
        import(
            '@components/common/ProductOverviewTab/OverlayProductContentCards'
        )
)
const CarouselWrapper = dynamic(
    () => import('@components/common/CarouselWrapper/CarouselWrapper')
)

export const getOverviewItemElement = (
    overviewItem: OverviewItemType
): JSX.Element =>
    ({
        gridContentCards: (
            <MergeContainerStandard content={overviewItem as any} />
        ),
        standardCardsSection: (
            <MergeContainerStandard content={overviewItem as any} />
        ),
        iFrameEmbed: <IFrameEmbed props={overviewItem as ICalloutBlock} />,
        htmlMarkup: <HtmlBlock props={overviewItem as IHTMLBlock} />,
        smalCode: <SmalCode props={overviewItem as ICalloutBlock} />,
        calloutBlock: (
            <CalloutBlock calloutBlock={overviewItem as ICalloutBlock} />
        ),
        addToCartLearnMoreBlock: (
            <LearnMoreAddToCartBlock block={overviewItem as ILearnMoreBlock} />
        ),
        productImageContents: (
            <ProductContentCarousel
                carouselContent={overviewItem as ICarouselContent}
            />
        ),
        nonInteractiveProductBlock: (
            <ProductBlocksWrapper
                productBlocks={overviewItem as IProductBlocksType}
            />
        ),
        heroBanner: <HeroBanners content={overviewItem as CarouselType} />,
        vidGallery: <VidGallery content={overviewItem as IVidGalleryType} />,
        verticalLightingGallery: (
            <VerticalLightingGallery
                content={overviewItem as IVerticalLightingGalleryData}
            />
        ),
        interactiveCardsSection: (
            <InteractiveCardSection
                content={overviewItem as IInteractiveCardsSection}
            />
        ),
        horizontalLightingGallery: (
            <HorizontalLightingGallery
                content={overviewItem as IHorizontalLightingGalleryData}
            />
        ),
        productCallout: (
            <ProductCallouts
                productCallouts={overviewItem as IProductCallouts}
            />
        ),
        testimonialCarousel: (
            <TestimonialCarousel
                content={overviewItem as ITestimonialCarousel}
            />
        ),
        overlayProductBlock: (
            <OverlayProductBlock content={overviewItem as IOverlayContent} />
        ),

        intProducts: <INTProducts content={overviewItem as IINTProducts} />,
        hydroXContentBlock: (
            <HydroXBlock content={overviewItem as IHydroXBlockResponse} />
        ),
        carouselHow: (
            <CarouselHow carouselHow={overviewItem as ICarouselHowType} />
        ),
        imageGrid: <ImageGrid content={overviewItem as ImageGridSystem} />,
        parallaxGallery: (
            <ParallaxGallery content={overviewItem as IParallaxGalleryProps} />
        ),
        img4Up: <ImageGallery content={overviewItem as ImageGallerySystem} />,
        corsairOneBlock: (
            <CorsairOneBlock content={overviewItem as ICorsairOneBlockType} />
        ),
        blockTwoTile: (
            <BlockTwoTile content={overviewItem as IBlockTwoTileResponse} />
        ),
        profileGrid: <ProfileGrid content={overviewItem as ProfileProps} />,
        imageTwoTile: <ImageTwoTile content={overviewItem as IImageTwoTile} />,
        smal2TileWithToggle: (
            <Smal2TileWrapper content={overviewItem as ISmal2TileWToggle} />
        ),
        smartCases: <SmartCases content={overviewItem as ISmartCases} />,
        twoTileWithCallout: (
            <TwotilewithCallout content={overviewItem as ITwotilewithCallout} />
        ),
        verticalGraphSingleBars: (
            <VerticalGraphSingleBars
                content={overviewItem as IVerticalGraphSingleBarsType}
            />
        ),
        horizontalGraphSingleBars: (
            <HorizontalGraphSingleBars
                content={overviewItem as IHorizontalGraphSingleBarsType}
            />
        ),
        verticalGraphDoubleBars: (
            <VerticalGraphDoubleBars
                content={overviewItem as IVerticalGraphDoubleBarsType}
            />
        ),
        builtInMultiMount: (
            <BuiltInMultiMount content={overviewItem as BuiltMultiMount} />
        ),
        itStandardBanner: (
            <Banners content={overviewItem as StandardBannerResponse} />
        ),
        categorySlider: (
            <CategorySlider content={overviewItem as CategorySliderProps} />
        ),
        smartHome: <SmartHome content={overviewItem as ISmartHome} />,
        overlayProductContentCards: (
            <OverlayProductContentCards
                content={overviewItem as OverlayProductContentCardsResponse}
            />
        ),
        bannerWithInteractiveCallouts: (
            <BannerIntereactiveCallout
                content={overviewItem as IBannerIntereactiveCalloutResponse}
            />
        ),
        listsTable: <ListsTable content={overviewItem as any} />,
        imageVideoTabbedOverlay: (
            <TabbedOverlay content={overviewItem as ITabbedOverlayProps} />
        ),
        productFamily: (
            <ProductFamily content={overviewItem as ProductFamilyResponse} />
        ),
        cslLogo: <LogoSlider content={overviewItem as ILogoSlider} />,
        fullPanelCards: (
            <FullPanelCards content={overviewItem as FullPanelCardsType} />
        ),
        container: <GenericContainer content={overviewItem as any} />,
        itBelowTheLine: <BelowTheLine content={overviewItem as BelowTheLine} />,
        comparisonTable: (
            <TableComparisonWrapper content={overviewItem as Content} />
        ),
        leftRightText: (
            <LeftRightText content={overviewItem as ILeftRightTextProps} />
        ),
        bannerWith2Images: (
            <BannerWithTwoImages
                content={overviewItem as IBannerWithTwoImagesProps}
            />
        ),
        verticalTabsSection: (
            <VerticalTabsSection
                content={overviewItem as IVerticalTabsSection}
            />
        ),
        cusChartsGraphs: (
            <CusChartsGraphs content={overviewItem as ICusChartsGraphs} />
        ),
        itImageWithDescription: (
            <ImageWithDescription
                content={overviewItem as ImageWithDescriptionResponse}
            />
        ),
        imgGridSystem: (
            <IMGGridSystem content={overviewItem as IIMGGridSystemProps} />
        ),
        it23Banners: (
            <Banner23Tile content={overviewItem as IBanner23TileProps} />
        ),
        pageSection: <PageSection content={overviewItem as IPageSection} />,
        carouselppContainer: (
            <CarouselWrapper
                content={
                    overviewItem as
                        | CslContainer
                        | CslContainerTiles
                        | CarouselImageTextType
                }
            />
        )
    }[overviewItem.meta!.contentType])
