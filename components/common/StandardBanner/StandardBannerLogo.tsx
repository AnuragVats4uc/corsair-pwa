import React from 'react'
import Image from '@corratech/corsair-image'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

import s from './StandardBanner.module.scss'

export type StandardBannerLogoProps = {
    logo: ImageType
    logoHeight?: string
    logoWidth?: string
}

const c = /*tw*/ {
    standardBannerLogo: `${s['standard-banner-logo']} relative standardBannerLogo`
}

export const StandardBannerLogo = ({
    logo,
    logoWidth,
    logoHeight
}: StandardBannerLogoProps): JSX.Element => {
    return (
        <div className={c.standardBannerLogo}>
            <Image
                src={logo?.file?.url}
                alt={logo?.description}
                objectFit="contain"
                width={
                    logoWidth ? logoWidth : logo?.file?.details?.image?.width
                }
                height={
                    logoWidth ? logoHeight : logo?.file?.details?.image?.height
                }
            />
        </div>
    )
}
