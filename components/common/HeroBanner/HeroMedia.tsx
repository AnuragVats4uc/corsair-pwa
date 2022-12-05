import Image from 'next/image'
import s from './HeroBannerItem.module.scss'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import { BannerItemType } from '@components/common/Carousel/Carousel'
import cn from 'classnames'

export type HeroMediaPropType = {
    media: BannerItemType['desktopImageOrVideo']
    isMobile?: boolean
}

export const HeroMedia = ({ media, isMobile = false }: HeroMediaPropType) => {
    const twClasses = {
        media: {
            common: 'w-full h-full absolute top-0 left-0',
            desktop: 'hidden md:block',
            mobile: 'md:hidden'
        }
    }

    return (
        <div
            className={
                isMobile
                    ? cn(
                          s['media-mobile'],
                          twClasses.media.common,
                          twClasses.media.mobile
                      )
                    : cn(
                          s['media-desktop'],
                          twClasses.media.common,
                          twClasses.media.desktop
                      )
            }
        >
            {media?.file.contentType.startsWith('video') && (
                <VideoFilePlayer
                    videos={[media]}
                    className={cn(
                        s['slider-video'],
                        'object-cover w-full h-full object-center'
                    )}
                    fallbackImgUrl={media?.file?.url}
                />
            )}

            {media?.file.contentType.startsWith('image') && (
                <Image
                    src={media?.file?.url}
                    alt={media?.description}
                    layout="fill"
                    objectFit="cover"
                />
            )}
        </div>
    )
}
