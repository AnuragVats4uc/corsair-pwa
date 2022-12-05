import {
    CTAType,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'
import { GridImage } from '../ImageGrid/ImageGrid'
import { IMeta } from '../types'
export type BuiltMultiMount = {
    title: string
    identifier: string
    meta: IMeta<'builtInMultiMount'>
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
export type CustomArrowProps = {
    onClick?: React.MouseEventHandler<HTMLDivElement>
    style?: React.CSSProperties
}
