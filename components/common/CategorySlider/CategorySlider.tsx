import React from 'react'
import s from './CategorySlider.module.scss'
import Skeleton from 'react-loading-skeleton'
import Slider from 'react-slick'
import Arrow from '@components/common/Carousel/Arrow/Arrow'
import Category, {
    CategoryInterface
} from '@components/common/CategorySlider/Category'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export interface CategorySliderInterface {
    title?: string
    backgroundImage?: ImageType
    identifier: string
    heading?: string
    collections?: CategoryInterface[]
    pageBackgroundImage?: ImageType
}

interface CategorySliderProps {
    content?: CategorySliderInterface | null
}

const CategorySlider = ({
    content
}: CategorySliderProps): JSX.Element | null => {
    if (!content) return <Skeleton height="35vw" />

    const { backgroundImage, collections, heading } = content

    const sliderBackgroundImage = {
        backgroundImage: `url(${backgroundImage?.file?.url})`
    }

    if (!collections) return null

    const { length: collectionsLength } = collections

    const defaultSettings = {
        arrows: true,
        dragable: true,
        infinite: collectionsLength >= 7,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        slidesToScroll: 7,
        slidesToShow: 7,
        responsive: [
            {
                breakpoint: 549,
                settings: {
                    infinite: collectionsLength >= 2,
                    slidesToScroll: 2,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 899,
                settings: {
                    infinite: collectionsLength >= 3,
                    slidesToScroll: 3,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1099,
                settings: {
                    infinite: collectionsLength >= 4,
                    slidesToScroll: 4,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1399,
                settings: {
                    infinite: collectionsLength >= 5,
                    slidesToScroll: 5,
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1800,
                settings: {
                    infinite: collectionsLength >= 6,
                    slidesToScroll: 6,
                    slidesToShow: 6
                }
            }
        ]
    }

    return (
        <section
            className={s['category-slider']}
            style={content.pageBackgroundImage ? {} : sliderBackgroundImage}
        >
            <span
                className="sr-only"
                role="img"
                aria-label={backgroundImage?.description || ''}
            />
            <h1 className={s.text}>{heading}</h1>
            <Slider {...defaultSettings} className={s.list}>
                {collections?.map((element, index: number) => (
                    <Category key={index} content={element} />
                ))}
            </Slider>
        </section>
    )
}

export default CategorySlider
