import { FC } from 'react'
import Banner3TileImage from './Banner3TileItem'
import { Banner23TileResponse } from '../types'

import s from './Banner3Tile.module.scss'
import cn from 'classnames'

const LAYOUT_ROW = 'row'
const LAYOUT_COLUMN = 'column'
const THREE_BANNERS_ROW = '3 Banners Row'

const Banner3Tile: FC<Banner23TileResponse> = ({ content }) => {
    if (!content || content?.bannerItems?.length === 0) {
        return null
    }
    const bannerItems = content.bannerItems.slice(0, 3)
    const layout =
        content?.bannersType === THREE_BANNERS_ROW ? LAYOUT_ROW : LAYOUT_COLUMN
    const classNameTile = 'image-container'
    const className3rdTile = 'image-container-3rd-tile'

    return (
        <div
            className={cn(
                s['banner-container'],
                layout === 'row' && s['footer-banner'],
                !content.pageBackgroundImage && 'bg-black'
            )}
        >
            {layout === 'row' && (
                <div className={s['content-group-1']}>
                    {bannerItems.map((bannerItem, index) => (
                        <Banner3TileImage
                            key={index}
                            bannerItem={bannerItem}
                            classNameContainer={classNameTile}
                        />
                    ))}
                </div>
            )}
            {layout === LAYOUT_COLUMN && (
                <>
                    <div className={s['content-group-1']}>
                        {bannerItems.slice(0, 2).map((bannerItem, index) => (
                            <Banner3TileImage
                                key={index}
                                bannerItem={bannerItem}
                                classNameContainer={classNameTile}
                            />
                        ))}
                    </div>
                    <div className={s['content-group-2']}>
                        <Banner3TileImage
                            bannerItem={bannerItems[2]}
                            classNameContainer={className3rdTile}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Banner3Tile
