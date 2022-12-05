import s from './CarouselImageText.module.scss'
import cn from 'classnames'

const LIMIT_TO_ADD_ZERO = 10
const addZero = (num: number): string | number =>
    num < LIMIT_TO_ADD_ZERO ? `0${num}` : num

export const renderCustomDots = (
    dots: React.ReactNode,
    currentSlide: number,
    length: number
): JSX.Element => {
    const current = addZero(currentSlide)
    const sliderLength = addZero(length)
    const currentActive = currentSlide === length

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
