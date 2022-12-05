import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import React from 'react'
import VideoFilePlayer from '../Carousel/VideoFilePlayer'
import s from './Unite.module.scss'

type UniteBackground = {
    backgroundMedia: VideoType
    fallBackImage?: ImageType
}

const c = /*twc*/ {
    uniteBackgroundVideo: 'z-10 w-full h-full absolute top-0 left-0'
}

export const UniteVideo = ({
    backgroundMedia,
    fallBackImage
}: UniteBackground) => {
    if (!backgroundMedia && !fallBackImage) return null
    return (
        <div className={c.uniteBackgroundVideo}>
            <VideoFilePlayer
                videos={[backgroundMedia]}
                className={s['video-banner']}
                fallbackImgUrl={fallBackImage?.file.url}
            />
        </div>
    )
}
