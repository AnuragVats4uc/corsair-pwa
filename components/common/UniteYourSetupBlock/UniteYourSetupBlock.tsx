import Skeleton from 'react-loading-skeleton'
import { UniteYourSetup } from './types'
import { UniteBackground } from './UniteBackground'
import { UniteCTA } from './UniteCTA'
import { UniteTopSection } from './UniteTopSection'
import { UniteVideo } from './UniteVideo'
import s from './Unite.module.scss'
import { VideoType } from '@pylot-data/hooks/contentful/use-content-json'
import { JsonToCss } from '../HeroBanner/Util/JsonToCss'
import cn from 'classnames'
type Props = {
    content: UniteYourSetup
}

const c = /*twc*/ {
    uniteContainer: `${s['unite-container']} max-w-screen min-h-screen overflow-hidden relative z-0`
}

const UniteYourSetupBlock = ({ content }: Props) => {
    if (!content) return <Skeleton height="35vw" />
    const stylesDesktop = {
        ...(content?.desktopPaddingTop && {
            'padding-top': `${content?.desktopPaddingTop}rem;`
        }),
        ...(content?.desktopPaddingBottom && {
            'padding-bottom': `${content?.desktopPaddingBottom}rem;`
        })
    }

    const stylesMobile = {
        ...(content?.mobilePaddingTop && {
            'padding-top': `${content?.mobilePaddingTop}rem;`
        }),
        ...(content?.mobilePaddingBottom && {
            'padding-bottom': `${content?.mobilePaddingBottom}rem;`
        })
    }

    const paddingsClassheading =
        content?.heading &&
        content.heading?.replace(/\s+/g, '') &&
        'UniteYourSetup'

    return (
        <div
            className={cn(
                c.uniteContainer,
                `verticalPaddings-${paddingsClassheading}`
            )}
        >
            <style jsx>{` 
                    @media screen and (min-width: 768px){
                        .verticalPaddings-${paddingsClassheading} ${JsonToCss(
                stylesDesktop
            )}
                    }
                    @media screen and (max-width: 767px) {                               
                        .verticalPaddings-${paddingsClassheading} ${JsonToCss(
                stylesMobile
            )}
                    }`}</style>

            <UniteVideo
                backgroundMedia={content.desktopImageVideo as VideoType}
                fallBackImage={content?.backgroundImage}
            />
            <UniteTopSection uniteContent={content} />
            {content?.desktopImageVideo?.file.contentType.split('/')[0] ===
                'image' && (
                <UniteBackground
                    backgroundMedia={content.desktopImageVideo.file}
                />
            )}
            {content.ctaLocation !== 'Top' && <UniteCTA uniteCta={content} />}
        </div>
    )
}

export default UniteYourSetupBlock
