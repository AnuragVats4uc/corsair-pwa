import {
    CTAType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'

export type UniteYourSetup = {
    title?: string
    identifier?: string
    heading?: string
    text?: string
    body?: string
    ctaButton?: CTAType
    logo?: ImageType
    ctaLocation?: string
    backgroundImage?: ImageType
    desktopImageVideo?: VideoType | ImageType
    type?: string
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
}
