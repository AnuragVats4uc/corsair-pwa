import s from './ProductFamily.module.scss'
import Slider from 'react-slick'
import ProductFamilyBlock from './ProductFamilyBlock'
import cn from 'classnames'
import { useState } from 'react'
import { Arrow } from '../CarouselProductTiles/Arrows'
import { ProductFamilyResponse, ProductFamilyBlockType } from '../types'

const c = /*tw*/ {
    blockContainer: s['block-container'],
    hasAnimation: [s['extra-info-container'], s['has-animate']],
    onScreen: s['onScreen'],
    slider: s['slider'],
    sliderContainer: s['slider-container'],
    container: s['container'],
    headerWrapper: s['extra-info-wrapper'],
    textContainer: s['text-container'],
    heading: s['heading'],
    subHeading: s['sub-heading'],
    headingText: s['heading-text']
}

export type ProductFamilyProps = {
    content: ProductFamilyResponse | null
}

const ProductFamily = ({ content }: ProductFamilyProps): JSX.Element | null => {
    const [currentSlider, setCurrentSlider] = useState<number>(1)

    const defaultSettings = {
        afterChange: (current: number) => {
            setCurrentSlider(current + 1)
        },
        arrows: true,
        autoplay: false,
        classNames: 'center',
        draggable: true,
        infinite: true,
        nextArrow: <Arrow direction="right" s={s} />,
        prevArrow: <Arrow direction="left" s={s} />,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2.5
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1670,
                settings: {
                    slidesToShow: 3.5
                }
            }
        ],
        slidesToScroll: 1,
        slidesToShow: 4.5
    }

    if (!content) {
        return null
    }

    const { heading, backgroundColor, productBlocks } = content

    const SliderDots = () => {
        return (
            <div className="slick-dots">
                <p className={s['dot-counter']}>{currentSlider}</p>
                <ul
                    className={cn(
                        s['product-carousel-custom-dots'],
                        'w-full flex items-center justify-center'
                    )}
                >
                    {productBlocks?.map(
                        (
                            productBlock: ProductFamilyBlockType,
                            index: number
                        ) => (
                            <li
                                key={productBlock.sku}
                                className={
                                    index + 1 === currentSlider
                                        ? 'slick-active'
                                        : ''
                                }
                            >
                                <button />
                            </li>
                        )
                    )}
                </ul>
                <p className={s['dot-counter']}>{productBlocks.length}</p>
            </div>
        )
    }

    return (
        <div
            className={`${cn(c.container)}`}
            style={{ backgroundColor: backgroundColor }}
        >
            <h3
                className={`w-full mx-auto ${cn(
                    s['items-to-center']
                )} text-white text-6xl font-bold uppercase`}
            >
                {heading}
            </h3>
            <div
                className={`mt-32 ${cn(s['productfamily-container'])}`}
                style={{ backgroundColor: backgroundColor }}
            >
                <div className={c.sliderContainer}>
                    <Slider {...defaultSettings} className={c.slider}>
                        {productBlocks?.map(
                            (
                                productBlock: ProductFamilyBlockType,
                                index: number
                            ) => (
                                <ProductFamilyBlock
                                    key={index}
                                    productBlock={productBlock}
                                />
                            )
                        )}
                    </Slider>
                    <SliderDots />
                </div>
            </div>
        </div>
    )
}

export default ProductFamily
