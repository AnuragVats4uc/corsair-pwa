import React, { useState, useMemo, useEffect, useRef } from 'react'
import s from './CarouselHow.module.scss'
import SlideHow from './SlideHow'
import SlideImage from './SlideImage'
import Slider, { Settings } from 'react-slick'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Arrow from './ArrowHow'
export interface Heading {
    displayText: string
    url: string
}
export interface CarouselHowItemType {
    mediaDesktop: ImageType
    heading: Heading
    subHeading: string
    description: string
}
export interface CarouselHowType {
    carouselHowItems: CarouselHowItemType[]
}
export interface CarouselHowProps {
    carouselHow?: CarouselHowType
    settings?: Settings
}

const CarouselHow = ({
    settings,
    carouselHow
}: CarouselHowProps): JSX.Element | null => {
    const [nav1, setNav1] = useState<Slider | null>()
    const [nav2, setNav2] = useState<Slider | null>()
    const slider1 = useRef<Slider>(null)
    const slider2 = useRef<Slider>(null)

    useEffect(() => {
        setNav1(slider1.current)
        setNav2(slider2.current)
    }, [])

    const carouselHowItems = carouselHow?.carouselHowItems
    const imageList = useMemo(() => {
        return carouselHowItems?.map((carouselHowItem, index: number) => (
            <SlideImage key={index} content={carouselHowItem} />
        ))
    }, [carouselHowItems])

    const defaultSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        prevArrow: <Arrow />,
        nextArrow: <Arrow />,
        fade: true,
        ...settings
    }

    const imageSettings = {
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        swipeToSlide: true,
        focusOnSelect: false,
        centerMode: true,
        responsive: [
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1049,
                settings: {
                    slidesToShow: 4,
                    vertical: false,
                    verticalSwiping: false
                }
            },
            {
                breakpoint: 9999,
                settings: {
                    slidesToShow: 5,
                    vertical: true,
                    verticalSwiping: true
                }
            }
        ]
    }

    return (
        <div className={s['carouselhow-container']}>
            <Slider
                {...imageSettings}
                asNavFor={nav1 ? nav1 : undefined}
                ref={slider2}
                className={s['slider-list']}
            >
                {imageList}
            </Slider>
            <Slider
                {...defaultSettings}
                asNavFor={nav2 ? nav2 : undefined}
                ref={slider1}
                className={s['slider-wrapper']}
            >
                {carouselHowItems?.map((carouselHowItem, index: number) => (
                    <SlideHow key={index} content={carouselHowItem} />
                ))}
            </Slider>
        </div>
    )
}

export default CarouselHow
