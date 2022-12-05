import { useState, useRef } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Slider from 'react-slick'
import type SliderType from 'react-slick'
import {
    ImageContainer,
    CarouselContent,
    CarouselNavigation,
    CarouselBackground
} from './CarouselItems'
import s from './RichCarousel.module.scss'
import cn from 'classnames'

export enum GradientTypesEnum {
    LINEAR = 'Linear'
}

export type GradientBgType = {
    startColorCode?: string
    endColorCode?: string
    gradientType?: GradientTypesEnum
    startPoint?: number
    stopPoint?: number
    angle?: number
    backgroundColor: string
}

export type CarouselItemsType = {
    title: string
    lineColor: string
    heading?: string
    description?: string
    logo?: ImageType
    backgroundLeft: GradientBgType
    backgroundRight: GradientBgType
    colorModeLeft: 'Dark' | 'Light'
    colorModeRight: 'Dark' | 'Light'
    image?: ImageType
    imageAlignment: 'Left' | 'Center' | 'Right'
}

export interface RichCarouselType {
    heading: string
    identifier: string
    items: CarouselItemsType[]
}

export type RichCarouselProps = {
    content: RichCarouselType
}

const RichCarousel = ({ content }: RichCarouselProps): JSX.Element | null => {
    const [activeIndex, setActiveIndex] = useState(0)
    const isSlider = content?.items?.length > 1
    const sliderRef = useRef<SliderType | null>(null)

    const defaultSettings = {
        fade: true,
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        adaptiveHeight: true,
        beforeChange: (current: number, next: number) => setActiveIndex(next)
    }

    const twClasses = /*tw*/ {
        contentContainer:
            'relative z-1 flex flex-col md:grid md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3'
    }

    const renderItems = content?.items?.map((carouselItem, index) => {
        return (
            <div
                className={cn(s['rich-carousel-items'], {
                    [s['has-slider']]: isSlider
                })}
                key={index}
            >
                <CarouselBackground
                    left={carouselItem?.backgroundLeft}
                    right={carouselItem?.backgroundRight}
                />
                <div
                    className={cn(
                        s['content-container'],
                        twClasses.contentContainer,
                        {
                            [s[carouselItem.imageAlignment]]: !isSlider
                        }
                    )}
                >
                    <CarouselNavigation
                        carouselItems={content?.items}
                        title={content?.heading}
                        activeIndex={activeIndex}
                        sliderRef={sliderRef}
                        colorModeLeft={carouselItem.colorModeLeft}
                    />
                    <div className="hidden md:block lg:hidden md:order-2" />
                    <CarouselContent
                        carouselItem={carouselItem}
                        isSlider={isSlider}
                        colorModeRight={carouselItem.colorModeRight}
                    />
                    <ImageContainer
                        carouselItem={carouselItem}
                        isSlider={isSlider}
                    />
                </div>
            </div>
        )
    })

    if (!content) return null

    return (
        <div className={cn(s['rich-carousel-container'], 'relative')}>
            <Slider {...defaultSettings} ref={sliderRef}>
                {renderItems}
            </Slider>
        </div>
    )
}

export default RichCarousel
