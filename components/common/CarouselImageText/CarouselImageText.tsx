import { useState, useRef, VFC } from 'react'
import Slider from 'react-slick'
import { CarouselImageTextProp, Images, Slides } from '.'
import { Arrow } from '../CarouselProductTiles/Arrows'
import s from './CarouselImageText.module.scss'

const c = /*tw*/ {
    root: `${s['root']} text-white m-auto h-full`,
    heading: `${s['heading']} text-center uppercase font-bebasNeue`
}

export const CarouselImageText: VFC<CarouselImageTextProp> = ({ content }) => {
    const [activeSlide, setActiveSlide] = useState<number>(0)

    const sliderRef = useRef<Slider>(null)
    if (!content) return null
    const { productSlide } = content

    return (
        <div
            style={{
                backgroundColor: `#${content?.copyBlock?.backgroundColorHex}`,
                backgroundImage: `url("${content?.copyBlock?.backgroundImage?.file.url}")`
            }}
        >
            <div className={c.root}>
                {content?.copyBlock?.heading && (
                    <h2 className={c.heading}>{content?.copyBlock.heading}</h2>
                )}
                <div className="relative">
                    <Arrow
                        direction="left"
                        s={s}
                        onClick={() => sliderRef.current?.slickPrev()}
                    />
                    <Images slide={productSlide[activeSlide]} />
                    <Arrow
                        direction="right"
                        s={s}
                        onClick={() => sliderRef.current?.slickNext()}
                    />
                </div>
                <Slides
                    ref={sliderRef}
                    slides={productSlide}
                    current={activeSlide}
                    onChange={setActiveSlide}
                />
            </div>
        </div>
    )
}
