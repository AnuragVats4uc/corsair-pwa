import React, { FC } from 'react'
import Slider, { Settings } from 'react-slick'

export type SliderWrapperProps = {
    settings?: Settings
    className?: string
    containerClassName?: string
}

const SliderWrapper: FC<SliderWrapperProps> = ({
    settings = {},
    children,
    className = '',
    containerClassName = ''
}) => {
    const config: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        ...settings
    }
    return (
        <div className={containerClassName}>
            <Slider {...config} className={className}>
                {children}
            </Slider>
        </div>
    )
}

export default SliderWrapper
