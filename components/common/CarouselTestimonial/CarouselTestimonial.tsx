import s from './CarouselTestimonial.module.scss'
import Slider from 'react-slick'
import Slide from './Slide'
import cn from 'classnames'
import { ReactChild, ReactFragment, ReactPortal, useState, useRef } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { Arrow } from '../CarouselProductTiles/Arrows'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import { IMeta } from '../types'

const c = /*tw*/ {
    blockContainer: s['block-container'],
    hasAnimation: [s['extra-info-container'], s['has-animate']],
    onScreen: s['onScreen'],
    slider: s['slider'],
    container: s['container'],
    headerWrapper: s['extra-info-wrapper'],
    textContainer: s['text-container'],
    heading: s['heading'],
    subHeading: s['sub-heading'],
    headingText: s['heading-text'],
    sliderOne: `${s['slider-one']} text-white flex items-center justify-center flex-no-wrap my-0 mx-auto relative`
}

export type CSLTestimonialObject = {
    identifier: string
    subheading?: string
    text?: string
    logo?: ImageType
    mainImage: ImageType
    backgroundColorHex?: string
    meta: IMeta<'carouselTestimonialSlide'>
}

export type CSLTestimonialHeading = {
    title?: string
    heading?: string
    subHeading?: string
    backgroundColorHex?: string
    text?: string
}

export type CslContainer = {
    identifier: string
    productSlide: CSLTestimonialObject[]
    copyBlock?: CSLTestimonialHeading
    meta: IMeta<'carouselppContainer'>
    displayType: string
    pageBackgroundImage?: ImageType
}

export type CarouselProps = {
    content: CslContainer
}

type CslData = CSLTestimonialObject[]

type CslHeader = CSLTestimonialHeading

const CarouselTestimonial = ({
    content: carouselContainer
}: CarouselProps): JSX.Element | null => {
    const animateRef = useRef(null)
    const { isOnScreen, isAboveRootMargin } = useOnScreen(animateRef, true, {
        threshold: 0.25
    })
    const [currentSlider, setCurrentSlider] = useState<number>(1)

    if (!carouselContainer) return null
    const productSlides: CslData = carouselContainer.productSlide
    const LIMIT_TO_ADD_ZERO = 10
    const addZero = (num: number): string | number =>
        num < LIMIT_TO_ADD_ZERO ? `0${num}` : num
    const renderCustomDots = (dots: React.ReactNode): JSX.Element => {
        const current = addZero(currentSlider)
        const sliderLength = addZero(productSlides.length)
        const currentActive = currentSlider === productSlides.length

        return (
            <div className={s['dot-container']}>
                <label className="opacity-100 text-white font-bebasNeueExtraBold font-bold">
                    {current}
                </label>
                <ul
                    className={cn(
                        s['product-carousel-custom-dots'],
                        'w-full flex items-center justify-center'
                    )}
                >
                    {dots}
                </ul>
                <label
                    className={`text-white font-bebasNeueExtraBold font-bold ${
                        currentActive ? 'opacity-100' : 'opacity-50'
                    }`}
                >
                    {sliderLength}
                </label>
            </div>
        )
    }

    const defaultSettings = {
        autoplay: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        afterChange: (current: number) => setCurrentSlider(current + 1),
        prevArrow: <Arrow direction="left" s={s} />,
        nextArrow: <Arrow direction="right" s={s} />,
        appendDots: (
            dots:
                | boolean
                | ReactChild
                | ReactFragment
                | ReactPortal
                | null
                | undefined
        ) => renderCustomDots(dots)
    }
    return (
        <>
            {carouselContainer.copyBlock && (
                <div className={c.container}>
                    <div
                        className={cn(
                            c.blockContainer,
                            !carouselContainer.pageBackgroundImage && 'bg-black'
                        )}
                        style={{
                            backgroundColor: `#${
                                carouselContainer.pageBackgroundImage
                                    ? ''
                                    : carouselContainer.copyBlock
                                          ?.backgroundColorHex &&
                                      carouselContainer.copyBlock
                                          ?.backgroundColorHex
                            }`
                        }}
                    >
                        <div
                            ref={animateRef}
                            className={cn(c.hasAnimation, {
                                [c.onScreen]: isOnScreen || isAboveRootMargin
                            })}
                        >
                            <div className={c.headerWrapper}>
                                <div className={c.textContainer}>
                                    {carouselContainer.copyBlock
                                        ?.subHeading && (
                                        <p className={c.subHeading}>
                                            {
                                                carouselContainer.copyBlock
                                                    ?.subHeading
                                            }
                                        </p>
                                    )}
                                    {carouselContainer.copyBlock?.heading && (
                                        <h2 className={c.heading}>
                                            {
                                                carouselContainer.copyBlock
                                                    ?.heading
                                            }
                                        </h2>
                                    )}
                                    {carouselContainer.copyBlock?.text && (
                                        <p className={c.headingText}>
                                            {carouselContainer.copyBlock?.text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={c.slider}>
                {carouselContainer.productSlide.length > 1 ? (
                    <Slider {...defaultSettings}>
                        {productSlides.map(
                            (prod: CSLTestimonialObject, key) => (
                                <Slide cslData={prod} key={key} />
                            )
                        )}
                    </Slider>
                ) : (
                    <div className={c.sliderOne}>
                        {productSlides.map((prod: any) => (
                            <Slide
                                cslData={prod}
                                key={prod.identifier}
                                className={s['testimonial']}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default CarouselTestimonial
