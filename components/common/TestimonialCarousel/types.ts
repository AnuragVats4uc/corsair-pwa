import type { ITestimonialBlock, ITestimonialCarousel } from '../types'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export type TestimonialSliderProps = {
    testimonialBlocks: ITestimonialBlock[]
}

export type TestimonialBlockProps = {
    testimonialBlock: ITestimonialBlock
    position?: number
}

export type TestimonialBlockLogoImageProp = {
    logo: ImageType
}

export type TestimonialCarouselProps = {
    content: ITestimonialCarousel
}

export type DocumentColorsSetter = {
    backgroundColorHex?: string
    textColor?: string
}
