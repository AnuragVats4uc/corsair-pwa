import { VFC, useState } from 'react'
import { Smal2TileWToggleProp } from '../types'
import { ImagesBlock, TextBlock, ToggleButton } from '../'
import { JsonToCss } from '../../HeroBanner/Util/JsonToCss'
import cn from 'classnames'
import s from '../Smal2Tile.module.scss'

const Smal2TileMobile: VFC<Smal2TileWToggleProp> = ({ content }) => {
    const { isMobileToggleTop } = content
    return (
        <div className="flex flex-col">
            <TextBlock content={content} />
            <div
                className={cn(
                    'flex',
                    isMobileToggleTop ? 'flex-col' : 'flex-col-reverse'
                )}
            >
                <ToggleButton content={content} />
                <ImagesBlock content={content} />
            </div>
        </div>
    )
}

const Smal2TileDesktop: VFC<Smal2TileWToggleProp> = ({ content }) => {
    const { imageLeft, isDesktopToggleTop } = content
    return imageLeft ? (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className={`${s['left-block']} flex flex-col w-1/2`}>
                    <TextBlock content={content} />
                    {!isDesktopToggleTop && <ToggleButton content={content} />}
                </div>
                <div>
                    {isDesktopToggleTop && <ToggleButton content={content} />}
                </div>
            </div>
            <ImagesBlock content={content} />
        </div>
    ) : (
        <div className="flex flex-row">
            <div
                className={`${s['left-block']} flex flex-col w-1/2 justify-center`}
            >
                <div className="">
                    <TextBlock content={content} />
                </div>
                {!isDesktopToggleTop && <ToggleButton content={content} />}
            </div>
            <div className="flex flex-col w-1/2">
                {isDesktopToggleTop && <ToggleButton content={content} />}
                <ImagesBlock content={content} />
            </div>
        </div>
    )
}

const callback = function (entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-scroll')
        } else {
            entry.target.classList.remove('animate-fade-in-scroll')
        }
    })
}

const Smal2TileWrapper: VFC<Smal2TileWToggleProp> = ({ content }) => {
    const [isToggleOn, setToggleOn] = useState(false)

    if (!content) return null
    const setToggle = (toggle: boolean) => {
        setToggleOn(toggle)
    }
    content = { ...content, isToggleOn, setToggleOn: setToggle }

    if (typeof document !== 'undefined') {
        const animateTargets = document.querySelectorAll('.scroll-fade')
        const observer = new IntersectionObserver(callback)

        animateTargets.forEach(function (target) {
            target.classList.add('opacity-0')
            observer.observe(target)
        })
    }

    const { backgroundColor, backgroundImage } = content

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
        (content?.heading && content.heading?.replace(/\s+/g, '')) ??
        'Smal2TileWrapper'

    const style = {
        backgroundImage: `url(${backgroundImage?.file.url})`,
        backgroundColor: backgroundColor,
        backgroundSize: 'cover'
    }

    const enableBackground = content.pageBackgroundImage ? {} : style

    return (
        <div style={enableBackground}>
            <div
                className={`${s['root']} text-white m-auto scroll-fade verticalPaddings-${paddingsClassheading}`}
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

                <div className="block md:hidden">
                    <Smal2TileMobile content={content} />
                </div>
                <div className="md:block hidden">
                    <Smal2TileDesktop content={content} />
                </div>
            </div>
        </div>
    )
}

export default Smal2TileWrapper
