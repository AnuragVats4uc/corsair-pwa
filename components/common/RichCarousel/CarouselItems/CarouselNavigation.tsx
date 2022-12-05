import { FC, RefObject } from 'react'
import { CarouselItemsType, GradientBgType } from '../RichCarousel'
import SliderType from 'react-slick'
import s from '../RichCarousel.module.scss'
import cn from 'classnames'
import { LeftArrowSVG } from '../icons/LeftArrow'
import { RightArrowSVG } from '../icons/RightArrow'

export type CarouselNavigationProps = {
    carouselItems: CarouselItemsType[]
    title: string
    activeIndex: number
    sliderRef: RefObject<SliderType | null>
    colorModeLeft: 'Dark' | 'Light'
}

export const CarouselNavigation: FC<CarouselNavigationProps> = ({
    carouselItems,
    title,
    activeIndex,
    sliderRef,
    colorModeLeft
}) => {
    const twClasses = {
        container: 'block md:flex md:flex-col md:justify-center relative',
        arrow: 'rounded-full relative hover:opacity-75',
        leftArrow: `${s['left-arrow-circle']} hover:opacity-75 cursor-pointer`,
        rightArrow: `${s['right-arrow-circle']} hover:opacity-75 cursor-pointer `
    }
    const activeItem = carouselItems[activeIndex]
    const color = colorModeLeft === 'Dark' ? 'text-white' : 'text-black'
    const stroke = colorModeLeft === 'Dark' ? '#FFFFFF' : '#000000'

    const renderNavLinks = carouselItems?.map((item, index) => (
        <li
            key={index}
            className={cn(s['navigation-item'], 'font-aktivGroteskBold', {
                [s['active']]: activeIndex === index
            })}
        >
            <h4 className={cn(activeIndex === index && color)}>{`${(
                '0' +
                (index + 1)
            ).slice(-2)} ${item?.title}`}</h4>
        </li>
    ))

    if (carouselItems?.length < 2) return null

    return (
        <div
            className={cn(
                s['slider-container'],
                s[`left-${activeItem?.colorModeLeft}`],
                s[`right-${activeItem?.colorModeRight}`],
                twClasses.container
            )}
        >
            <span
                className={cn(s['accent'], 'hidden lg:block')}
                style={{ background: activeItem?.lineColor }}
            />
            <h2
                className={cn(s['caption'], 'text-center md:text-left', color)}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <ul className={s['nav-container']}>{renderNavLinks}</ul>
            <div
                className={cn(
                    s['nav-arrows'],
                    'flex w-full justify-center md:block'
                )}
            >
                <div className="flex -space-x-2">
                    <LeftArrowSVG
                        onClick={() => sliderRef?.current?.slickPrev()}
                        colorModeLeft={colorModeLeft}
                        className={twClasses.leftArrow}
                        stroke={stroke}
                    />
                    <RightArrowSVG
                        onClick={() => sliderRef?.current?.slickNext()}
                        className={twClasses.rightArrow}
                        stroke={stroke}
                    />
                </div>
            </div>
        </div>
    )
}
