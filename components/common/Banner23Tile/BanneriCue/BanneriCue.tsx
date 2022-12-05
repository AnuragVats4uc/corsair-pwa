import { FC } from 'react'
import { IcueBannerItem } from './IcueBannerItem'
import { Banner23TileResponse } from '../types'

import s from './BanneriCue.module.scss'
import cn from 'classnames'

const BanneriCue: FC<Banner23TileResponse> = ({ content }) => {
    if (!content) {
        return null
    }

    const { bannerItems = [] } = content

    return (
        <div className={cn(s['banner-container'])}>
            <div className={cn(s['content-group'])}>
                {bannerItems.map((bannerItem, index) => (
                    <IcueBannerItem
                        key={index}
                        bannerItem={bannerItem}
                        classNameContainer={s['image-container']}
                    />
                ))}
            </div>
        </div>
    )
}

export default BanneriCue
