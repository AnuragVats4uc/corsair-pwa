import { useEffect, useState, VFC } from 'react'
import Slider from 'react-slick'
import {
    Block,
    Dots,
    getDotsLabels,
    TestimonialSliderProps
} from '@components/common/TestimonialCarousel'

export const TestimonialSlider: VFC<TestimonialSliderProps> = ({
    testimonialBlocks
}) => {
    const [centerMode, setCenterMode] = useState(true)
    const [centerPadding, setCenterPadding] = useState(0)
    const dotsLabels = getDotsLabels(testimonialBlocks)

    useEffect(() => {
        const handleResize = () => {
            if (window && window.innerWidth > 1440) {
                setCenterMode(true)
                setCenterPadding((window.innerWidth - 1440) / 2)
            } else {
                setCenterMode(false)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const sliderSettings = {
        className: 'center',
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
        centerMode: centerMode,
        centerPadding: `${centerPadding}px`,
        appendDots: (dots: JSX.Element[]) => Dots(dots, dotsLabels)
    }

    return (
        <div className="h-full w-full flex flex-col relative">
            <Slider {...sliderSettings}>
                {testimonialBlocks.map((testimonialBlock, index: number) => {
                    return (
                        <Block
                            testimonialBlock={testimonialBlock}
                            position={index}
                            key={testimonialBlock.title}
                        />
                    )
                })}
            </Slider>
        </div>
    )
}
