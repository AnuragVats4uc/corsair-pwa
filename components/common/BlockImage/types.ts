import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'

export type BlockProps = {
    heading?: string
    subHeading?: string
    title: string
    desktopImageVideo: ImageType | VideoType
    mobileImageVideo?: ImageType | VideoType
    type?: string
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
}
