import React, { useRef } from 'react'
import TopTextLayout from '@components/common/TopTextLayout'
import {
    CTAType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import { DisclaimerBlock } from '@components/common/DisclaimerBlock'
import { StandardBannerLogo } from './StandardBannerLogo'
import { StandardBannerImageOrVideo } from './StandardBannerImageOrVideo'
import { StandardBannerIconsBlock } from './StandardBannerIconsBlock'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import { StandardBannerCTA } from './StandardBannerCTA'
import s from './StandardBanner.module.scss'
import cn from 'classnames'
import VideoFilePlayer from '../Carousel/VideoFilePlayer'
import { verticalPaddings } from '../types'
import { JsonToCss } from '../HeroBanner/Util/JsonToCss'

export type Icon = {
    title: string
    image: ImageType
    position: string
    color: string
    meta: { contentType: string }
}
export interface StandardBannerResponse extends verticalPaddings {
    title: string
    type?: string
    heading: string
    subHeading: string
    text: string
    fontColor?: string | undefined
    backgroundColor?: string
    backgroundImage?: ImageType | VideoType
    meta: { contentType: string }
    logo?: ImageType
    logoWidth?: string
    logoHeight?: string
    desktopContentPosition: string
    mobileContentPosition: string
    disclaimerTextOne?: string
    desktopImageVideo: ImageType | VideoType
    desktopImageWidth?: string
    desktopImageHeight?: string
    mobileImageVideo?: ImageType | VideoType
    disclaimerTextTwo?: string
    iconsBlock?: [Icon]
    ctaButton: CTAType
    ctaLocation?: string
    backgroundLinearGradientColor?: string
}
export interface StandardBannerProps {
    content: StandardBannerResponse
}
const c = /*tw*/ {
    standardBannerWrapper: `${s['standard-banner-wrapper']} mx-auto block w-full h-full bg-center bg-no-repeat bg-cover absolute top-0 left-0`,
    standardBanner: `${s['standard-banner']} block opacity-0 relative`,
    standardBannerImage: `${s['standard-banner-image']} relative`,
    standardBannerText: `${s['standard-banner-text']} text-white`,
    standardBannerHeading: `${s['standard-banner-heading']} uppercase font-bebasNeue`,
    standardBannerMain: 'min-h-screen overflow-hidden',
    standardBannerVideo: 'w-full h-full object-center object-cover'
}
const StandardBanner = ({ content }: StandardBannerProps): JSX.Element => {
    const animateRef = useRef(null)

    const { isOnScreen } = useOnScreen(animateRef, true)

    const isMobile = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px)').matches

    const imageOrVideoBlock = () => {
        let data = isMobile()
            ? content?.mobileImageVideo
            : content?.desktopImageVideo
        if (isMobile() && !content?.mobileImageVideo) {
            data = content?.desktopImageVideo
        }
        return (
            data && (
                <StandardBannerImageOrVideo
                    data={data}
                    ctaLocation={content.ctaLocation}
                    cta={content}
                    desktopImageWidth={content?.desktopImageWidth}
                    desktopImageHeight={content?.desktopImageHeight}
                />
            )
        )
    }

    const { heading, subHeading, text } = content

    const data = {
        heading,
        subHeading,
        text
    }

    const backgroundTypeImage =
        content?.backgroundImage?.file.contentType.split('/')[0] === 'image'

    const backgroundTypeVideo =
        content?.backgroundImage?.file.contentType.split('/')[0] === 'video'

    const background =
        (content?.backgroundColor && !content.backgroundImage) ||
        (content?.backgroundColor && backgroundTypeImage) ||
        (content?.backgroundColor &&
            backgroundTypeImage &&
            content?.backgroundLinearGradientColor)

    const backgroundLinear =
        backgroundTypeImage &&
        !backgroundTypeVideo &&
        content?.backgroundLinearGradientColor &&
        content?.backgroundColor

    const style = {
        backgroundImage:
            content?.backgroundImage &&
            `url(${content?.backgroundImage?.file?.url})`
    }

    const backgroundColorStyle = {
        backgroundColor: `${content?.backgroundColor}`
    }

    const backgroundColorPattern = {
        background: `${content?.backgroundColor} url(${content?.backgroundImage?.file.url})`
    }

    const linearStyle = {
        background: backgroundLinear
            ? `${content?.backgroundLinearGradientColor}`
            : ''
    }

    const stylesDesktop = {
        ...(content?.desktopPaddingTop && {
            'padding-top': `${content?.desktopPaddingTop}rem;`
        }),
        ...(content?.desktopPaddingBottom && {
            'padding-bottom': `${content?.desktopPaddingBottom}rem;`
        })
    }

    const stylesMobile = {
        ...(content?.mobilePaddingTop && {
            'padding-top': `${content?.mobilePaddingTop}rem;`
        }),
        ...(content?.mobilePaddingBottom && {
            'padding-bottom': `${content?.mobilePaddingBottom}rem;`
        })
    }

    const paddingsClassheading =
        (content?.heading && content.heading?.replace(/\s+/g, '')) ??
        'StandardBanner'

    return (
        <section
            className={cn('relative', {
                [c.standardBannerMain]:
                    (backgroundTypeImage &&
                        !content.backgroundColor &&
                        !content.backgroundLinearGradientColor) ||
                    backgroundTypeVideo
            })}
        >
            {backgroundTypeImage &&
                !content.backgroundColor &&
                !content.backgroundLinearGradientColor && (
                    <div
                        className={cn(
                            c.standardBannerWrapper,
                            !content.desktopImageVideo && 'h-screen'
                        )}
                        style={style}
                    />
                )}
            {backgroundTypeVideo && content?.backgroundImage && (
                <div className="w-full h-full absolute">
                    <VideoFilePlayer
                        videos={[content.backgroundImage]}
                        className={c.standardBannerVideo}
                    />
                </div>
            )}
            {background && (
                <div
                    className={cn(
                        c.standardBannerWrapper,
                        !content.desktopImageVideo && 'h-screen'
                    )}
                    style={
                        backgroundTypeImage
                            ? backgroundColorPattern
                            : backgroundColorStyle
                    }
                />
            )}
            <div
                className={cn(
                    c.standardBanner,
                    {
                        [s['onScreen']]: isOnScreen
                    },
                    `align${
                        isMobile()
                            ? content?.mobileContentPosition
                            : content?.desktopContentPosition
                    }`,
                    `verticalPaddings-${paddingsClassheading}`
                )}
                ref={animateRef}
                style={{ ...linearStyle }}
            >
                <style jsx>{` 
                    @media screen and (min-width: 768px){
                        .verticalPaddings-${paddingsClassheading} ${JsonToCss(
                    stylesDesktop
                )}
                    }
                    @media screen and (max-width: 767px) {                               
                        .verticalPaddings-${paddingsClassheading} ${JsonToCss(
                    stylesMobile
                )}
                    }`}</style>

                {content?.logo && (
                    <StandardBannerLogo
                        logo={content?.logo}
                        logoWidth={content?.logoWidth}
                        logoHeight={content?.logoHeight}
                    />
                )}
                {data && (
                    <div className="pt-8">
                        <TopTextLayout
                            data={data}
                            fontColor={content?.fontColor}
                        />
                    </div>
                )}
                {content?.ctaButton && (
                    <div
                        className={cn(
                            'block',
                            content?.ctaLocation !== 'Top' && 'md:hidden'
                        )}
                    >
                        <StandardBannerCTA content={content} />
                    </div>
                )}
                {content?.disclaimerTextOne && (
                    <DisclaimerBlock
                        disclaimer={content.disclaimerTextOne}
                        useBackground={false}
                    />
                )}
                {content?.iconsBlock && (
                    <StandardBannerIconsBlock icons={content?.iconsBlock} />
                )}
                {imageOrVideoBlock()}
                {content?.disclaimerTextTwo && (
                    <DisclaimerBlock
                        disclaimer={content.disclaimerTextTwo}
                        useBackground
                    />
                )}
            </div>
            {content?.ctaButton &&
                content?.backgroundImage &&
                content?.ctaLocation !== 'Top' && (
                    <div
                        className={cn(
                            content.ctaLocation !== 'Top' && 'hidden md:block'
                        )}
                    >
                        <StandardBannerCTA content={content} />
                    </div>
                )}
        </section>
    )
}
export default StandardBanner
