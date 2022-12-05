import { VFC } from 'react'
import s from './TestimonialCarousel.module.scss'
import { TestimonialSlider, TestimonialCarouselProps, setColors } from './'

export const TestimonialCarousel: VFC<TestimonialCarouselProps> = ({
    content
}) => {
    if (!content) return null
    const {
        heading,
        backgroundColorHex,
        testimonialBlocks,
        textColor
    } = content
    const txtColor = textColor === 'dark' ? 'text-black' : 'text-white'
    if (typeof document !== 'undefined') {
        setColors({ backgroundColorHex, textColor })
    }
    return (
        <div
            className={`${
                s['testimonial']
            } flex flex-col items-center ${txtColor} m-auto ${
                !content.pageBackgroundImage && 'bg-black'
            }`}
        >
            <div className={`${s['testimonial-heading']}  font-bebasNeue`}>
                {heading}
            </div>
            <TestimonialSlider testimonialBlocks={testimonialBlocks} />
        </div>
    )
}
export default TestimonialCarousel
