import {
    ImageLinkType,
    VideoType,
    CTAType,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'

type Meta = {
    meta: { contentType: string }
}

export type GridImage = {
    caption: string
    identifier: string
    meta: Meta
    title: string
    logo?: ImageLinkType[]
    desktopMedia: ImageType | VideoType
    thumbnail?: ImageType
    ctaButton?: CTAType[]
    ctaButtonPosition: string
    logoPosition: string
}

export type IMGGridSystemProps = {
    title: string
    identifier: string
    meta: { contentType: string }
    gridType: string
    disclaimer: string
    body: string
    ctaButton: CTAType
    heading: string
    subHeading: string
    background?: ImageType[]
    primaryGrid: GridImage
    secondaryGrid: GridImage[]
    backgroundSlider: ImageType[]
}

export type ImageGridCardProps = {
    content: IMGGridSystemProps
    mainContainer?: string
    primaryCardGrid?: string
    secondaryCardGrid?: string
    fromBuiltInMount?: boolean
}

export interface IMGGridSystemResponse {
    content: IMGGridSystemProps
}

export type CustomArrowProps = {
    onClick?: React.MouseEventHandler<HTMLDivElement>
    style?: React.CSSProperties
}
