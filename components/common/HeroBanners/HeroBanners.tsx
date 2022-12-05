import React from 'react'
import { CarouselType } from '../Carousel/Carousel'
import dynamic from 'next/dynamic'

const Carousel = dynamic(() => import('@components/common/Carousel'))
const HeroBanner = dynamic(() => import('@components/common/HeroBanner'))

export type HeroBannerProps = {
    content: CarouselType
}
const HeroBanners = ({ content }: HeroBannerProps) => {
    const heroBanners = () => {
        switch (content?.type) {
            case 'Sliding Hero Banner': {
                return <Carousel content={content} />
            }
            case 'Standard Hero': {
                return <HeroBanner content={content} />
            }
        }
    }
    return <>{heroBanners()}</>
}
export default HeroBanners
