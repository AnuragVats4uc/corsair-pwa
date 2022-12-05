import Skeleton from 'react-loading-skeleton'
import ImageGridCard from './ImageGridCard'
import { ImageGridCardProps } from '../types'
import { TextLayout } from '../TextLayout'

import s from './image.module.scss'
import cn from 'classnames'

const ImageGrid = ({
    content,
    mainContainer,
    secondaryCardGrid,
    primaryCardGrid,
    fromBuiltInMount = false
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
    const primaryGrid = fromBuiltInMount ? s['primary-grid-built'] : primaryCard
    const secondaryGrid = fromBuiltInMount
        ? s['secondary-grid-built']
        : secondaryCard

    return (
        <div className={cn(s['image-grid'], 'image-grid')}>
            <TextLayout content={content} />
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
        </div>
    )
}

export default ImageGrid
