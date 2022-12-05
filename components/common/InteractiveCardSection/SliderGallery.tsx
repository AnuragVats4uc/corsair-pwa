import React, { useRef, useEffect, VFC } from 'react'
import Slider, { Settings } from 'react-slick'
import type { IInteractiveCard } from '../types'
import { FullCard, FullCardMobile } from './FullCard'
import s from './SliderGallery.module.scss'
import cn from 'classnames'
import Cross from './Cross'

const ArrowButtonLeft = (
    <button>
        <svg
            className="m-auto md:w-auto md:h-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0ZM24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1ZM26.4568 19.0509L21.5072 24.0004L26.457 28.9502L25.7499 29.6573L20.0916 23.999L20.7987 23.2919L20.8001 23.2933L25.7497 18.3438L26.4568 19.0509Z"
                fill="white"
            />
        </svg>
    </button>
)

const ArrowButtonRight = (
    <button>
        <svg
            className="m-auto md:w-auto md:h-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM24 1C36.7025 1 47 11.2975 47 24C47 36.7025 36.7025 47 24 47C11.2975 47 1 36.7025 1 24C1 11.2975 11.2975 1 24 1ZM21.5432 19.0509L26.4928 24.0004L21.543 28.9502L22.2501 29.6573L27.9084 23.999L27.2013 23.2919L27.1999 23.2933L22.2503 18.3438L21.5432 19.0509Z"
                fill="white"
            />
        </svg>
    </button>
)

const sliderSettings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: ArrowButtonLeft,
    nextArrow: ArrowButtonRight,
    draggable: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                draggable: false
            }
        }
    ]
}

export type SliderGalleryProps = {
    items: IInteractiveCard[]
    show: boolean
    onClose: () => void
    slideIndex: number | null
}

const c = /*tw*/ {
    sliderGallery: `${s['slider-gallery']}`,
    sliderGalleryHotzone: `${s['slider-gallery-hotzone']} absolute`,
    sliderWrap: `${s['slider-gallery-slider-wrap']} absolute mx-auto w-full`
}

const SliderGallery: VFC<SliderGalleryProps> = ({
    items,
    show = false,
    onClose = () => {
        // this is intentional
    },
    slideIndex
}) => {
    const slider = useRef<Slider | null>()

    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        if (slideIndex !== null) {
            slider.current?.slickGoTo(slideIndex)
        }
    }, [slideIndex])

    return (
        <>
            <div id="slider-gallery-target" />
            <div
                className={cn(c.sliderGallery, {
                    [s['show']]: show
                })}
            >
                <div className="relative w-full h-full flex justify-center pt-56">
                    <div
                        className={c.sliderGalleryHotzone}
                        onClick={onClose}
                        onKeyDown={handleKey}
                        role="button"
                        tabIndex={0}
                    />
                    <div className={c.sliderWrap}>
                        <Slider
                            {...sliderSettings}
                            ref={(ref) => (slider.current = ref)}
                        >
                            {items.map((card, index) => (
                                <div key={card.title + index}>
                                    <div className="hidden lg:block">
                                        <FullCard card={card} />
                                    </div>
                                    <div className="block lg:hidden">
                                        <FullCardMobile card={card} />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <Cross onClick={onClose} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderGallery
