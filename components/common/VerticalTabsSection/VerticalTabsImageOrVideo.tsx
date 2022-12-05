import React from 'react'
import Image from '@corratech/corsair-image'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import cn from 'classnames'
import s from './VerticalTabsSection.module.scss'

export type VerticalTabsImageOrVideoProps = {
    data: ImageType | VideoType
    fallback?: ImageType
}

const c = /*tw*/ {
    VerticalTabsImageOrVideo: `${s['VerticalTabsImageOrVideo']} block`
}

export const VerticalTabsImageOrVideo = ({
    data
}: VerticalTabsImageOrVideoProps): JSX.Element => {
    let imageCheck = {
        width: 1000,
        height: 840
    }

    if ('image' in data?.file?.details) {
        imageCheck = data?.file?.details?.image
    }

    const imageOrVideo = () => {
        if (data?.file?.contentType.split('/')[0] === 'video') {
            return (
                <VideoFilePlayer
                    videos={[data]}
                    className={cn(
                        s['slider-video'],
                        'object-cover w-full h-full px-8 object-center md:pt-13'
                    )}
                />
            )
        }

        return (
            <Image
                alt={data?.description}
                src={data?.file?.url}
                width={imageCheck?.width}
                height={imageCheck?.height}
                objectFit="contain"
            />
        )
    }

    return <div className={c.VerticalTabsImageOrVideo}>{imageOrVideo()}</div>
}
