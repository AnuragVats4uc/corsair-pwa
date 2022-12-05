import React, { useMemo, useRef } from 'react'
import s from './Carousel.module.scss'
import Slide from './Slide'
import Arrow from '@components/common/Carousel/Arrow/Arrow'
import Dots from '@components/common/Carousel/Dots'
import Slider, { Settings } from 'react-slick'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import cn from 'classnames'
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
    heading: string
    logo: ImageType
    logoWidth?: string
    logoHeight?: string
    subHeading: string
    width: string
}
export interface CarouselType {
    autoplay?: boolean
    bannerItems: BannerItemType[]
    duration?: number
    randomOrder: boolean
}
export interface CarouselProps {
    content: CarouselType
    settings?: Settings
}

const DEFAULT_SLIDE_DURATION = 9 //time in seconds
const ARROW_COLOR = '#979797'

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
        autoplay = true,
        duration = DEFAULT_SLIDE_DURATION,
        bannerItems = [],
        randomOrder
    } = content

    const randomBanners = useRef(makeRandomBanners(bannerItems, randomOrder))

    const defaultSettings = {
        autoplay: autoplay,
        autoplaySpeed: duration * 1000, //milliseconds
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        prevArrow: <Arrow direction="left" color={ARROW_COLOR} />,
        nextArrow: <Arrow direction="right" color={ARROW_COLOR} />,
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
                'w-full h-full overflow-hidden carousel-slider-container'
            )}
        >
            <Slider {...defaultSettings} className={s['slider-wrapper']}>
                {items}
            </Slider>
        </div>
    )
}

const MemoCarousel = React.memo(Carousel)

const CategorySlider = ({
    settings,
    content
}: CarouselProps): JSX.Element | null => {
    if (!content) return null
    return <MemoCarousel settings={settings} content={content} />
}

export default CategorySlider
