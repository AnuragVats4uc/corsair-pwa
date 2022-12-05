import { VFC } from 'react'
import s from '../TestimonialCarousel.module.scss'
import cn from 'classnames'
import {
    SwipeArrow,
    MainImage,
    Line,
    Text,
    TestimonialBlockProps
} from '@components/common/TestimonialCarousel'

export const Block: VFC<TestimonialBlockProps> = ({
    testimonialBlock,
    position
}) => {
    const {
        mobileMainImagePosition,
        desktopMainImagePosition
    } = testimonialBlock
    return (
        <>
            <div
                className={cn(
                    `${s['testimonial-block']} relative flex md:flex-grow md:h-full md:w-full`,
                    mobileMainImagePosition === 'bottom'
                        ? 'flex-col'
                        : 'flex-col-reverse',
                    desktopMainImagePosition === 'right'
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                )}
            >
                <Text testimonialBlock={testimonialBlock} />
                <Line testimonialBlock={testimonialBlock} />
                <MainImage testimonialBlock={testimonialBlock} />
            </div>
            {position === 0 && <SwipeArrow />}
        </>
    )
}
