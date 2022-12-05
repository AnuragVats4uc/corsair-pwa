import { FC } from 'react'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import s from './TwotilewithCallout.module.scss'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'

export interface TwotilewithCalloutMediaProps {
    checkMedia: ImageType | VideoType
    checkMediaMobile?: ImageType | VideoType
}
export const TwotilewithCalloutMedia: FC<TwotilewithCalloutMediaProps> = ({
    checkMedia,
    checkMediaMobile
}) => {
    return (
        <>
            <div
                className={cn(
                    checkMediaMobile ? s['showDesktop'] : s['showMobile']
                )}
            >
                {getImageVideoDesktop(checkMedia)}
            </div>
            {checkMediaMobile && (
                <div className={cn(s['hideDesktop'])}>
                    {getImageVideoMobile(checkMediaMobile)}
                </div>
            )}
        </>
    )
}

const checMediaImage = (imageCheck: ImageType | VideoType) => {
    let imageMedia
    if ('image' in imageCheck?.file?.details) {
        imageMedia = imageCheck?.file?.details?.image
    }

    return imageMedia
}

const getImageVideoDesktop = (checkMedia: ImageType | VideoType) => {
    const VIDEO = checkMedia?.file?.contentType.split('/')[0]
    const imageCheck = checMediaImage(checkMedia)

    if (VIDEO === 'video') {
        const videoArray = [checkMedia]
        return (
            <VideoFilePlayer
                videos={videoArray}
                className={cn(
                    'object-content w-full h-full px-8 object-center'
                )}
                fallbackImgUrl={videoArray[0]?.file.url}
            />
        )
    }
    return (
        <Image
            className={cn(s['border-rounded'])}
            alt={checkMedia?.description}
            src={checkMedia?.file?.url}
            width={imageCheck?.width}
            height={imageCheck?.height}
        />
    )
}
const getImageVideoMobile = (checkMediaMobile: ImageType | VideoType) => {
    const VIDEOMOBILE = checkMediaMobile?.file?.contentType.split('/')[0]
    const imageCheckMobile = checMediaImage(checkMediaMobile)

    if (VIDEOMOBILE === 'video') {
        const videoArrayMobile = [checkMediaMobile]
        return (
            <VideoFilePlayer
                videos={videoArrayMobile}
                className={cn(
                    'object-content w-full h-full px-8 object-center'
                )}
                fallbackImgUrl={videoArrayMobile[0]?.file.url}
            />
        )
    }
    return (
        <Image
            className={cn(s['border-rounded'])}
            alt={checkMediaMobile?.description}
            src={checkMediaMobile?.file?.url}
            width={imageCheckMobile?.width}
            height={imageCheckMobile?.height}
        />
    )
}

export default TwotilewithCalloutMedia
