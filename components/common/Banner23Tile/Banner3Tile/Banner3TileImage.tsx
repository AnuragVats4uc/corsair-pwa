import { FC } from 'react'
import ChevronRightBanner from '@components/icons/ChevronRightBanner'
import Image from '@corratech/corsair-image'
import { Banner3TileImageProps } from '../types'

import s from './Banner3Tile.module.scss'

const Banner3TileImage: FC<Banner3TileImageProps> = ({
    bannerItem,
    classNameContainer = 'image-container'
}) => {
    const url = bannerItem?.desktopImageOrVideo?.file?.url || ''
    const description = bannerItem?.desktopImageOrVideo?.description || ''

    const { heading, subHeading, ctaButton } = bannerItem

    const { openInANewTab: newTab, url: link } = ctaButton

    return (
        <a
            className={s[classNameContainer]}
            href={link}
            target={newTab ? '_blank' : '_self'}
            rel="noreferrer"
        >
            <div className={s['extra-info-container']}>
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

            <Image
                src={url}
                alt={description}
                layout="fill"
                objectFit="cover"
            />
        </a>
    )
}

export default Banner3TileImage
