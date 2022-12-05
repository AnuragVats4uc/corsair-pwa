import { VFC, forwardRef } from 'react'
import Slider from 'react-slick'
import {
    renderCustomDots,
    CarouselImageTextSlideProp,
    CarouselSlideProp
} from './'
import { ReactChild, ReactFragment, ReactPortal } from 'react'
import s from './CarouselImageText.module.scss'

const c = /*tw*/ {
    slide: `${s['slide']} text-center m-auto`,
    heading: `${s['slide-heading']} uppercase mt-4`,
    text: `${s['slide-text']} font-aktivGrotesk xl:mb-0`,
    slider: `${s['slider']} border-white justify-center items-center flex-no-wrap relative mt-2.5`
}

const Slide: VFC<CarouselSlideProp> = ({ slide }) => {
    return (
        <div className={c.slide}>
            <h2 className={c.heading}>{slide.heading}</h2>
            <p className={c.text}>{slide.text}</p>
        </div>
    )
}

// eslint-disable-next-line react/display-name
export const Slides: VFC<CarouselImageTextSlideProp> = forwardRef(
    ({ slides, current, onChange }, ref) => {
        const defaultSettings = {
            dots: true,
            infinite: false,
            speed: 500,
            arrows: true,
            beforeChange: (current: number, next: number) => onChange(next),
            appendDots: (
                dots:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined
            ) => renderCustomDots(dots, current + 1, slides.length)
        }

        return (
            <Slider {...defaultSettings} className={c.slider} ref={ref}>
                {slides.map((slide) => {
                    return <Slide slide={slide} key={slide.title} />
                })}
            </Slider>
        )
    }
)
