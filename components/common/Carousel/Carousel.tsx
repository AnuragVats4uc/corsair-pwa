import React, { useMemo, useRef } from 'react'
import s from './Carousel.module.scss'
import Skeleton from 'react-loading-skeleton'
import Slide from './Slide'
import Arrow from './Arrow/Arrow'
import Dots from './Dots'
import Slider, { Settings } from 'react-slick'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import cn from 'classnames'
import { IMeta } from '../types'
export interface CtaButton {
    displayText: string
    url: string
    openInPopup?: boolean
    openInANewTab?: boolean
    textAlignTop?: boolean
    textAlignMiddle?: boolean
}
export interface BannerItemType {
    ctaButton: CtaButton
    desktopImageOrVideo?: ImageType | VideoType
    mobileImageOrVideo?: ImageType | VideoType
    background?: ImageType
    heading: string
    logo: ImageType
    logoWidth?: string
    logoHeight?: string
    subHeading: string
    width: string
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
}
export interface CarouselType {
    autoPlay?: boolean
    bannerItems: BannerItemType[]
    duration?: number
    randomOrder: boolean
    animation: boolean
    headingType: string[]
    type: string
    meta: IMeta<'heroBanner'>
}
export interface CarouselProps {
    content: CarouselType
    settings?: Settings
}
const DEFAULT_SLIDE_DURATION = 9 //time in seconds
const makeRandomBanners = (
    items: BannerItemType[],
    randomOrder: boolean
): BannerItemType[] => {
    if (!randomOrder) {
        return items
    }
    const randomBanner = []
    let index = items.length
    let randomNumber = 0
    while (index--) {
        randomNumber = Math.floor(Math.random() * (index + 1))
        randomBanner.push(items[randomNumber])
        items.splice(randomNumber, 1)
    }
    return randomBanner
}
const Carousel = ({ settings, content }: CarouselProps): JSX.Element | null => {
    const {
        autoPlay = true,
        duration = DEFAULT_SLIDE_DURATION,
        bannerItems = [],
        randomOrder
    } = content
    const randomBanners = useRef(makeRandomBanners(bannerItems, randomOrder))
    const defaultSettings = {
        autoplay: autoPlay,
        autoplaySpeed: duration * 1000, //milliseconds
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        prevArrow: <Arrow direction="left" />,
        nextArrow: <Arrow direction="right" />,
        appendDots: Dots,
        ...settings
    }
    const items = useMemo(
        () =>
            randomBanners.current.map((bannerItem, index: number) => (
                <Slide key={index} content={bannerItem} />
            )),
        [randomBanners]
    )
    return (
        <div
            className={cn(
                s['carousel-container'],
                'w-full h-full overflow-hidden'
            )}
        >
            <Slider {...defaultSettings} className={s['slider-wrapper']}>
                {items}
            </Slider>
        </div>
    )
}
const MemoCarousel = React.memo(Carousel)
const CarouselRandom = ({ settings, content }: CarouselProps): JSX.Element => {
    if (!content) {
        return <Skeleton height="35vw" />
    }
    return <MemoCarousel settings={settings} content={content} />
}
export default CarouselRandom
