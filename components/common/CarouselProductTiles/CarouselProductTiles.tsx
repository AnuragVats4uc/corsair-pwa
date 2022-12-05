import s from './CarouselProductTiles.module.scss'
import Slider from 'react-slick'
import Slide from './Slide'
import cn from 'classnames'
import { ReactChild, ReactFragment, ReactPortal, useState } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { Arrow } from './Arrows'
import { ProductInterface } from '@pylot-data/pylotschema'
import { IMeta } from '../types'

type Override<T1, T2> = Omit<T1, keyof T2> & T2
type categorySlug = {
    identifier: string
}

export type ProductUrl = Override<
    ProductInterface,
    {
        identifier?: string
        primaryCategory: categorySlug
    }
>

type DesktopMobileImage = {
    desktopProductTitle: string
    desktopProductDescription: string
    mobileProductTitle: string
    desktop: ImageComponent
    mobile: ImageComponent
    productReference: ProductUrl
}

type ImageComponent = {
    title: string
    image: ImageType
    url: string
}

export type CSLObject = {
    identifier: string
    heading: string
    logo: ImageType
    productImages: DesktopMobileImage[]
    mainImage: ImageType
}

type CslData = CSLObject[]

export type CslContainerTiles = {
    identifier: string
    productSlide: CSLObject[]
    copyBlock?: { heading?: string }
    meta: IMeta<'carouselppContainer'>
    displayType: string
}

export type CarouselProps = {
    content: CslContainerTiles
}

const CarouselProductTiles = ({
    content: carouselContainer
}: CarouselProps): JSX.Element | null => {
    const [currentSlider, setCurrentSlider] = useState<number>(1)
    if (!carouselContainer) return null
    const productSlides: CslData = carouselContainer.productSlide
    const LIMIT_TO_ADD_ZERO = 10
    const addZero = (num: number): string | number =>
        num < LIMIT_TO_ADD_ZERO ? `0${num}` : num
    const renderCustomDots = (dots: React.ReactNode): JSX.Element => {
        const current = addZero(currentSlider)
        const sliderLength = addZero(productSlides.length)
        const currentActive = currentSlider === productSlides.length

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

    const defaultSettings = {
        autoplay: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        afterChange: (current: number) => setCurrentSlider(current + 1),
        prevArrow: <Arrow direction="left" s={s} />,
        nextArrow: <Arrow direction="right" s={s} />,
        appendDots: (
            dots:
                | boolean
                | ReactChild
                | ReactFragment
                | ReactPortal
                | null
                | undefined
        ) => renderCustomDots(dots)
    }

    return (
        <div>
            <h3 className={s['header']}>
                {carouselContainer?.copyBlock?.heading}
            </h3>
            <Slider {...defaultSettings} className={s['slider']}>
                {productSlides.map((prod, key) => {
                    return <Slide cslData={prod} key={key} />
                })}
            </Slider>
        </div>
    )
}

export default CarouselProductTiles
