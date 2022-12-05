import React, { useState } from 'react'
import s from './ProductContentCarousel.module.scss'
import cn from 'classnames'
import Slider, { Settings } from 'react-slick'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { VFC } from 'react'
import { ICarouselContent } from '../types'
import { PlayVideoButton } from './PlayVideoButton'
export interface IProductContentCarouselProps {
    carouselContent?: ICarouselContent
}
export interface IContentItem {
    image: {
        title: string
        file: IContentItemFile
    }
    label: string
}

export interface IContentItemFile {
    url: string
    contentType: string
    fileName: string
    details: {
        image: {
            height: number
            width: number
        }
    }
}

const ArrowButtonLeft = (
    <button>
        <svg
            className="m-auto md:w-auto md:h-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0ZM24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1ZM26.4568 19.0509L21.5072 24.0004L26.457 28.9502L25.7499 29.6573L20.0916 23.999L20.7987 23.2919L20.8001 23.2933L25.7497 18.3438L26.4568 19.0509Z"
                fill="white"
            />
        </svg>
    </button>
)

const ArrowButtonRight = (
    <button>
        <svg
            className="m-auto md:w-auto md:h-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM24 1C36.7025 1 47 11.2975 47 24C47 36.7025 36.7025 47 24 47C11.2975 47 1 36.7025 1 24C1 11.2975 11.2975 1 24 1ZM21.5432 19.0509L26.4928 24.0004L21.543 28.9502L22.2501 29.6573L27.9084 23.999L27.2013 23.2919L27.1999 23.2933L22.2503 18.3438L21.5432 19.0509Z"
                fill="white"
            />
        </svg>
    </button>
)

const ProductContentCarousel: VFC<IProductContentCarouselProps> = ({
    carouselContent
}) => {
    const [currentSlider, setCurrentSlider] = useState<number>(1)
    const { t } = useTranslation()
    if (!carouselContent) {
        return null
    }

    const backgroundColor = carouselContent.backgroundColor
    const copyColor = carouselContent.copyColor
    const headingColor = carouselContent.headingColor
    const subHeadingColor = carouselContent.subHeadingColor

    const contents = carouselContent.contents.map<JSX.Element>((content) => {
        const label = content.description ? (
            <div
                className={cn(
                    s['slider-content-label'],
                    'absolute left-0 bottom-0 pt-32 pb-4 px-4 flex md:justify-start justify-center'
                )}
            >
                <label className="pt-1 px-4 rounded-full font-aktivGroteskBoldtext-sm pb-0.5">
                    {t(content.description)}
                </label>
            </div>
        ) : null

        const id = `${
            content.description
                ? content.description.toLowerCase().replace(/ /g, '-')
                : content.image.file.fileName
        }}`

        return (
            <div key={id} className="relative">
                <Image
                    className="md:rounded-2xl object-cover"
                    id={id}
                    src={content.image.file.url}
                    width={content.image.file.details.image.width}
                    height={content.image.file.details.image.height}
                />
                {content?.videoUrl && (
                    <PlayVideoButton url={content.videoUrl} />
                )}
                <div className="absolute h-full w-full top-0 left-0" />
                {label}
            </div>
        )
    })

    const LIMIT_TO_ADD_ZERO = 10
    const addZero = (num: number): string | number =>
        num < LIMIT_TO_ADD_ZERO ? `0${num}` : num

    const renderCustomDots = (dots: React.ReactNode): JSX.Element => {
        const current = addZero(currentSlider)
        const sliderLength = addZero(carouselContent.contents.length)
        const currentActive = currentSlider === carouselContent.contents.length

        return (
            <div>
                <label className="opacity-100 text-white md:text-3xl text-2xl font-bebasNeueExtraBold font-bold">
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

    const settings: Settings = {
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        slidesToShow: 1,
        infinite: true,
        arrows: true,
        centerMode: true,
        speed: 400,
        centerPadding: '25%',
        adaptiveHeight: true,
        afterChange: (current) => setCurrentSlider(current + 1),
        prevArrow: ArrowButtonLeft,
        appendDots: (dots) => renderCustomDots(dots),
        nextArrow: ArrowButtonRight,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    swipe: true,
                    centerPadding: '0px'
                }
            }
        ]
    }

    return (
        <div
            style={{ backgroundColor }}
            className={cn(s['product-content-slider-container'])}
        >
            {carouselContent.headerTitle && (
                <div className="flex flex-col justify-center items-center pt-16 md:w-2/3 2xl:w-1/2 m-auto">
                    {carouselContent.subHeading && (
                        <p
                            style={{ color: subHeadingColor }}
                            className={s.subHeading}
                        >
                            {t(carouselContent.subHeading)}
                        </p>
                    )}
                    <h2
                        style={{ color: headingColor }}
                        className={`${s.header} font-bebasNeueExtraBold font-bold md:mb-14 md:leading-10 mb-3`}
                    >
                        {t(carouselContent.headerTitle)}
                    </h2>
                    {carouselContent.copy && (
                        <p style={{ color: copyColor }} className={s.copy}>
                            {t(carouselContent.copy)}
                        </p>
                    )}
                </div>
            )}
            <div className={cn(s['product-content-slider'], 'md:pt-24 pb-24')}>
                <Slider {...settings}>{contents}</Slider>
            </div>
        </div>
    )
}

export default ProductContentCarousel
