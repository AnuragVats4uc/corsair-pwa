import { useRef } from 'react'
import { BlockProps } from './types'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import Image from '@corratech/corsair-image'
import Skeleton from 'react-loading-skeleton'
import { JsonToCss } from '../HeroBanner/Util/JsonToCss'
import s from './block.module.scss'
import cn from 'classnames'
import VideoFilePlayer from '../Carousel/VideoFilePlayer'
import { isMobile } from '../VerticalTabsSection/VerticalTabsSection'

const c = /*twc*/ {
    mainblock: `${s['main-block']} relative overflow-hidden flex flex-col flex-wrap items-center justify-start z-0`,
    largeScreen: `${s['large-screen']} z-0 w-full absolute top-0 left-0 invisible pointer-events-none bg-cover h-full md:visible`,
    header: `${s['header']} z-10 relative max-w-full flex`,
    innerHeader1: `${s['inner-header-1']} w-full mx-auto`,
    heading: `${s['heading']} w-full text-center opacity-100 uppercase text-white space-y-1 font-bebasNeueExtraBold`,
    mobileScreen: `${s['mobile-screen']} z-10 relative flex justify-center md:hidden`,
    image: `${s['image']} w-screen max-w-full h-full block`
}
type Props = {
    content: BlockProps
}
const Block = ({ content }: Props) => {
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)
    const { heading, subHeading } = content
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
        (heading && heading?.replace(/\s+/g, '')) ?? 'BlockImage'

    const isBackgroundTypeVideo = isMobile()
        ? content?.mobileImageVideo?.file.contentType.split('/')[0] === 'video'
        : content?.desktopImageVideo?.file.contentType.split('/')[0] === 'video'

    const renderVideoBackground = (): JSX.Element => (
        <div className="w-full h-full sm:absolute  flex items-center justify-center ">
            {content?.mobileImageVideo && (
                <div className="sm:hidden h-full">
                    <VideoFilePlayer videos={[content.mobileImageVideo]} />
                </div>
            )}
            {content?.desktopImageVideo && (
                <div className="hidden sm:block">
                    <VideoFilePlayer videos={[content.desktopImageVideo]} />
                </div>
            )}
        </div>
    )

    const renderImageBackground = (): JSX.Element => (
        <div className={c.mobileScreen}>
            {content?.mobileImageVideo?.file.url && (
                <div className={c.image}>
                    <Image
                        src={content?.mobileImageVideo.file.url}
                        alt={content?.mobileImageVideo.description}
                        layout="responsive"
                        width="100"
                        height="62"
                        objectFit="cover"
                    />
                </div>
            )}
            {!content?.mobileImageVideo &&
                content?.desktopImageVideo?.file.url && (
                    <div className={c.image}>
                        <Image
                            src={content?.desktopImageVideo?.file.url}
                            alt={content?.desktopImageVideo?.description}
                            layout="responsive"
                            width="100"
                            height="62"
                            objectFit="cover"
                        />
                    </div>
                )}
        </div>
    )

    return (
        <section>
            <div
                className={cn(
                    c.mainblock,
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
                <div
                    style={{
                        backgroundImage: `url(${content?.desktopImageVideo?.file?.url})`
                    }}
                    className={c.largeScreen}
                />
                <div
                    className={cn(
                        c.header,
                        isBackgroundTypeVideo
                            ? s['header-spacing-video']
                            : s['header-spacing-image']
                    )}
                >
                    <div className={c.innerHeader1}>
                        <div className="text-center">
                            <div
                                className={cn(
                                    s['inner-header-3'],
                                    s['has-animate'],
                                    { [s['onScreen']]: isOnScreen }
                                )}
                                ref={animateRef}
                            >
                                <h2 className={c.heading}>
                                    {heading && (
                                        <span className={s['span-1']}>
                                            {heading}
                                        </span>
                                    )}
                                    {subHeading && (
                                        <span className={s['span-2']}>
                                            {subHeading}
                                        </span>
                                    )}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                {isBackgroundTypeVideo
                    ? renderVideoBackground()
                    : renderImageBackground()}
            </div>
        </section>
    )
}
export default Block
