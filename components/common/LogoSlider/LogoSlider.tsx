import { Arrow } from '../CarouselProductTiles/Arrows'
import Image from '@corratech/corsair-image'
import React, { VFC } from 'react'
import s from './LogoSlider.module.scss'
import Slider from 'react-slick'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export interface LogoSliderInterface {
    content?: {
        backgroundColor?: string
        backgroundImage?: ImageType
        heading?: string
        logos?: LogoType[]
        meta: {
            contentType: string
        }
        title: string
        pageBackgroundImage?: ImageType
    }
}

export interface LogoType {
    colorImage: ImageType
    grayscaleImage: ImageType
}

const c = {
    container: `${s.container} mx-auto my-auto w-full`,
    heading: `${s.heading} text-white normal-case font-bebasNeue font-semibold`,
    logo: `${s.logo} absolute top-0 left-0 right-0 bottom-0 h-full`,
    logoSlider: s.logoSlider,
    logoWrapper: `${s.logoWrapper} relative pb-full w-full border-solid`,
    slider: s.slider
}

const Logo: VFC<LogoType> = (logoImages): JSX.Element | null => {
    if (!logoImages) {
        return null
    }

    const { colorImage, grayscaleImage } = logoImages

    const {
        height: grayscaleImageHeight,
        width: grayscaleImageWidth
    } = grayscaleImage?.file.details.image

    return (
        <div className={c.logoWrapper}>
            <div className={c.logo}>
                {grayscaleImage && (
                    <Image
                        height={grayscaleImage?.file.details.image.height}
                        width={grayscaleImage?.file.details.image.width}
                        src={grayscaleImage?.file.url}
                    />
                )}
            </div>

            <div className={c.logo}>
                {colorImage && (
                    <Image
                        height={colorImage?.file.details.image.height}
                        width={colorImage?.file.details.image.width}
                        src={colorImage?.file.url}
                    />
                )}
            </div>
        </div>
    )
}

const LogoSlider: VFC<LogoSliderInterface> = ({
    content
}): JSX.Element | null => {
    if (!content) {
        return null
    }

    const { backgroundColor, backgroundImage, heading, logos, title } = content

    if (!logos) {
        return null
    }

    const { length: logosLength } = logos

    const sliderSettings = {
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        dots: true,
        draggable: true,
        infinite: logosLength >= 4,
        nextArrow: <Arrow direction="right" s={s} />,
        prevArrow: <Arrow direction="left" s={s} />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    centerPadding: '100px',
                    slidesToShow: 1
                }
            }
        ],
        slidesToShow: 4.5
    }

    const outputLogosList = logos?.map((element) => (
        <Logo key={title} {...element} />
    ))

    return (
        <section
            className={c.logoSlider}
            style={{
                backgroundImage: backgroundImage
                    ? `url(${backgroundImage?.file.url})`
                    : '',
                backgroundColor: content.pageBackgroundImage
                    ? ''
                    : `#${backgroundColor}`
            }}
        >
            {heading && (
                <div className={c.container}>
                    <h4 className={c.heading}>{heading}</h4>
                </div>
            )}
            {logos && <Slider {...sliderSettings}>{outputLogosList}</Slider>}
        </section>
    )
}

export default LogoSlider
