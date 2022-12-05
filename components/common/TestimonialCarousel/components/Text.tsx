import { VFC } from 'react'
import {
    LogoImage,
    TestimonialBlockProps
} from '@components/common/TestimonialCarousel'
import s from '../TestimonialCarousel.module.scss'
import cn from 'classnames'

export const Text: VFC<TestimonialBlockProps> = ({
    testimonialBlock: {
        headingTitle,
        text,
        logo,
        logoHeading,
        desktopTextPosition,
        desktopMainImagePosition
    }
}) => {
    return (
        <div
            className={cn(
                `${s['text']} flex flex-row items-center md:h-auto md:m-0`,
                desktopMainImagePosition === 'left' ? s['left'] : s['right'],
                desktopTextPosition === 'top' && 'md:self-top',
                desktopTextPosition === 'middle' && 'md:self-center',
                desktopTextPosition === 'bottom' && 'md:self-end'
            )}
        >
            {logo && (
                <div className={`${s['text-logo']} text-center`}>
                    <LogoImage logo={logo} />
                    <div
                        className={`${s['text-logo-heading']} font-aktivGrotesk relative`}
                    >
                        {logoHeading}
                    </div>
                </div>
            )}
            <div>
                <div
                    className={`${s['text-heading']} font-bebasNeue uppercase relative`}
                >
                    {headingTitle}
                </div>
                <div className={`${s['text-text']} font-aktivGrotesk`}>
                    {text}
                </div>
            </div>
        </div>
    )
}
