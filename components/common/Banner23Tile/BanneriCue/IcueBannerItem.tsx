import { FC } from 'react'
import Image from 'next/image'
import ChevronRightBanner from '@components/icons/ChevronRightBanner'
import { IcueBannerItemProps } from '../types'

import s from './BanneriCue.module.scss'

export const IcueBannerItem: FC<IcueBannerItemProps> = ({
    bannerItem
}): JSX.Element => {
    const desktopUrl = bannerItem?.desktopImageOrVideo?.file?.url || ''
    const mobileUrl = bannerItem?.mobileImageOrVideo?.file?.url || ''
    const desktopDescription =
        bannerItem?.desktopImageOrVideo?.description || ''
    const mobileDescription = bannerItem?.mobileImageOrVideo?.description || ''

    const { heading, subHeading, ctaButton, logo } = bannerItem
    const link = ctaButton?.url

    const innerContent = (
        <>
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
                <h1 className={s['heading']}>{heading}</h1>
                <p className={s['sub-heading']}>{subHeading}</p>
                {ctaButton && ctaButton?.displayText && (
                    <a href={link} className={s['cta']}>
                        <p>{ctaButton?.displayText}</p>
                        <div className={s['right-arrow-wrapper']}>
                            <ChevronRightBanner />
                        </div>
                    </a>
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

    const logodiv = logo?.file?.url
    return (
        <div className={logodiv ? s['inner-content-logo'] : s['inner-content']}>
            {innerContent}
        </div>
    )
}

export default IcueBannerItem
