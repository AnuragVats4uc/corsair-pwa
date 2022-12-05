import { GradientBgType } from '../RichCarousel'
import { generateBgColors } from '../utils/generateBgColors'
import s from '../RichCarousel.module.scss'
import cn from 'classnames'

export type CarouselBackgroundProps = {
    left: GradientBgType
    right: GradientBgType
}

export const CarouselBackground = ({
    left,
    right
}: CarouselBackgroundProps) => {
    const twClasses = /*tw*/ {
        background: 'hidden md:block absolute h-1/2 w-full md:w-1/2 z-0',
        left: 'h-3/5 md:h-full left-0 top-0',
        right: 'h-2/5 md:h-full right-0 bottom-0 md:top-0'
    }
    const styles = {
        left: generateBgColors(left),
        right: generateBgColors(right)
    }

    return (
        <>
            <div
                className={cn(
                    s['background-left'],
                    twClasses.background,
                    twClasses.left
                )}
                style={styles.left}
            />
            <div
                className={cn(
                    s['background-right'],
                    twClasses.background,
                    twClasses.right
                )}
                style={styles.right}
            />
        </>
    )
}
