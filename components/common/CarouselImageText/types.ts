import { Ref } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { ICopyBlock, IMeta } from '../types'
import Slider from 'react-slick'

export type CarouselImageTextProp = {
    content: CarouselImageTextType
}

export type CarouselImageTextSlideProp = {
    slides: CarouselImageTextSlideType[]
    current: number
    onChange: (next: number) => void
    ref: Ref<Slider>
}

export type CarouselImageTextType = {
    copyBlock?: ICopyBlock
    title: string
    productSlide: CarouselImageTextSlideType[]
    meta: IMeta<'carouselppContainer'>
    displayType: string
}

export type CarouselImageTextSlideType = {
    title: string
    heading?: string
    text?: string
    mainImage: ImageType
    imageWidth?: string
    imageHeight?: string
    secondaryImage?: ImageType
    secondaryImageCoordinates?: ImageCoordinates
    meta: IMeta<'cslImagetextSlide'>
}

export type ImageCoordinates = {
    top?: string
    left?: string
    meta: IMeta<'calloutTextPoints'>
}

export type CarouselSlideProp = {
    slide: CarouselImageTextSlideType
}
