import { FC } from 'react'
import ChevronRightBanner from '@components/icons/ChevronRightBanner'
import Image from '@corratech/corsair-image'
import { Banner3TileImageProps } from '../types'

import s from './Banner3Tile.module.scss'

const Banner3TileImage: FC<Banner3TileImageProps> = ({
    bannerItem,
    classNameContainer = 'image-container'
}) => {
    if (!bannerItem) return null
    const desktopUrl = bannerItem?.desktopImageOrVideo?.file?.url || ''
    const mobileUrl = bannerItem?.mobileImageOrVideo?.file?.url || ''
    const desktopDescription =
        bannerItem?.desktopImageOrVideo?.description || ''
    const mobileDescription = bannerItem?.mobileImageOrVideo?.description || ''

    const { heading, subHeading, ctaButton, logo } = bannerItem

    const { openInANewTab: newTab, url: link } = ctaButton

    return (
        <a
            className={s[classNameContainer]}
            href={ctaButton.url}
            target={ctaButton.openInANewTab ? '_blank' : '_self'}
            rel="noreferrer"
        >
            <div className={s['extra-info-container']}>
                {logo && logo?.file && logo?.file?.url && (
                    <div className={s['logo-container']}>
                        <Image
                            src={logo?.file?.url}
                            alt={logo?.description}
                            width={165}
                            height={86}
                        />
                    </div>
                )}
                <div className={s['heading']}>{heading}</div>
                <div className={s['sub-heading']}>{subHeading}</div>
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
        </a>
    )
}

export default Banner3TileImage
