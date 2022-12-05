import type { FC } from 'react'
import Image from '@corratech/corsair-image'
import type { CarouselItemsType } from '../RichCarousel'
import { generateBgColors } from '../utils/generateBgColors'
import s from '../RichCarousel.module.scss'
import cn from 'classnames'

export type CarouselContentProps = {
    carouselItem: CarouselItemsType
    isSlider: boolean
    colorModeRight: 'Dark' | 'Light'
}

export const CarouselContent: FC<CarouselContentProps> = ({
    carouselItem,
    isSlider,
    colorModeRight
}) => {
    const { backgroundLeft, backgroundRight } = carouselItem
    const twClasses = {
        container:
            'flex flex-col items-center lg:items-start justify-end md:justify-center animate-container relative',
        background: 'block md:hidden absolute w-full h-full top-0 left-0 -z-1',
        textAlign: 'text-center md:text-left'
    }
    const styles =
        carouselItem?.imageAlignment === 'Left'
            ? generateBgColors(backgroundRight)
            : generateBgColors(backgroundLeft)
    const color = colorModeRight === 'Dark' ? 'text-white' : 'text-black'

    return (
        <div
            className={cn(
                s['carousel-content'],
                twClasses.container,
                s[`left-${carouselItem?.colorModeLeft}`],
                s[`right-${carouselItem?.colorModeRight}`],
                {
                    [s['slider']]: isSlider
                }
            )}
        >
            {!isSlider && (
                <>
                    <div className={twClasses.background} style={styles} />
                    <span
                        className={cn(s['accent'], 'hidden lg:block')}
                        style={{ background: carouselItem?.lineColor }}
                    />
                </>
            )}
            {carouselItem?.logo?.file && (
                <div className={s['logo']}>
                    <Image
                        src={carouselItem?.logo?.file?.url}
                        width={carouselItem.logo.file.details?.image?.width}
                        height={carouselItem.logo.file.details?.image?.height}
                        layout="responsive"
                        alt={carouselItem.logo?.description}
                    />
                </div>
            )}
            {carouselItem?.heading && (
                <h2 className={cn(s['caption'], twClasses.textAlign, color)}>
                    {carouselItem.heading}
                </h2>
            )}
            {carouselItem?.description && (
                <div
                    className={cn(s['description'], color)}
                    dangerouslySetInnerHTML={{
                        __html: carouselItem.description
                    }}
                />
            )}
        </div>
    )
}
