import React from 'react'
import Image from '@corratech/corsair-image'
import { Icon } from './StandardBanner'

import s from './StandardBanner.module.scss'

export type StandardBannerIconsBlockProps = {
    icons: [Icon]
}

const c = /*tw*/ {
    standardBannerIconsBlock: `${s['standard-banner-iconsBlock']} flex flex-col justify-center standardBannerIconsBlock`,
    standardBannerIcon: `${s['standard-banner-icon']} flex relative justify-center items-center standardBannerIcon`
}

export const StandardBannerIconsBlock = ({
    icons
}: StandardBannerIconsBlockProps): JSX.Element => {
    return (
        <div className={c.standardBannerIconsBlock}>
            {icons?.map((icon) => (
                <div className={c.standardBannerIcon} key={icon?.title}>
                    <Image
                        src={icon?.image?.file?.url}
                        alt={icon?.image?.description}
                        objectFit="contain"
                        width={icon?.image?.file?.details?.image?.width}
                        height={icon?.image?.file?.details?.image?.height}
                    />
                    <p>{icon?.title}</p>
                </div>
            ))}
        </div>
    )
}
