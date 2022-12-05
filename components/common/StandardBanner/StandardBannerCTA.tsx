import React from 'react'
import { CTA } from '@components/common/CTA'
import cn from 'classnames'
import s from './StandardBanner.module.scss'
import { StandardBannerResponse } from './StandardBanner'

export type StandardBannerCTAProps = {
    content: StandardBannerResponse
}

const c = /*tw*/ {
    standardBannerCTA: `${s['standard-banner-cta']}`,
    StandardBannerCTAButton: `standardBannerCTAButton`
}

export const StandardBannerCTA = ({
    content
}: StandardBannerCTAProps): JSX.Element => {
    const position = content.ctaLocation?.toLocaleLowerCase().replace(' ', '-')
    const typeVideo =
        content?.desktopImageVideo?.file.contentType.split('/')[0] === 'video'
    const typeImage =
        content?.desktopImageVideo?.file.contentType.split('/')[0] === 'image'
    return (
        <div className={c.standardBannerCTA}>
            <CTA
                cta={content.ctaButton}
                className={cn(
                    c.StandardBannerCTAButton,
                    {
                        [s[
                            `standard-banner-cta-button-background-${position}`
                        ]]:
                            content?.backgroundImage &&
                            content?.desktopImageVideo
                    },
                    {
                        [s[
                            `standard-banner-cta-button-background-${position}`
                        ]]: content?.backgroundImage
                    },
                    {
                        [s[`standard-banner-cta-button-${position}`]]:
                            !content?.backgroundImage && typeVideo
                    },
                    {
                        [s[`standard-banner-cta-button-image-${position}`]]:
                            !content?.backgroundImage && typeImage
                    }
                )}
            />
        </div>
    )
}
