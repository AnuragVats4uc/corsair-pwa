import React, { useEffect, useRef, useState } from 'react'
import s from './ContentCardTiles.module.scss'
import ContentCardTile, { ContentCardTileInterface } from './ContentCardTile'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export interface ContentCardTilesProps {
    content?: {
        backgroundImage?: ImageType
        copy?: string
        heading?: string
        meta: {
            contentType: string
        }
        subheading?: string
        standardCards?: ContentCardTileInterface[]
        title?: string
        text?: string
    }
}

const c = /*tw*/ {
    background: `${s.background}`,
    container: `${s.container} mx-auto my-0`,
    contentCardTiles: `${s.contentCardTiles} text-white`,
    headerContent: `${s.headerContent} text-center mx-auto`,
    grid: `${s.grid}`,
    heading: `${s.heading} bold text-center uppercase tracking-wide`,
    subHeading: `${s.subHeading} font-bold text-center uppercase font-aktivGrotesk`,
    wrapper: `${s.wrapper}`
}

export const intersectionOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.01
}

const ContentCardTiles = ({
    content
}: ContentCardTilesProps): JSX.Element | null => {
    const [isVisible, setIsVisible] = useState(false)
    const headingRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            handleObserver,
            intersectionOptions
        )

        const { current: tileRefCurrent } = headingRef

        if (tileRefCurrent) observer.observe(tileRefCurrent)

        return () => {
            if (tileRefCurrent) observer.unobserve(tileRefCurrent)
        }
    }, [headingRef, intersectionOptions])

    /**
     * Handle observer callback
     * @param entries observer
     */
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        const {
            isIntersecting: tileIsVisible,
            boundingClientRect: tileRect
        } = entry

        const tileIsAboveRootMargin = Math.sign(tileRect.top) === -1

        tileIsVisible || tileIsAboveRootMargin
            ? setIsVisible(true)
            : setIsVisible(false)
    }

    if (!content) return null

    const {
        backgroundImage,
        heading,
        copy,
        subheading,
        standardCards,
        text
    } = content
    const outputBackgroundImageUrl = `#000 url(${backgroundImage?.file?.url}) 42px 68px repeat fixed`

    return (
        <section
            className={`${c.contentCardTiles}`}
            style={{ background: outputBackgroundImageUrl }}
        >
            <div className={`${c.background}`}>
                <div className={`${c.wrapper}`}>
                    <div
                        ref={headingRef}
                        className={`${c.container}`}
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                                ? 'translateY(0)'
                                : 'translateY(24px)'
                        }}
                    >
                        {subheading && (
                            <h4 className={`${s['sub-heading']}`}>
                                {subheading}
                            </h4>
                        )}
                        {heading && (
                            <h3 className={`${c.heading}`}>{heading}</h3>
                        )}
                        {text && (
                            <p
                                className={`${s['header-content']}`}
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        )}
                        {copy && (
                            <p
                                className={`${c.headerContent}`}
                                dangerouslySetInnerHTML={{ __html: copy }}
                            />
                        )}
                    </div>

                    {standardCards && (
                        <ul className={`${c.grid}`}>
                            {standardCards.map(
                                (
                                    element: ContentCardTileInterface,
                                    key: number
                                ) => (
                                    <ContentCardTile
                                        content={element}
                                        key={key}
                                    />
                                )
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ContentCardTiles
