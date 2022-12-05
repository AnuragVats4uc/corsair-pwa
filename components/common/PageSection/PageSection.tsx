import React, { VFC } from 'react'
import dynamic from 'next/dynamic'
import type { IPageSection } from '../types'
import { InteractiveCardSection } from '@components/common/InteractiveCardSection'
import { percentToHex } from 'helpers/colorHelper'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export type PageSectionProps = {
    content: IPageSection
}

const contentMap = {
    bannerWith2Images: dynamic(
        () => import('@components/common/BannerWithTwoImages')
    ),
    verticalTabsSection: dynamic(
        () => import('@components/common/VerticalTabsSection')
    ),
    productFamily: dynamic(() => import('@components/common/ProductFamily')),
    vidGallery: dynamic(() => import('@components/common/VidGallery')),
    categorySlider: dynamic(() => import('@components/common/CategorySlider')),
    interactiveCardsSection: InteractiveCardSection,
    fullPanelCards: dynamic(() => import('@components/common/FullPanelCards')),
    profileGrid: dynamic(() => import('@components/common/ProfileGrid')),
    overlayProductBlock: dynamic(
        () =>
            import('@components/common/OverlayProductBlock/OverlayProductBlock')
    ),
    standardCardsSection: dynamic(
        () => import('@components/common/MergeContainerStandard')
    ),
    carouselHow: dynamic(() => import('@components/common/CarouselHow')),
    cslLogo: dynamic(() => import('@components/common/LogoSlider')),
    productImageContents: dynamic(
        () =>
            import(
                '@components/common/ProductContentCarousel/ProductContentCarousel'
            )
    ),
    testimonialCarousel: dynamic(
        () =>
            import('@components/common/TestimonialCarousel/TestimonialCarousel')
    ),
    cusChartsGraphs: dynamic(
        () => import('@components/common/ChartsAndGraphs')
    ),
    customersAlsoBought: dynamic(
        () =>
            import('@components/common/CustomersAlsoBought/CustomersAlsoBought')
    ),
    imageVideoTabbedOverlay: dynamic(
        () => import('@components/common/TabbedOverlay')
    ),
    imageTwoTile: dynamic(() => import('@components/common/ImageTwoTile')),
    img4Up: dynamic(() => import('@components/common/ImageGallery')),
    parallaxGallery: dynamic(
        () => import('@components/common/ParallaxGallery')
    ),
    imageGrid: dynamic(() => import('@components/common/ImageGrid')),
    smartHome: dynamic(() => import('@components/common/SmartHome')),
    addToCartLearnMoreBlock: dynamic(
        () =>
            import(
                '@components/common/LearnMoreAddToCartBlock/LearnMoreAddToCartBlock'
            )
    ),
    productCallout: dynamic(
        () => import('@components/common/ProductCallouts/ProductCallouts')
    ),
    intProducts: dynamic(
        () => import('@components/common/INTProducts/INTProducts')
    ),
    blockImageHeading: dynamic(
        () => import('@components/common/BlockImage/Block')
    ),
    blockTwoTile: dynamic(() => import('@components/common/BlockTwoTile')),
    twoTileWithCallout: dynamic(
        () => import('@components/common/TwotilewithCallout')
    ),
    smal2TileWithToggle: dynamic(
        () =>
            import(
                '@components/common/Smal2TileWToggle/components/Smal2TileWrapper'
            )
    ),

    corsairOneBlock: dynamic(
        () => import('@components/common/CorsairOneBlock')
    ),
    bannerWithInteractiveCallouts: dynamic(
        () => import('@components/common/BannerIntereactiveCallout')
    ),
    nonInteractiveProductBlock: dynamic(
        () => import('@components/common/ProductBlocks/ProductBlocksWrapper')
    ),

    calloutBlock: dynamic(
        () => import('@components/common/CalloutBlock/CalloutBlock')
    ),
    itImageWithDescription: dynamic(
        () => import('@components/common/ImageWithDescription')
    ),
    uniteYourSetupBlock: dynamic(
        () => import('@components/common/UniteYourSetupBlock')
    ),
    overlayProductContentCards: dynamic(
        () =>
            import(
                '@components/common/ProductOverviewTab/OverlayProductContentCards'
            )
    ),
    leftRightText: dynamic(() => import('@components/common/LeftRightText')),
    horizontalLightingGallery: dynamic(
        () => import('@components/common/HorizontalLightingGallery')
    ),
    verticalLightingGallery: dynamic(
        () => import('@components/common/VerticalLightingGallery')
    ),
    comparisonTable: dynamic(
        () => import('@components/common/TableComparison/TableComparison')
    ),
    listsTable: dynamic(
        () => import('@components/common/ListsTable/ListsTable')
    ),

    carouselppContainer: dynamic(
        () => import('@components/common/CarouselWrapper/CarouselWrapper')
    ),
    smartCases: dynamic(() => import('@components/common/SmartCases/index')),
    it23Banners: dynamic(() => import('@components/common/Banner23Tile/index'))
}

const PageSection: VFC<PageSectionProps> = ({ content }) => {
    const colorWithOpacity =
        content.backgroundColor?.colorHex +
        percentToHex(content?.backgroundColor?.opacity)

    const styles = {
        backgroundImageURL:
            !content.backgroundColor?.colorHex &&
            content.pageBackgroundImage?.file.url,
        backgroundGradient: content.backgroundColor?.gradientColor
            ? content.backgroundColor?.gradient
            : undefined,
        backgroundColor: content.backgroundColor?.colorHex && colorWithOpacity
    }

    const parentDivStyle = styles.backgroundColor
        ? { backgroundColor: styles.backgroundColor }
        : {
              background: `#000 url(${styles?.backgroundImageURL}) 100% 100% repeat`,
              backgroundSize: '42px 68px',
              backgroundAttachment: 'fixed'
          }

    const backgroundColorHex = styles.backgroundColor
        ? styles.backgroundColor?.replace('#', '')
        : 'transparent'

    return (
        <div style={parentDivStyle}>
            <div
                style={{
                    background: styles.backgroundGradient,
                    backgroundAttachment: 'fixed'
                }}
            >
                {content.contentModules?.map((content) => {
                    // the ts ignore is because at the moment
                    // there isn’t defined which cases could match with content.meta.contentType,
                    // at the moment for Corsair and ElGato is out of scope, for example,
                    // Origin has already defined which components could be inside the contentModules
                    // field at Contentful
                    // https://bitbucket.org/corratech/corsair-pwa/pull-requests/699#comment-301890677
                    //@ts-ignore
                    const Component = contentMap[content.meta.contentType]

                    const backgroundImage: ImageType = {
                        description: content?.pageBackgroundImage?.description,
                        title: content?.pageBackgroundImage?.title,
                        file: {
                            ...content?.pageBackgroundImage?.file,
                            url:
                                styles.backgroundImageURL ||
                                content.pageBackgroundImage?.file?.url
                        }
                    }

                    const contentWithBackground = {
                        ...content,
                        backgroundColor: 'transparent',
                        pageBackgroundImage:
                            !styles.backgroundColor && backgroundImage,
                        copyBlock: {
                            ...content?.copyBlock,
                            backgroundColorHex: backgroundColorHex
                        }
                    }

                    return (
                        Component && (
                            <div
                                style={{
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <Component
                                    content={contentWithBackground}
                                    items={[contentWithBackground]}
                                    block={contentWithBackground}
                                    productBlocks={contentWithBackground}
                                    calloutBlock={contentWithBackground}
                                    carouselContent={contentWithBackground}
                                    carouselHow={contentWithBackground}
                                    productCallouts={contentWithBackground}
                                />
                            </div>
                        )
                    )
                })}
            </div>
        </div>
    )
}

export default PageSection
