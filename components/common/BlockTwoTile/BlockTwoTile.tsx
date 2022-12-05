import { useEffect, useRef } from 'react'
import BlockTwoTileMedia from './BlockTwoTileMedia'
import { BlockTwoTileContent } from './BlockTwoTileContent'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import { BlockTwoTileResponse } from './BlockTwoTileTypes'
import { useMediaQuery } from '@lib/hooks/useMediaQuery'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import { JsonToCss } from '../HeroBanner/Util/JsonToCss'
import s from './BlockTwoTile.module.scss'
import cn from 'classnames'

interface BlockTwoTileProps {
    content: BlockTwoTileResponse
}

const c = /*tw*/ {
    bgImageClasses: 'flex flex-wrap pt-0',
    layoutLeft:
        'flex flex-col-reverse items-center md:flex-row md:flex-wrap lg:flex-row lg:items-start',
    layoutRight: 'flex flex-col-reverse items-center lg:flex-row-reverse',
    disclaimerBlock: `
        ${s['info-disclaimer']}
        font-aktivGrotesk font-light text-white my-2 text-center lg:text-left
`
}

export const leftImage = 'ImageLeft'

export const BlockTwoTile = ({ content }: BlockTwoTileProps) => {
    const animateRef = useRef(null)
    const { layoutPosition, useImageAsBackground, layoutType } = content
    const { isOnScreen } = useOnScreen(animateRef, content.animation)
    const checkMedia = content?.imagevideo
    const gradient = content?.colorCodeGradient
    const bgImage = content?.backgroundImage
    const imageWidth = content?.imageWidth
    const imageHeight = content?.imageHeight
    const styles = {
        backgroundImage: `url("${bgImage?.file.url}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
    const containerProps = {
        layoutPosition,
        checkMedia,
        layoutType,
        imageWidth,
        imageHeight
    }

    const matches = useMediaQuery('(min-width: 1024px)')
    const matchesDesktop = useMediaQuery('(min-width: 768px)')

    useEffect(() => {
        const onScroll = () => {
            const blockTwoTileMedia = document.getElementById(
                'blockTwoTileMedia'
            )
            const blockTwoTileMediaRect = blockTwoTileMedia?.getBoundingClientRect()

            if (
                blockTwoTileMedia &&
                blockTwoTileMediaRect &&
                content?.animation &&
                matches
            ) {
                if (blockTwoTileMediaRect?.top <= screen.availHeight / 2) {
                    blockTwoTileMedia.classList.add(s['blockOnScreen'])
                }

                if (
                    blockTwoTileMediaRect?.top > screen.availHeight / 2 ||
                    blockTwoTileMediaRect?.top < 0
                ) {
                    blockTwoTileMedia.classList.remove(s['blockOnScreen'])
                }
            }
        }

        if (typeof window !== undefined) {
            window.addEventListener('scroll', onScroll)
        }

        return () => {
            if (typeof window !== undefined) {
                window.removeEventListener('scroll', onScroll)
            }
        }
    }, [])

    if (!content) {
        return null
    }

    const stylesDesktop = {
        ...(content?.desktopPaddingTop && {
            'padding-top': `${content?.desktopPaddingTop}rem !important;`
        }),
        ...(content?.desktopPaddingBottom && {
            'padding-bottom': `${content?.desktopPaddingBottom}rem !important;`
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

    const bgImg = useImageAsBackground ? styles : { background: gradient }
    const paddingsClassheading =
        (content?.heading && content.heading?.replace(/\s+|,/g, '')) ??
        'BlockTwoTile'

    const enableBackground = content.pageBackgroundImage ? {} : bgImg

    return (
        <div
            className={cn(
                `relative h-full py-20 overflow-hidden lg:overflow-visible verticalPaddings-${paddingsClassheading}`
            )}
            style={enableBackground}
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
            {bgImage?.file.contentType.startsWith('video') && (
                <VideoFilePlayer
                    videos={[bgImage]}
                    className={cn(
                        s['slider-video'],
                        c.bgImageClasses,
                        'lg:items-center object-cover absolute top-0 left-0;'
                    )}
                    fallbackImgUrl={bgImage?.file?.url}
                />
            )}

            <div
                className={cn(
                    s['background-image'],
                    c.bgImageClasses,
                    layoutPosition === leftImage ? c.layoutLeft : c.layoutRight,
                    'lg:items-center',
                    {
                        [s['has-animate']]: content.animation,
                        [s['onScreen']]: isOnScreen
                    }
                )}
                ref={animateRef}
            >
                <div
                    className={cn(
                        {
                            [s[matches ? 'blockTwoTileMedia' : '']]:
                                content?.animation,
                            [s['sticky-position']]: content?.animation
                        },
                        `w-full md:w-6/12 lg:w-1/2`,
                        content?.frame ? 'block' : 'flex justify-center'
                    )}
                    id="blockTwoTileMedia"
                >
                    {checkMedia && (
                        <BlockTwoTileMedia
                            {...containerProps}
                            mediaFrame={content.imagevideoFrame}
                            frameEnabled={content.frame}
                        />
                    )}
                </div>
                <BlockTwoTileContent content={content} />
            </div>
        </div>
    )
}

export default BlockTwoTile
