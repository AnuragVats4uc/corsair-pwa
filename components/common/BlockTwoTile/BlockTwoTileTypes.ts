import {
    CTAType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import {
    IHorizontalGraphSingleBarsType,
    IMeta,
    IVerticalGraphDoubleBarsType,
    IVerticalGraphSingleBarsType
} from '../types'
import { ListsTableInterface } from '../ListsTable/ListsTable'
import { Content } from '../TableComparison/TableComparison.interfaces'

export interface Icons {
    title: string
    image: ImageType
    description: string
    identifier: string
    height?: number
    width?: number
}

export interface BlockTwoTileResponse {
    subHeading: string
    heading?: string
    layoutType: string
    sectionTitle?: string
    logo?: ImageType
    layoutPosition: string
    imagevideo: ImageType | VideoType
    imageWidth?: string
    imageHeight?: string
    description?: string
    iconAndText?: Icons[]
    backgroundImage?: ImageType | VideoType
    colorCodeGradient: string
    useImageAsBackground: boolean
    logoPosition: string
    logoWidth?: string
    logoHeight?: string
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
    callouts: {
        content: string
        identifier: string
        meta: IMeta<'callouts'>
        title: string
    }[]
    animation: boolean
    disclaimerBlock: string
    copyBlock: {
        meta: IMeta<'copyBlock'>
        text: string
        title: string
    }
    imagevideoFrame: ImageType
    frame: boolean
    cta: {
        descriptionPosition: string
        ctaRichText: string
        cta: CTAType
        title: string
        image?: ImageType
    }[]
    charts: Array<
        | IVerticalGraphDoubleBarsType
        | IHorizontalGraphSingleBarsType
        | IVerticalGraphSingleBarsType
    >
    tables: Array<ListsTableInterface | Content>
    verticalAlignmentText: string
    fontColor: string
    pageBackgroundImage?: ImageType
}
