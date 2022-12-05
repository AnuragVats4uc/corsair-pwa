import React, { useEffect, useRef, useState } from 'react'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import s from './ContentCardTiles.module.scss'
import Link from 'next/link'
import Image from '@corratech/corsair-image'
import { intersectionOptions } from './ContentCardTiles'
interface ContentCardTileProps {
    content?: ContentCardTileInterface
}

export interface ContentCardTileInterface {
    copy?: string
    ctaText?: string
    ctaUrl?: string
    heading?: string
    logoImage?: ImageType
    imageWidth?: string
    imageHeight?: string
    type?: string
    meta: {
        contentType: string
    }
    subheading?: string
    subTitleIcons?: ImageType[]
    title?: string
}

const c = /*tw*/ {
    contentCardTile: `${s.contentCardTile} lg:flex lg:justify-between`,
    copy: `${s.copy} m-0 tracking-wide`,
    description: `${s.description} font-aktivGroteskBold`,
    heading: `${s.heading} tracking-wide`,
    link: `${s.link} uppercase font-bold`,
    list: `${s.list} flex`,
    logo: `${s.logo} flex justify-center`,
    secondaryContent: `${s.secondaryContent}`,
    subTitle: `${s.subTitle} font-bold uppercase font-bebasNeue`
}

const ContentCardTile = ({
    content
}: ContentCardTileProps): JSX.Element | null => {
    const [isVisible, setIsVisible] = useState(false)
    const [ctaIsVisible, setCtaIsVisible] = useState(false)
    const tileRef = useRef<HTMLDivElement | null>(null)
    const ctaRef = useRef<HTMLDivElement | null>(null)

    /**
     * Handle observer callback for tiles
     * @param entries observer
     */
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        const { isIntersecting: visible, boundingClientRect: rect } = entry

        const isAboveRootMargin = Math.sign(rect.top) === -1

        if (visible || isAboveRootMargin) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    /**
     * Handle observer callback for cta
     * @param entries observer
     */
    const handleCtaObserver = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        const { isIntersecting: visible, boundingClientRect: rect } = entry
        const isAboveRootMargin = Math.sign(rect.top) === -1

        if (visible || isAboveRootMargin) {
            setCtaIsVisible(true)
        } else {
            setCtaIsVisible(false)
        }
    }

    useEffect(() => {
        const { current: tileRefCurrent } = tileRef

        if (!tileRefCurrent) return

        const observer = new IntersectionObserver(
            handleObserver,
            intersectionOptions
        )

        observer.observe(tileRefCurrent)

        return () => {
            if (tileRefCurrent) observer.unobserve(tileRefCurrent)
        }
    }, [tileRef, intersectionOptions])

    useEffect(() => {
        const { current: ctaRefCurrent } = ctaRef

        if (!ctaRefCurrent) return

        const ctaIntersectionOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 1
        }

        const ctaObserver = new IntersectionObserver(
            handleCtaObserver,
            ctaIntersectionOptions
        )

        ctaObserver.observe(ctaRefCurrent)

        return () => {
            if (ctaRefCurrent) ctaObserver.unobserve(ctaRefCurrent)
        }
    }, [ctaRef])

    if (!content) return null

    const {
        copy,
        ctaText,
        ctaUrl,
        heading,
        logoImage,
        subheading,
        subTitleIcons
    } = content

    if (content?.type !== 'Content Card Tile') return null
    return (
        <li className={`${c.contentCardTile}`}>
            <section>
                {logoImage && (
                    <div className={`${c.logo}`}>
                        <Image
                            src={logoImage?.file.url}
                            alt={logoImage?.description || ''}
                            width={
                                content?.imageWidth ? content.imageWidth : '260'
                            }
                            height={
                                content?.imageHeight
                                    ? content.imageHeight
                                    : '120'
                            }
                        />
                    </div>
                )}
                <hr />
                <div
                    ref={tileRef}
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                            ? 'translateY(0)'
                            : 'translateY(24px)'
                    }}
                    className={`${s.content}`}
                >
                    {heading && (
                        <h4
                            className={`${c.heading}`}
                            dangerouslySetInnerHTML={{ __html: heading }}
                        />
                    )}
                    {copy && (
                        <p
                            className={`${c.copy}`}
                            dangerouslySetInnerHTML={{ __html: copy }}
                        />
                    )}
                </div>
            </section>

            {ctaUrl && ctaText && (
                <div
                    ref={ctaRef}
                    className={c.link}
                    style={{
                        opacity: ctaIsVisible ? 1 : 0,
                        transform: ctaIsVisible
                            ? 'translateY(0)'
                            : 'translateY(24px)'
                    }}
                >
                    <Link href={ctaUrl}>{ctaText}</Link>
                </div>
            )}
            <section className={c.secondaryContent}>
                {subheading && <h5 className={c.subTitle}>{subheading}</h5>}
                {subTitleIcons && (
                    <ul className={c.list}>
                        {subTitleIcons.map(
                            (element: ImageType, key: number) => (
                                <li key={key} className={s.item}>
                                    <Image
                                        src={element.file.url}
                                        alt={element?.description || ''}
                                        height="40"
                                        width="40"
                                    />
                                    <p className={c.description}>
                                        {element.description}
                                    </p>
                                </li>
                            )
                        )}
                    </ul>
                )}
            </section>
        </li>
    )
}

export default ContentCardTile
