import dynamic from 'next/dynamic'
import type {
    ContentJsonItem,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'
import SmartHome from '../SmartHome'
import { ProductCallouts } from '../ProductCallouts/ProductCallouts'
import Smal2TileWrapper from '../Smal2TileWToggle/components/Smal2TileWrapper'
import ListsTable from '../ListsTable/ListsTable'
import ProductContentCarousel from '../ProductContentCarousel/ProductContentCarousel'
import HorizontalLightingGallery from '../HorizontalLightingGallery'
import VerticalLightingGallery from '../VerticalLightingGallery'
import { RibbonData } from '../types'
import { useRibbon } from '@pylot-data/hooks/ribbon/use-ribbon'
import ChartsAndGraphs from '@components/common/ChartsAndGraphs'
import { InteractiveCardSection } from '../InteractiveCardSection'

const CarouselHow = dynamic(() => import('@components/common/CarouselHow'))
const HeroBanner = dynamic(
    () => import('@components/common/HeroBanners/HeroBanners')
)
const CategorySlider = dynamic(
    () => import('@components/common/CategorySlider')
)
const ProductBlocksWrapper = dynamic(
    () => import('@components/common/ProductBlocks/ProductBlocksWrapper')
)

const FullPanelCards = dynamic(
    () => import('@components/common/FullPanelCards')
)
const VidGallery = dynamic(() => import('@components/common/VidGallery'))
const TestimonialCarousel = dynamic(
    () => import('@components/common/TestimonialCarousel/TestimonialCarousel')
)
const CarouselWrapper = dynamic(
    () => import('@components/common/CarouselWrapper/CarouselWrapper')
)

const LogoSlider = dynamic(() => import('@components/common/LogoSlider'))
const OverlayProductBlock = dynamic(
    () => import('@components/common/OverlayProductBlock/OverlayProductBlock')
)
const OverlayProductContentCards = dynamic(
    () =>
        import(
            '@components/common/ProductOverviewTab/OverlayProductContentCards'
        )
)
const HydroXSubmenu = dynamic(() => import('@components/common/HydroXSubmenu'))

const HydroXBlock = dynamic(
    () => import('@components/common/HydroXBlock/HydroXBlock')
)
const ImageGrid = dynamic(() => import('@components/common/ImageGrid'))
const ParallaxGallery = dynamic(
    () => import('@components/common/ParallaxGallery')
)
const CorsairOneBlock = dynamic(
    () => import('@components/common/CorsairOneBlock')
)
const BlockTwoTile = dynamic(() => import('@components/common/BlockTwoTile'))
const Block = dynamic(() => import('@components/common/BlockImage/Block'))
const ImageGallery = dynamic(() => import('@components/common/ImageGallery'))
const ProfileGrid = dynamic(() => import('@components/common/ProfileGrid'))
const ImageTwoTile = dynamic(() => import('@components/common/ImageTwoTile'))
const Download = dynamic(() => import('@components/common/Downloads/Downloads'))
const ProductFamily = dynamic(() => import('@components/common/ProductFamily'))
const PageSection = dynamic(() => import('@components/common/PageSection'))
const SmartCases = dynamic(() => import('@components/common/SmartCases'))
const Banners = dynamic(() => import('@components/common/Banners/Banners'))
const TwotilewithCallout = dynamic(
    () => import('@components/common/TwotilewithCallout')
)

const BuiltInMultiMount = dynamic(
    () => import('@components/common/BuiltInMultiMount')
)

const TabbedOverlay = dynamic(() => import('@components/common/TabbedOverlay'))

const VerticalGraphSingleBars = dynamic(
    () => import('@components/common/Graphs/VerticalGraphSingleBars')
)

const HorizontalGraphSingleBars = dynamic(
    () => import('@components/common/Graphs/HorizontalGraphSingleBars')
)

const VerticalGraphDoubleBars = dynamic(
    () => import('@components/common/Graphs/VerticalGraphDoubleBars')
)

const BannerIntereactiveCallout = dynamic(
    () => import('@components/common/BannerIntereactiveCallout')
)

const LearnMoreAddToCartBlock = dynamic(
    () =>
        import(
            '@components/common/LearnMoreAddToCartBlock/LearnMoreAddToCartBlock'
        )
)

const INTProducts = dynamic(
    () => import('@components/common/INTProducts/INTProducts')
)
const CalloutBlock = dynamic(
    () => import('@components/common/CalloutBlock/CalloutBlock')
)

const TableComparisonWrapper = dynamic(
    () => import('@components/common/TableComparison/TableComparison')
)
const LeftRightText = dynamic(() => import('@components/common/LeftRightText'))

const BelowTheLine = dynamic(() => import('@components/common/BelowTheLine'))

const VerticalTabsSection = dynamic(
    () => import('@components/common/VerticalTabsSection')
)
const BannerWithTwoImages = dynamic(
    () => import('@components/common/BannerWithTwoImages')
)
const GenericContainer = dynamic(
    () => import('@components/common/GenericContainer')
)

const ImageWithDescription = dynamic(
    () => import('@components/common/ImageWithDescription')
)
const IMGGridSystem = dynamic(() => import('@components/common/IMGGridSystem'))
const Banner23Tile = dynamic(() => import('@components/common/Banner23Tile'))

const MergeContainerStandard = dynamic(
    () => import('@components/common/MergeContainerStandard')
)

const Documentaion = dynamic(
    () => import('@components/common/Documentation/Documentation')
)

export type ContentPage = {
    title: string
    identifier: string
    useFaqSchema: boolean
    pageContentEntries: Array<{
        identifier: string
        [k: string]: unknown
        meta: { contentType: string }
    }>
    metaTitle?: string
    metaDescription?: string
    socialDefaultImage?: ImageType
    ribbons?: RibbonData[]
}

export const ContentPage: React.FC<{
    pageContent: ContentJsonItem<ContentPage>
}> = ({ pageContent }) => {
    const { 1: setRibbon } = useRibbon()

    setRibbon(pageContent.parsedEntries?.ribbons)
    return (
        <div
            className={`contentful-page contentful-page-${pageContent.identifier}`}
        >
            {pageContent.parsedEntries?.pageContentEntries?.map(
                (entryContent) => {
                    // `as any` is used on each of these because this PageContent component
                    // should not care about the type of the data passed in.
                    // There is no benefit to casting to `as CarouselPropType`.
                    // In fact, as long as the component prop type matches the Contentful
                    // data model, the prop data will always be in the correct type because
                    // Contentful always returns the same format for a given content-type.
                    switch (entryContent.meta.contentType) {
                        case 'carouselHow': {
                            return (
                                <CarouselHow
                                    carouselHow={entryContent as any}
                                />
                            )
                        }
                        case 'categorySlider': {
                            return (
                                <CategorySlider content={entryContent as any} />
                            )
                        }
                        case 'carouselppContainer': {
                            return (
                                <CarouselWrapper
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'smartHome': {
                            return <SmartHome content={entryContent as any} />
                        }
                        case 'heroBanner': {
                            return <HeroBanner content={entryContent as any} />
                        }
                        case 'nonInteractiveProductBlock': {
                            return (
                                <ProductBlocksWrapper
                                    productBlocks={entryContent as any}
                                />
                            )
                        }
                        case 'fullPanelCards': {
                            return (
                                <FullPanelCards content={entryContent as any} />
                            )
                        }
                        case 'vidGallery': {
                            return <VidGallery content={entryContent as any} />
                        }
                        case 'testimonialCarousel': {
                            return (
                                <TestimonialCarousel
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'productCallout': {
                            return (
                                <ProductCallouts
                                    productCallouts={entryContent as any}
                                />
                            )
                        }
                        case 'overlayProductBlock': {
                            return (
                                <OverlayProductBlock
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'overlayProductContentCards': {
                            return (
                                <OverlayProductContentCards
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'hydroXSubmenu': {
                            return (
                                <HydroXSubmenu content={entryContent as any} />
                            )
                        }
                        case 'hydroXContentBlock': {
                            return <HydroXBlock content={entryContent as any} />
                        }
                        case 'productFamily': {
                            return (
                                <ProductFamily content={entryContent as any} />
                            )
                        }
                        case 'imageGrid': {
                            return <ImageGrid content={entryContent as any} />
                        }
                        case 'parallaxGallery': {
                            return (
                                <ParallaxGallery
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'img4Up': {
                            return (
                                <ImageGallery content={entryContent as any} />
                            )
                        }
                        case 'corsairOneBlock': {
                            return (
                                <CorsairOneBlock
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'blockTwoTile': {
                            return (
                                <BlockTwoTile content={entryContent as any} />
                            )
                        }
                        case 'blockImageHeading': {
                            return <Block content={entryContent as any} />
                        }
                        case 'profileGrid': {
                            return <ProfileGrid content={entryContent as any} />
                        }
                        case 'imageTwoTile': {
                            return (
                                <ImageTwoTile content={entryContent as any} />
                            )
                        }
                        case 'download': {
                            return <Download content={entryContent as any} />
                        }
                        case 'pageSection': {
                            return <PageSection content={entryContent as any} />
                        }
                        case 'smal2TileWithToggle': {
                            return (
                                <Smal2TileWrapper
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'smartCases': {
                            return <SmartCases content={entryContent as any} />
                        }
                        case 'itStandardBanner': {
                            return <Banners content={entryContent as any} />
                        }
                        case 'twoTileWithCallout': {
                            return (
                                <TwotilewithCallout
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'verticalGraphSingleBars': {
                            return (
                                <VerticalGraphSingleBars
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'horizontalGraphSingleBars': {
                            return (
                                <HorizontalGraphSingleBars
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'verticalGraphDoubleBars': {
                            return (
                                <VerticalGraphDoubleBars
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'builtInMultiMount': {
                            return (
                                <BuiltInMultiMount
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'listsTable': {
                            return <ListsTable content={entryContent as any} />
                        }

                        case 'bannerWithInteractiveCallouts': {
                            return (
                                <BannerIntereactiveCallout
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'imageVideoTabbedOverlay': {
                            return (
                                <TabbedOverlay content={entryContent as any} />
                            )
                        }
                        case 'cslLogo': {
                            return <LogoSlider content={entryContent as any} />
                        }
                        case 'productImageContents': {
                            return (
                                <ProductContentCarousel
                                    carouselContent={entryContent as any}
                                />
                            )
                        }
                        case 'verticalLightingGallery': {
                            return (
                                <VerticalLightingGallery
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'horizontalLightingGallery': {
                            return (
                                <HorizontalLightingGallery
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'addToCartLearnMoreBlock': {
                            return (
                                <LearnMoreAddToCartBlock
                                    block={entryContent as any}
                                />
                            )
                        }
                        case 'itBelowTheLine': {
                            return (
                                <BelowTheLine content={entryContent as any} />
                            )
                        }
                        case 'comparisonTable': {
                            return (
                                <TableComparisonWrapper
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'verticalTabsSection': {
                            return (
                                <VerticalTabsSection
                                    content={entryContent as any}
                                />
                            )
                        }

                        case 'leftRightText': {
                            return (
                                <LeftRightText content={entryContent as any} />
                            )
                        }

                        case 'intProducts': {
                            return <INTProducts content={entryContent as any} />
                        }

                        case 'calloutBlock': {
                            return (
                                <CalloutBlock
                                    calloutBlock={entryContent as any}
                                />
                            )
                        }

                        case 'container': {
                            return (
                                <GenericContainer
                                    content={entryContent as any}
                                />
                            )
                        }

                        case 'bannerWith2Images': {
                            return (
                                <BannerWithTwoImages
                                    content={entryContent as any}
                                />
                            )
                        }

                        case 'cusChartsGraphs': {
                            return (
                                <ChartsAndGraphs
                                    content={entryContent as any}
                                />
                            )
                        }

                        case 'itImageWithDescription': {
                            return (
                                <ImageWithDescription
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'gridContentCards':
                        case 'standardCardsSection': {
                            return (
                                <MergeContainerStandard
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'imgGridSystem': {
                            return (
                                <IMGGridSystem content={entryContent as any} />
                            )
                        }
                        case 'it23Banners': {
                            return (
                                <Banner23Tile content={entryContent as any} />
                            )
                        }
                        case 'interactiveCardsSection': {
                            return (
                                <InteractiveCardSection
                                    content={entryContent as any}
                                />
                            )
                        }
                        case 'documentation': {
                            return (
                                <Documentaion content={entryContent as any} />
                            )
                        }
                        default: {
                            return null
                        }
                    }
                }
            )}
        </div>
    )
}
