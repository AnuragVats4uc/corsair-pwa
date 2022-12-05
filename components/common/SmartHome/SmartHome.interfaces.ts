import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export interface Details {
    size: number
    image: ImageType
}
export interface SmartHomePosition {
    top: number
    title: string
    left: number
    translateX: number
    translateY: number
    scale: number
    scalePriority: boolean
}

export interface SmartHomeProduct {
    title: string
    productTitle: string
    productDescription: string
    ctaUrl: string
    productImage: ImageType
    carouselLabel: string
    desktopPosition: SmartHomePosition
    mobilePosition: SmartHomePosition
    showOnMobile: boolean
}

export enum CardCurrentPosition {
    SMARTROOM_DESKTOP = 'desktopPosition',
    SMARTROOM_MOBILE = 'mobilePosition'
}
