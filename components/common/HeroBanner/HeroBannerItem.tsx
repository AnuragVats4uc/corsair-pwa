import { useRef } from 'react'
import Image from 'next/image'
import s from './HeroBannerItem.module.scss'
import { HeroBannerItemType } from './HeroBanner'
import { HeroBannerTwClasses as twClasses } from './HeroBannerTwClasses'
import { HeroCtaButton } from './HeroCtaButton'
import { HeroMedia } from './HeroMedia'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import cn from 'classnames'
import { useMediaQuery } from '@lib/hooks/useMediaQuery'
import { JsonToCss } from './Util/JsonToCss'
export const HeroBannerItem = ({
    content,
    animate = true,
    headingType = ['H2']
}: {
    content: HeroBannerItemType
    animate?: boolean
    headingType: string[]
}): JSX.Element => {
    const {
        heading,
        subHeading,
        description,
        ctaButton,
        logo,
        logoHeight,
        logoWidth,
        desktopImageOrVideo,
        mobileImageOrVideo
    } = content

    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, animate)
    const matchesDesktop = useMediaQuery('(min-width: 768px)')

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
        (heading && heading?.replace(/\s+/g, '')) ?? 'HeroBannerItem'

    return (
        <div
            className={cn(
                s['banner-container'],
                twClasses.bannerContainer,
                `verticalPaddings-${paddingsClassheading}`
            )}
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
            <div
                className={cn(
                    s['extra-info-container'],
                    {
                        [s['has-animate']]: animate,
                        [s['onScreen']]: isOnScreen
                    },
                    twClasses.extraInfoContainer
                )}
            >
                {logo && logo?.file && logo?.file?.url && (
                    <>
                        <div
                            className={cn(
                                s['logo-wrapper-mobile'],
                                'md:hidden'
                            )}
                        >
                            <Image
                                src={logo?.file?.url}
                                alt={logo?.description}
                                width={logoWidth ? logoWidth : 288}
                                height={logoHeight ? logoHeight : 69}
                            />
                        </div>
                        <div
                            className={cn(
                                s['logo-wrapper-desktop'],
                                'hidden md:block'
                            )}
                        >
                            <Image
                                src={logo?.file?.url}
                                alt={logo?.description}
                                width={logoWidth ? logoWidth : 288}
                                height={logoHeight ? logoHeight : 69}
                            />
                        </div>
                    </>
                )}

                <div ref={animateRef}>
                    {headingType[0] === 'H1' ? (
                        <h1 className={cn(s['heading'], twClasses.heading)}>
                            {heading}
                        </h1>
                    ) : (
                        <h2 className={cn(s['heading'], twClasses.heading)}>
                            {heading}
                        </h2>
                    )}
                    {subHeading && (
                        <div
                            className={cn(
                                s['sub-heading'],
                                twClasses.subHeading
                            )}
                        >
                            {subHeading}
                        </div>
                    )}
                    {description && (
                        <div
                            className={cn(
                                s['description'],
                                twClasses.description
                            )}
                        >
                            {description}
                        </div>
                    )}
                </div>
                <HeroCtaButton ctaButton={ctaButton} />
            </div>
            {mobileImageOrVideo && (
                <HeroMedia media={mobileImageOrVideo} isMobile />
            )}
            {desktopImageOrVideo && <HeroMedia media={desktopImageOrVideo} />}
        </div>
    )
}
