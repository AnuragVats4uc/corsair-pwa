import { VFC } from 'react'
import { TestimonialBlockProps } from '@components/common/TestimonialCarousel'
import s from '../TestimonialCarousel.module.scss'
import cn from 'classnames'

export const Line: VFC<TestimonialBlockProps> = ({
    testimonialBlock: { logo, desktopTextPosition, desktopMainImagePosition }
}) => {
    return (
        <>
            <div className={`${s['testimonial-line']} bg-white md:hidden`}>
                <span className={s['testimonial-line-circle']} />
            </div>
            <span
                className={`${s['testimonial-line-desktop']} bg-white hidden md:block top-1/2 w-full left-0 absolute z-0`}
            >
                <span
                    className={cn(
                        `${s['testimonial-line-desktop-dash']} absolute border-l-4`,
                        desktopTextPosition === 'top' &&
                            s[`testimonial-line-desktop-dash-top`],
                        logo && `${s['testimonial-line-desktop-dash-logo']}`,
                        desktopMainImagePosition === 'left' &&
                            `${s['testimonial-line-desktop-dash-left']}`
                    )}
                />
            </span>
        </>
    )
}
