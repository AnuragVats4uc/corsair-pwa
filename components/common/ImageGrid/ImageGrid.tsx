import Skeleton from 'react-loading-skeleton'
import ImageGridCard from './ImageGridCard'
import {
    CTAType,
    ImageLinkType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import { IMeta } from '../types'
import s from './image.module.scss'
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
export type ImageGridCardProps = {
    content: {
        identifier: string
        meta: IMeta<'imageGrid'> | IMeta<'builtInMultiMount'>
        primaryGrid: GridImage
        secondaryGrid: GridImage[]
        title: string
        backgroundSlider?: ImageType[]
    }
    mainContainer?: string
    primaryCardGrid?: string
    secondaryCardGrid?: string
}
const ImageGrid = ({
    content,
    mainContainer,
    secondaryCardGrid,
    primaryCardGrid
}: ImageGridCardProps): JSX.Element | null => {
    if (!content) return <Skeleton height="35vw" />
    const primaryGridContainer =
        content.secondaryGrid?.length === 2
            ? s['grid-class']
            : s['grid-class-2']
    const primaryCard =
        content.secondaryGrid?.length === 2
            ? s['primary-grid']
            : s['primary-grid-2']
    const secondaryCard =
        content.secondaryGrid?.length === 2
            ? s['secondary-grid']
            : s['secondary-grid-2']
    const primaryGrid =
        content.meta.contentType === 'builtInMultiMount'
            ? s['primary-grid-built']
            : primaryCard
    const secondaryGrid =
        content.meta.contentType === 'builtInMultiMount'
            ? s['secondary-grid-built']
            : secondaryCard
    return (
        <>
            <div
                className={mainContainer ? mainContainer : primaryGridContainer}
            >
                <div
                    className={primaryCardGrid ? primaryCardGrid : primaryGrid}
                >
                    <ImageGridCard contents={content?.primaryGrid} />
                </div>
                {content.secondaryGrid?.map((d, key) => (
                    <div
                        className={
                            secondaryCardGrid
                                ? secondaryCardGrid
                                : secondaryGrid
                        }
                        key={key}
                    >
                        <ImageGridCard contents={d} />
                    </div>
                ))}
            </div>
        </>
    )
}
export default ImageGrid
