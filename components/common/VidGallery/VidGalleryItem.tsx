import { FC, useState } from 'react'
import s from './VidGallery.module.scss'
import Image from '@corratech/corsair-image'
import { PopupVideoPlayer } from '@components/common/Banner23Tile/Banner2Tile/PopupVideoPlayer'
import type { BannerItemType } from '../Carousel/Carousel'
import { VidGalleryTextAlignments } from './VidGallery'
import Modal from '@corratech/pylot-ui/src/Modal/Modal'
import { ClickOutside } from '@corratech/pylot-utils'
import PlayButton from './PlayButton'

interface VidGalleryItemProps {
    textOnVideo: VidGalleryTextAlignments
    bannerItem: BannerItemType
    darkMode?: boolean
}

export const VidGalleryItem: FC<VidGalleryItemProps> = ({
    darkMode,
    textOnVideo,
    bannerItem
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const thumbnail = bannerItem?.background?.file?.url || ''
    const desktopUrl = bannerItem?.desktopImageOrVideo?.file?.url || ''
    const mobileUrl = bannerItem?.mobileImageOrVideo?.file?.url || ''
    const desktopDescription = bannerItem?.desktopImageOrVideo?.description
    const mobileDescription = bannerItem?.mobileImageOrVideo?.description || ''
    const videourl = bannerItem?.ctaButton?.url || ''

    const { heading, subHeading, ctaButton } = bannerItem
    const wordsOnVideo =
        textOnVideo === VidGalleryTextAlignments.ON ? true : false
    const headingColor = darkMode ? '#FFF' : '#000'
    const subHeadingColor = darkMode ? '#d1d5db' : '#232323'
    const innerContent = (
        <>
            <div
                className={
                    wordsOnVideo
                        ? s['extra-info-container-on']
                        : s['extra-info-container-below']
                }
            >
                {ctaButton && ctaButton.url && (
                    <div className={s['cta']}>
                        <PlayButton className={s['play-button']} />
                    </div>
                )}
            </div>
            {thumbnail && (
                <div className="hidden md:block">
                    <Image
                        src={thumbnail}
                        alt={desktopDescription}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
            {(mobileUrl || thumbnail) && (
                <div className="block md:hidden">
                    <Image
                        src={mobileUrl || thumbnail}
                        alt={mobileDescription || desktopDescription}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
        </>
    )

    const outerContent = (
        <>
            <a
                rel="noreferrer"
                href={videourl}
                onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(true)
                }}
                className="hidden md:block"
            >
                {innerContent}
            </a>
            <a
                target="_blank"
                rel="noreferrer"
                className="block md:hidden"
                href={videourl}
            >
                {innerContent}
            </a>
        </>
    )

    return (
        <>
            {wordsOnVideo ? (
                <div className={s['image-container-on']}>
                    {outerContent}
                    <h2 className={s['heading-on']}>{heading}</h2>
                </div>
            ) : (
                <div className={s['info-container']}>
                    <div className={s['image-container-below']}>
                        {outerContent}
                    </div>
                    <div className={s['text-container-below']}>
                        <h2
                            className={s['heading-below']}
                            style={{ color: headingColor }}
                        >
                            {heading}
                        </h2>
                        <p
                            className={s['sub-heading']}
                            style={{ color: subHeadingColor }}
                        >
                            {subHeading}
                        </p>
                    </div>
                </div>
            )}

            <ClickOutside active={isOpen} onClick={() => setIsOpen(false)}>
                <div>
                    <Modal
                        className={s['vidgallery-item-modal']}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        focusFirst={false}
                    >
                        <PopupVideoPlayer videourl={desktopUrl} />
                    </Modal>
                </div>
            </ClickOutside>
        </>
    )
}
