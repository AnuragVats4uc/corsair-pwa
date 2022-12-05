import { FC } from 'react'
import { VidGalleryItem } from './VidGalleryItem'
import type { BannerItemType } from '../Carousel/Carousel'
import s from './VidGallery.module.scss'
import cn from 'classnames'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export enum VidGalleryTextAlignments {
    ON = 'yes',
    BELOW = 'no'
}
export interface VidGalleryResponse {
    title: string
    identifier: string
    bannerItems: BannerItemType[]
    textOnVideo?: VidGalleryTextAlignments
    darkMode?: boolean
    pageBackgroundImage?: ImageType
}
interface VidGalleryProps {
    content: VidGalleryResponse | null
}

export const VidGallery: FC<VidGalleryProps> = ({ content }) => {
    if (!content) {
        return null
    }
    const title = content.title
    const { bannerItems = [] } = content

    const classNameGroup =
        content.textOnVideo === VidGalleryTextAlignments.ON
            ? 'content-group-on'
            : 'content-group-below'

    const backgroundColor = content.darkMode ? '#000' : '#FFF'
    const titleColor = content.darkMode ? '#FFF' : '#000'
    const background = {
        backgroundColor: backgroundColor
    }
    return (
        <div
            className={s['vidgallery-container']}
            style={content.pageBackgroundImage ? {} : background}
        >
            <h1
                className={cn(s['module-title'])}
                style={{
                    color: titleColor,
                    backgroundColor: content.pageBackgroundImage
                        ? ''
                        : backgroundColor
                }}
            >
                {title}
            </h1>
            <div className={cn(s[classNameGroup])}>
                {bannerItems.map((vidGalleryItem, index) => (
                    <VidGalleryItem
                        key={index}
                        textOnVideo={
                            content.textOnVideo ||
                            VidGalleryTextAlignments.BELOW
                        }
                        bannerItem={vidGalleryItem}
                        darkMode={content.darkMode}
                    />
                ))}
            </div>
        </div>
    )
}

export default VidGallery
