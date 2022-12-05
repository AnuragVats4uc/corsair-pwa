import Image from 'next/image'
import s from './Slide.module.scss'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import { BannerItemType } from '@components/common/Carousel/Carousel'
import cn from 'classnames'
import { ChevronRight } from 'react-feather'

const getSlide = (
    media: BannerItemType['desktopImageOrVideo'],
    isMobile: boolean
) => {
    return (
        <div className={isMobile ? s['media-mobile'] : s['media-desktop']}>
            {media?.file.contentType.startsWith('video') && (
                <VideoFilePlayer
                    videos={[media]}
                    className={s['slider-video']}
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

const Slide = ({ content }: { content: BannerItemType }): JSX.Element => {
    const {
        heading,
        subHeading,
        ctaButton,
        logo,
        desktopImageOrVideo,
        mobileImageOrVideo
    } = content

    return (
        <div
            //Image container must have position relative
            className={cn(
                s['slider-container'],
                'relative block w-full overflow-hidden h-full'
            )}
        >
            <div
                className={cn(
                    s['extra-info-container'],
                    'w-full absolute z-5 bottom-0 text-white'
                )}
            >
                <div>
                    {logo?.file?.url && (
                        <>
                            <div className={s['logo-wrapper-mobile']}>
                                <Image
                                    src={logo?.file?.url}
                                    alt={logo?.description}
                                    width={
                                        content?.logoWidth
                                            ? content.logoWidth
                                            : logo?.file?.details?.image?.width
                                    }
                                    height={
                                        content?.logoHeight
                                            ? content.logoHeight
                                            : logo?.file?.details?.image?.height
                                    }
                                />
                            </div>
                            <div className={s['logo-wrapper-desktop']}>
                                <Image
                                    src={logo?.file?.url}
                                    alt={logo?.description}
                                    width={
                                        content?.logoWidth
                                            ? content.logoWidth
                                            : logo?.file?.details?.image?.width
                                    }
                                    height={
                                        content?.logoHeight
                                            ? content.logoHeight
                                            : logo?.file?.details?.image?.height
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>

                <div
                    role="heading"
                    aria-level={3}
                    className={cn(s['heading'], 'uppercase font-bebasNeue')}
                >
                    {heading}
                </div>
                <div
                    className={cn(
                        s['sub-heading'],
                        'font-aktivGrotesk font-medium w-4/5'
                    )}
                >
                    {subHeading}
                </div>
                {ctaButton && ctaButton?.displayText && (
                    <div className={cn(s['cta'], 'block font-aktivGrotesk')}>
                        <a href={ctaButton?.url}>
                            {ctaButton?.displayText}
                            <ChevronRight size={15} />
                        </a>
                    </div>
                )}
            </div>
            {mobileImageOrVideo && getSlide(mobileImageOrVideo, true)}
            {desktopImageOrVideo && getSlide(desktopImageOrVideo, false)}
        </div>
    )
}

export default Slide
