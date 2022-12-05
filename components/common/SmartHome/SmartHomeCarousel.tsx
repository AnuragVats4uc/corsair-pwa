import React, { VFC } from 'react'
import Slider, { Settings } from 'react-slick'
import { Arrow } from './icons/Arrow'
import type { SmartHomeProduct } from './SmartHome.interfaces'
import cn from 'classnames'
import s from './SmartHome.module.scss'

interface SmartHomeCarouselProps {
    products: SmartHomeProduct[]
    activeProduct: SmartHomeProduct | undefined
    setActiveProduct: (product: SmartHomeProduct) => void
}

interface SmartHomeCarouseLabelProps {
    product: SmartHomeProduct
    setActiveProduct: (product: SmartHomeProduct) => void
    isActive: boolean
    showOnMobile: boolean
}

export const SmartHomeCarouseLabel: VFC<SmartHomeCarouseLabelProps> = ({
    product,
    isActive,
    setActiveProduct,
    showOnMobile
}) => {
    const customClassName = showOnMobile ? 'block' : 'md:block hidden'

    return (
        <div
            className={cn(
                s['smart-home-product-carousel-label'],
                {
                    [s['active']]: isActive
                },
                'mr-8',
                customClassName
            )}
        >
            <button
                className="font-bebasNeueExtraBold text-xl md:text-2xl opacity-75 whitespace-no-wrap uppercase outline-none text-white hover:opacity-100"
                onClick={() => setActiveProduct(product)}
            >
                {product.carouselLabel}
            </button>
        </div>
    )
}

export const SmartHomeCarousel: VFC<SmartHomeCarouselProps> = ({
    products,
    activeProduct,
    setActiveProduct
}) => {
    const settings: Settings = {
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        slidesToShow: 6,
        infinite: true,
        variableWidth: true,
        arrows: true,
        centerMode: false,
        speed: 400,
        prevArrow: <Arrow direction="left" />,
        nextArrow: <Arrow direction="right" />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }

    const productCarouselItems = products.map((product) => {
        const isActive = activeProduct
            ? activeProduct.carouselLabel === product.carouselLabel
            : false

        return (
            <SmartHomeCarouseLabel
                key={product.carouselLabel}
                isActive={isActive}
                product={product}
                setActiveProduct={setActiveProduct}
                showOnMobile={product.showOnMobile}
            />
        )
    })

    return (
        <div className={cn(s['smart-home-product-carousel'])}>
            <div
                className={cn(
                    s['smart-home-product-carousel-wrapper'],
                    'absolute md:pt-52 pt-40 md:px-20 px-10 pb-16 w-full'
                )}
            >
                <div className="">
                    <Slider {...settings}>{productCarouselItems}</Slider>
                </div>
            </div>
        </div>
    )
}
