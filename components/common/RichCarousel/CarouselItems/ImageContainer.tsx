import type { FC } from 'react'
import type { CarouselItemsType } from '../RichCarousel'
import { generateBgColors } from '../utils/generateBgColors'
import Image from '@corratech/corsair-image'
import s from '../RichCarousel.module.scss'
import cn from 'classnames'

export type ImageContainerProps = {
    carouselItem: CarouselItemsType
    isSlider: boolean
}

export const ImageContainer: FC<ImageContainerProps> = ({
    carouselItem,
    isSlider
}) => {
    const twClasses = {
        container:
            'block md:flex md:flex-col md:justify-center animate-container relative',
        background: 'block md:hidden absolute w-full h-full top-0 left-0 -z-1'
    }
    const styles =
        carouselItem?.imageAlignment === 'Left'
            ? generateBgColors(carouselItem?.backgroundLeft)
            : generateBgColors(carouselItem?.backgroundRight)

    if (!carouselItem?.image) return null

    const {
        file: {
            url,
            details: {
                image: { width, height }
            }
        },
        description
    } = carouselItem?.image

    return (
        <div className={cn(s['carousel-image'], twClasses.container)}>
            {!isSlider && (
                <div className={twClasses.background} style={styles} />
            )}
            <Image
                src={url}
                layout="responsive"
                width={width}
                height={height}
                alt={description}
            />
        </div>
    )
}
