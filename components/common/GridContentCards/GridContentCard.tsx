import React from 'react'
import Link from 'next/link'
import s from './GridContentCards.module.scss'
import { useRef } from 'preact/hooks'

export interface GridContentCardType {
    backgroundColor?: string
    copy: string
    type?: string
    ctaText?: string
    ctaUrl?: string
    heading: string
    subheading?: string
    textColor?: string
    title: string
}

interface GridContentCardProps {
    content: GridContentCardType
}

const c = /*tw*/ {
    contentWrapper: `${s.contentWrapper} flex justify-between flex-col relative`,
    cta: `${s.cta} uppercase relative font-bold inline`,
    heading: `${s.heading} uppercase text-white`,
    subHeading: `${s.subHeading} uppercase font-aktivGroteskBold`
}

const GridContentCard = ({ content }: GridContentCardProps) => {
    const {
        backgroundColor,
        copy,
        ctaText,
        ctaUrl,
        heading,
        subheading,
        textColor,
        type
    } = content

    const setBackgroundColor = backgroundColor || '#fff'
    const setTextColor = textColor || '#000'
    const modifier = !ctaText && !ctaUrl ? s.copyNoCta : null

    const headerElement = useRef<HTMLElement>(null)
    const headerElementClientHeight = headerElement.current?.clientHeight || 0

    if (type !== 'Content Card') return null

    return (
        <li
            className={`${s.card}`}
            style={{ backgroundColor: setBackgroundColor }}
        >
            <header className={`${s.header}`} ref={headerElement}>
                <h4 className={`${c.heading}`}>{heading}</h4>
                <h5 className={`${c.subHeading}`}>{subheading}</h5>
            </header>
            <div
                className={`${c.contentWrapper} ${modifier}`}
                style={{
                    color: setTextColor,
                    height: `calc(100% - ${headerElementClientHeight}px)`
                }}
            >
                <p
                    className={`${s.copy}`}
                    dangerouslySetInnerHTML={{ __html: copy }}
                />
                <div>
                    {ctaUrl && ctaText && (
                        <div className={`${c.cta}`}>
                            <Link href={ctaUrl}>{ctaText}</Link>
                        </div>
                    )}
                </div>
            </div>
        </li>
    )
}

export default GridContentCard
