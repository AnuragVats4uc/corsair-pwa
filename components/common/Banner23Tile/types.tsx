import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import type { BannerItemType } from '../Carousel/Carousel'
import { BannerTextAlignments } from './Banner2Tile/Banner2Tile'

export interface Banner23TileProps {
    title: string
    identifier: string
    bannersType: string
    bannerItems: BannerItemType[]
    textAlignment?: BannerTextAlignments
    isSpaceBetweenTiles?: boolean
    pageBackgroundImage?: ImageType
}

export interface Banner2TileItemProps {
    textAlignment: BannerTextAlignments
    bannerItem: BannerItemType
    classNameContainer?: string
}

export interface PopupVideoPlayerProps {
    videourl: string
}

export interface Banner3TileImageProps {
    bannerItem: BannerItemType
    classNameContainer?: string
}

export interface Banner3TileImageProps {
    bannerItem: BannerItemType
    classNameContainer?: string
}

export interface IcueBannerItemProps {
    bannerItem: BannerItemType
    classNameContainer?: string
}

export interface Banner23TileResponse {
    content: Banner23TileProps
}
