import React, { useMemo, VFC } from 'react'
import { StandardCard } from '../StandardCard'
import Slider, { Settings } from 'react-slick'
import cn from 'classnames'
import { IStandardCardsSection } from '../types'
import s from './StandardCardsSection.module.scss'
import ArrowButtonLeft from '@components/icons/ArrowButtonLeft'
import ArrowButtonRight from '@components/icons/ArrowButtonRight'
import { getThemeFromContent } from '@lib/getThemeFromContent'

const CustomPage = () => {
    return <div className="custom-dot" />
}

const c = /*tw*/ {
    standardCardsSection: `${s['standard-cards-section']}`,
    standardCardsSectionHeading: `${s['standard-cards-section-heading']} uppercase text-center font-bebasNeue`,
    standardCardsSectionText: `${s['standard-cards-section-text']} font-aktivGrotesk text-center`,
    standardCardSectionSubheading: `${s['standard-cards-section-subheading']} font-aktivGrotesk text-center font-semibold`,
    slider: `${s['standard-cards-section-slider-wrap']} block lg:hidden mx-auto`,
    grid: `${s['standard-cards-section-grid']}`,
    withCopyMargin: `${s['standard-cards-section-copy-margin']}`,
    withoutCopyMargin: `${s['standard-cards-section-no-copy-margin']}`
}

export type StandardCardsSectionProps = {
    content: IStandardCardsSection
}

const StandardCardsSection: VFC<StandardCardsSectionProps> = ({ content }) => {
    const theme = content?.theme && getThemeFromContent(content?.theme)
    const ArrowColor = theme?.color

    const sliderSettings: Settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '50px',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <ArrowButtonLeft fill={ArrowColor} />,
        nextArrow: <ArrowButtonRight fill={ArrowColor} />,
        customPaging: CustomPage,
        dots: true,
        dotsClass: `slick-dots slick-thumb ${
            content?.theme && content.theme.theme
        }`
    }

    const cardList = useMemo(
        () =>
            content.standardCards.map((card) => (
                <StandardCard card={card} key={card.title} />
            )),
        [content.standardCards]
    )
    return (
        <div
            className={`${c.standardCardsSection}`}
            style={{
                backgroundColor: theme ? theme.backgroundColor : ''
            }}
        >
            {content.subheading && (
                <p
                    style={{ color: theme && theme.subheadingColor }}
                    className={c.standardCardSectionSubheading}
                >
                    {content.subheading}
                </p>
            )}
            <p
                style={{ color: theme && theme.color }}
                className={cn(
                    c.standardCardsSectionHeading,
                    content?.text ? c.withCopyMargin : c.withoutCopyMargin
                )}
            >
                {content.heading}
            </p>
            {content?.text && (
                <p
                    style={{ color: theme && theme.color }}
                    className={c.standardCardsSectionText}
                >
                    {content.text}
                </p>
            )}
            <div
                className={cn(
                    c.slider,
                    s[
                        `standard-cards-section-slider-wrap-${
                            content?.theme && content.theme.theme
                        }`
                    ]
                )}
            >
                <Slider {...sliderSettings}>{cardList}</Slider>
            </div>
            <div className="hidden lg:flex">
                <div className={c.grid}>{cardList}</div>
            </div>
        </div>
    )
}

export default StandardCardsSection
