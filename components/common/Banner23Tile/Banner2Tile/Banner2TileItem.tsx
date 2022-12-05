import { FC, useState } from 'react'
import Image from 'next/image'
import { PopupVideoPlayer } from './PopupVideoPlayer'
import { Banner2TileItemProps } from '../types'
import { BannerTextAlignments } from './Banner2Tile'
import ChevronRightBanner from '@components/icons/ChevronRightBanner'
import Modal from '@corratech/pylot-ui/src/Modal/Modal'
import { ClickOutside } from '@corratech/pylot-utils'

import s from './Banner2Tile.module.scss'
import cn from 'classnames'

export const Banner2TileItem: FC<Banner2TileItemProps> = ({
    textAlignment,
    bannerItem,
    classNameContainer = 'image-container'
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const desktopUrl = bannerItem?.desktopImageOrVideo?.file?.url || ''
    const mobileUrl = bannerItem?.mobileImageOrVideo?.file?.url || ''
    const desktopDescription =
        bannerItem?.desktopImageOrVideo?.description || ''
    const mobileDescription = bannerItem?.mobileImageOrVideo?.description || ''
    const videourl = bannerItem?.ctaButton?.url || ''

    const { heading, subHeading, ctaButton, logo } = bannerItem

    const link = ctaButton?.url

    const innerContent = (
        <>
            <div
                className={
                    textAlignment === BannerTextAlignments.MIDDLE
                        ? s['extra-info-container-middle']
                        : s['extra-info-container-top']
                }
            >
                {logo && logo?.file && logo?.file?.url && (
                    <div className={s['logo-container']}>
                        <Image
                            src={logo?.file?.url}
                            alt={logo?.description}
                            width={
                                bannerItem?.logoWidth
                                    ? bannerItem.logoWidth
                                    : 165
                            }
                            height={
                                bannerItem?.logoHeight
                                    ? bannerItem.logoHeight
                                    : 86
                            }
                        />
                    </div>
                )}
                <h1 className={s['heading']}>{heading}</h1>
                <p className={s['sub-heading']}>{subHeading}</p>
                {ctaButton && ctaButton?.displayText && (
                    <div className={s['cta']}>
                        <p>{ctaButton?.displayText}</p>
                        <div className={s['right-arrow-wrapper']}>
                            <ChevronRightBanner />
                        </div>
                    </div>
                )}
            </div>

            {desktopUrl && (
                <div className="hidden md:block">
                    <Image
                        src={desktopUrl}
                        alt={desktopDescription}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
            {(mobileUrl || desktopUrl) && (
                <div className="block md:hidden">
                    <Image
                        src={mobileUrl || desktopUrl}
                        alt={mobileDescription || desktopDescription}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
        </>
    )

    const openInPopup = ctaButton?.openInPopup

    return (
        <>
            {openInPopup ? (
                <div className={s[classNameContainer]}>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="hidden md:block"
                    >
                        {innerContent}
                    </button>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        className="block md:hidden"
                        href={videourl}
                    >
                        {innerContent}
                    </a>
                </div>
            ) : (
                <a className={s[classNameContainer]} href={link}>
                    {innerContent}
                </a>
            )}
            <ClickOutside active={isOpen} onClick={() => setIsOpen(false)}>
                <div>
                    <Modal
                        className={cn(
                            s['banneritem-modal'],
                            'w-full h-full overflow-hidden fixed inset-0 scrolling-touch flex items-center'
                        )}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        focusFirst={false}
                    >
                        <PopupVideoPlayer videourl={videourl} />
                    </Modal>
                </div>
            </ClickOutside>
        </>
    )
}
