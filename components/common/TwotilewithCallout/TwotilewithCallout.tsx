import { FC, useRef } from 'react'
import cn from 'classnames'
import s from './TwotilewithCallout.module.scss'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import TwotilewithCalloutMedia from './TwotilewithCalloutMedia'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import {
    IcalloutContent,
    TwotilewithCalloutItem
} from './TwotilewithCalloutItem'
import { JsonToCss } from '../HeroBanner/Util/JsonToCss'

const rightImage = 'Right-Image'

export interface ItextContain {
    heading: string
    meta: { contentType: string }
    subHeading: string
    text: string
    title: string
}

export interface TwotilewithCalloutResponse {
    calloutContent: IcalloutContent[]
    calloutTitle: string
    imagevideo: ImageType | VideoType
    mobileImagevideo?: ImageType | VideoType
    layoutPosition: string
    layoutType: string
    textContain?: ItextContain
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
    usePaddingAfterText: boolean
    useVideoAsBackgroundTileOne?: boolean
    tileOneBackgroundVideo: VideoType
    backgroundImage?: ImageType
}

interface TwotilewithCalloutProps {
    content: TwotilewithCalloutResponse
}

const c = /*twc*/ {
    shiftingLayout: `flex flex-wrap md:flex-no-wrap relative z-1`,
    blockContent: `${s['Block-Content']} md:flex-auto md:w-1/2`,
    textInfo: `pt-4 text-white leading-9 text-2xl text-center md:text-left`,
    subHeading: `${s['TextInfo-subHeading']} font-primary`,
    heading: `${s['TextInfo-Heading']} text-white font-secondary leading-none tracking-wide mb-4 md:mb-10`,
    description: `${s['TextInfo-Description']} text-white font-normal font-primary lg:pr-8`,
    callOutTitle: `${s['Callout-Title']} text-white text-xl text-center md:text-left leading-6 mb-2`
}

const TwotilewithCallout: FC<TwotilewithCalloutProps> = ({ content }) => {
    /**
     * Animation Ref
     */
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)

    if (!content) {
        return null
    }

    /**
     * Props and Varialbes
     */
    const { textContain } = content
    const bgVideo = content?.tileOneBackgroundVideo
    const checkMedia = content?.imagevideo
    const checkMediaMobile = content?.mobileImagevideo
    const bgVideoUrl = [bgVideo]
    const { layoutPosition, layoutType } = content
    const layoutPos =
        layoutPosition === rightImage ? 'flex-row' : 'flex-row-reverse'
    const layoutTyp =
        layoutType === 'Content-Width' ? 'Content-Width' : 'Content-Full-Width'

    const bgImage = content?.backgroundImage

    const containerProps = {
        checkMedia,
        checkMediaMobile
    }

    const styles = {
        background: `url("${bgImage?.file.url}") 100% 100% repeat fixed`,
        backgroundSize: '42px 68px'
    }

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
        content?.textContain?.heading &&
        content.textContain.heading?.replace(/\s+/g, '') &&
        'TwotilewithCallout'

    return (
        <div
            className={cn(s['Twotile-WithCallout'], 'box-border relative')}
            style={bgImage && styles}
        >
            <div
                className={cn(
                    bgImage ? s['Background-Gradient'] : '',
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

                <div className={cn(c.shiftingLayout, layoutPos, s[layoutTyp])}>
                    <div
                        className={cn(c.blockContent, s['has-animate'], {
                            [s['onScreen']]: isOnScreen
                        })}
                        ref={animateRef}
                    >
                        <div
                            className={cn(
                                s[
                                    layoutTyp +
                                        '-Block-Wrapper-' +
                                        layoutPosition
                                ],
                                'h-full flex flex-col justify-center'
                            )}
                        >
                            {content?.textContain && (
                                <div className={c.textInfo}>
                                    <h6 className={c.subHeading}>
                                        {textContain?.subHeading}
                                    </h6>
                                    <h2 className={c.heading}>
                                        {textContain?.heading}
                                    </h2>
                                    <p className={c.description}>
                                        {textContain?.text}
                                    </p>
                                </div>
                            )}
                            {content?.calloutContent.length && (
                                <div
                                    className={cn(
                                        s['Block-Callouts'],
                                        'text-center md:text-left',
                                        content.usePaddingAfterText
                                            ? s['space-between-xl']
                                            : s['space-between-lg']
                                    )}
                                >
                                    {content?.usePaddingAfterText && (
                                        <div className={c.callOutTitle}>
                                            {content?.calloutTitle}
                                        </div>
                                    )}
                                    {content?.calloutContent.map((d) => (
                                        <TwotilewithCalloutItem
                                            key={d.heading1}
                                            heading1={d.heading1}
                                            heading2={d.heading2}
                                            description={d.description}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {content?.imagevideo && (
                        <div
                            className={cn(
                                s['Image-Content'],
                                'md:flex-auto md:w-1/2',
                                s['has-animate-image'],
                                { [s['onScreen']]: isOnScreen }
                            )}
                        >
                            <div
                                className={cn(
                                    s['Image-Wrapper'],
                                    'flex h-full items-center relative',
                                    checkMediaMobile ? 'mobile' : 'desktop',
                                    layoutType === 'Content-Full' &&
                                        'justify-center md:justify-start',
                                    layoutPosition === 'Left-Image'
                                        ? 'justify-center md:justify-end'
                                        : 'justify-center md:justify-start'
                                )}
                            >
                                <TwotilewithCalloutMedia {...containerProps} />
                            </div>
                        </div>
                    )}
                </div>
                {content?.useVideoAsBackgroundTileOne && bgVideo && (
                    <div
                        className={cn(
                            s[layoutPosition + '-Background-Video'],
                            'absolute inset-0 hidden md:block w-full'
                        )}
                    >
                        <VideoFilePlayer
                            videos={bgVideoUrl}
                            className={cn(
                                s['slider-video'],
                                'object-content w-full h-full px-8 object-center'
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TwotilewithCallout
