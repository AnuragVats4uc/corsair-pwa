import { Button } from '@corratech/pylot-ui'
import Image from '@corratech/corsair-image'
import { UniteYourSetup } from './types'
import s from './Unite.module.scss'
import cn from 'classnames'

type UniteCta = {
    uniteCta?: UniteYourSetup
}

const c = /*twc*/ {
    uniteCtaContainer: `z-30 relative w-full flex justify-center`,
    uniteCtaContainerVideo: `flex justify-center w-full`,
    uniteCtaInnerVideo: `${s['unite-cta-inner-video']} flex items-center justify-center`,
    uniteCtaButton: `${s['unite-cta-button']} cursor-pointer  w-full`,
    uniteLogoContainer: s['unite-logo-container'],
    uniteCtaLogo: `${s['unite-logo-cta']} relative`,
    uniteCtaText: `${s['unite-cta-text']} font-aktivGrotesk font-medium md:font-semibold inline-block`
}

export const UniteCTA = ({ uniteCta }: UniteCta) => {
    const position = uniteCta?.ctaLocation
        ?.toLocaleLowerCase()
        .replace(' ', '-')
    const dekstopVideo =
        uniteCta?.desktopImageVideo?.file.contentType.split('/')[0] === 'video'
    const dekstopImage =
        uniteCta?.desktopImageVideo?.file.contentType.split('/')[0] === 'image'
    const backgroundImage =
        uniteCta?.backgroundImage?.file.contentType.split('/')[0] === 'image'
    return (
        <div
            className={cn(
                dekstopVideo &&
                    cn(
                        c.uniteCtaContainerVideo,
                        s[`unite-cta-container-video-${position}`]
                    ),
                backgroundImage &&
                    cn(
                        c.uniteCtaContainerVideo,
                        s[`unite-cta-container-video-${position}`]
                    ),
                dekstopImage &&
                    cn(
                        c.uniteCtaContainer,
                        s[`unite-cta-container-${position}`]
                    ),
                !uniteCta?.ctaLocation && s['unite-cta-container-video'],
                !uniteCta?.desktopImageVideo &&
                    cn(
                        c.uniteCtaContainerVideo,
                        s[`unite-cta-container-video-${position}`]
                    )
            )}
        >
            {uniteCta?.ctaButton?.url && (
                <Button className={c.uniteCtaButton}>
                    <a
                        href={uniteCta.ctaButton.url}
                        target={
                            uniteCta.ctaButton.openInANewTab
                                ? '_blank'
                                : '_self'
                        }
                        rel="noopener noreferrer"
                        className={c.uniteCtaInnerVideo}
                    >
                        <div className={c.uniteLogoContainer}>
                            <div className={c.uniteCtaLogo}>
                                {uniteCta?.ctaButton?.image?.file.url && (
                                    <Image
                                        src={
                                            uniteCta?.ctaButton?.image?.file
                                                ?.url
                                        }
                                        alt={
                                            uniteCta?.ctaButton?.image
                                                ?.description
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                        </div>
                        <p
                            className={c.uniteCtaText}
                            dangerouslySetInnerHTML={{
                                __html: uniteCta.ctaButton.displayText
                            }}
                        />
                    </a>
                </Button>
            )}
        </div>
    )
}
