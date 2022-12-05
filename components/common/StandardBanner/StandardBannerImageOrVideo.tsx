import React from 'react'
import Image from '@corratech/corsair-image'
import {
    CTAType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import cn from 'classnames'
import s from './StandardBanner.module.scss'
import { StandardBannerCTA } from './StandardBannerCTA'
import { StandardBannerResponse } from './StandardBanner'

export type StandardBannerImageOrVideoProps = {
    data: ImageType | VideoType
    fallback?: ImageType
    ctaLocation?: string
    cta: StandardBannerResponse
    desktopImageHeight?: string
    desktopImageWidth?: string
}

const c = /*tw*/ {
    standardBannerImageVideo: `${s['standard-banner-imageVideo']} block`
}

export const StandardBannerImageOrVideo = ({
    data,
    ctaLocation,
    cta,
    desktopImageWidth,
    desktopImageHeight
}: StandardBannerImageOrVideoProps): JSX.Element => {
    const imageOrVideo = () => {
        if (data?.file?.contentType.split('/')[0] === 'image') {
            return (
                <div className="relative">
                    <Image
                        src={data?.file?.url}
                        alt={data?.description}
                        objectFit="cover"
                        width={desktopImageWidth ? desktopImageWidth : 1000}
                        height={desktopImageHeight ? desktopImageHeight : 600}
                    />
                    {cta && !cta.backgroundImage && ctaLocation !== 'Top' && (
                        <div
                            className={cn(
                                ctaLocation !== 'Top' && 'hidden md:block'
                            )}
                        >
                            <StandardBannerCTA content={cta} />
                        </div>
                    )}
                </div>
            )
        }

        return (
            <>
                <VideoFilePlayer
                    videos={[data]}
                    className={`${s['slider-video']} hidden md:block`}
                    controls
                />
                <VideoFilePlayer
                    videos={[data]}
                    className={`${s['slider-video']} block md:hidden`}
                    controls
                    autoPlay={false}
                />
                {cta && !cta.backgroundImage && ctaLocation !== 'Top' && (
                    <div
                        className={cn(
                            ctaLocation !== 'Top' && 'hidden md:block'
                        )}
                    >
                        <StandardBannerCTA content={cta} />
                    </div>
                )}
            </>
        )
    }

    return <div className={c.standardBannerImageVideo}>{imageOrVideo()}</div>
}
