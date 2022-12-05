import React, { useRef } from 'react'
import { UniteYourSetup } from './types'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import Image from '@corratech/corsair-image'
import s from './Unite.module.scss'
import cn from 'classnames'
import { UniteCTA } from './UniteCTA'

type Props = {
    uniteContent: UniteYourSetup
}

const c = /*twc*/ {
    uniteInner: `${s['unite-inner']} w-full flex flex-col justify-center items-center overflow-hidden z-20 md:justify-start lg:overflow-visible mb-4`,
    uniteInnerSection: `${s['unite-inner-section']} relative flex z-20 md:w-9/12`,
    uniteInnerContainer: `${s['unite-inner-container']} w-full mx-auto`,
    uniteLogo: `relative mx-auto`,
    uniteLogoVideo: `${s['unite-logo-video']} relative mx-auto`,
    uniteHeader: `${s['unite-header']} w-full text-center uppercase font-bebasNeueExtraBold font-bold md:font-semibold text-white`,
    uniteBody: `${s['unite-body']} w-full text-center font-aktivGrotesk font-normal text-white`
}

export const UniteTopSection = ({ uniteContent }: Props) => {
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)
    return (
        <div className={c.uniteInner}>
            <div className={c.uniteInnerSection}>
                <div className={c.uniteInnerContainer}>
                    <div className="text-center">
                        <div
                            className={cn(s['has-animate'], {
                                [s['onScreen']]: isOnScreen
                            })}
                            ref={animateRef}
                        >
                            <div
                                className={cn(
                                    uniteContent.desktopImageVideo &&
                                        c.uniteLogoVideo,
                                    !uniteContent.desktopImageVideo &&
                                        cn(c.uniteLogo, s['unite-logo'])
                                )}
                            >
                                {uniteContent?.logo?.file?.url && (
                                    <Image
                                        src={uniteContent.logo.file.url}
                                        alt={uniteContent.logo.description}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            {uniteContent.heading && (
                                <h1
                                    className={c.uniteHeader}
                                    dangerouslySetInnerHTML={{
                                        __html: uniteContent.heading
                                    }}
                                />
                            )}

                            {uniteContent.text && (
                                <p
                                    className={c.uniteBody}
                                    dangerouslySetInnerHTML={{
                                        __html: uniteContent.text
                                    }}
                                />
                            )}
                            {uniteContent.ctaLocation === 'Top' && (
                                <UniteCTA uniteCta={uniteContent} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
