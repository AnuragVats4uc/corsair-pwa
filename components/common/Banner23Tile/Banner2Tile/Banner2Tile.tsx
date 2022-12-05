import { FC } from 'react'
import { Banner2TileItem } from './Banner2TileItem'
import { Banner23TileResponse } from '../types'

import s from './Banner2Tile.module.scss'
import cn from 'classnames'

export enum BannerTextAlignments {
    MIDDLE = 'middle',
    TOP = 'top'
}

const Banner2Tile: FC<Banner23TileResponse> = ({ content }) => {
    if (!content) {
        return null
    }

    const { bannerItems = [] } = content
    const classNameTileTop = 'image-container-top'
    const classNameTileMiddle = 'image-container-middle'

    return (
        <div
            className={cn(
                s['banner-container'],
                'flex flex-col box-border',
                !content.pageBackgroundImage && 'bg-black'
            )}
        >
            <div
                className={cn(
                    content.isSpaceBetweenTiles
                        ? s['content-group-top']
                        : s['content-group-middle']
                )}
            >
                <div className={s['content-group-1']}>
                    <Banner2TileItem
                        textAlignment={
                            content.textAlignment || BannerTextAlignments.MIDDLE
                        }
                        bannerItem={bannerItems[0]}
                        classNameContainer={
                            content.isSpaceBetweenTiles
                                ? classNameTileTop
                                : classNameTileMiddle
                        }
                    />
                </div>
                <div className={s['content-group-2']}>
                    <Banner2TileItem
                        textAlignment={
                            content.textAlignment || BannerTextAlignments.MIDDLE
                        }
                        bannerItem={bannerItems[1]}
                        classNameContainer={
                            content.isSpaceBetweenTiles
                                ? classNameTileTop
                                : classNameTileMiddle
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner2Tile
