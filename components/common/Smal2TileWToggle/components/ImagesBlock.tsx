import { VFC } from 'react'
import { Smal2TileWToggleProp } from '../types'
import Image from '@corratech/corsair-image'
import s from '../Smal2Tile.module.scss'
import cn from 'classnames'

const c = /*tw*/ {
    imageRoot: `${s['img']}`,
    doubleImageRoot: `${s['double-img']} flex flex-row items-end -z-1`,
    image: `block relative h-full max-w-full max-h-full`,
    imageRight: `${s['img-padding-right']} w-5/12 flex items-start`,
    imageLeft: `${s['img-padding-left']} w-7/12`,
    singleImage: `${s['img-padding-single']}`,
    imgBorder: `${s['img-border']}`
}

export const ImagesBlock: VFC<Smal2TileWToggleProp> = ({
    content: {
        imageRightOff,
        imageRightOn,
        imageLeft,
        isToggleOn,
        rightImageMargin
    }
}) => {
    const {
        description: rightImgDesc,
        file: { url: rightImgUrl }
    } = isToggleOn ? imageRightOn : imageRightOff

    return imageLeft ? (
        <div className={c.doubleImageRoot}>
            <div className={cn(c.image, c.imageLeft)}>
                <Image
                    className={c.imgBorder}
                    src={imageLeft.file.url}
                    alt={imageLeft.description}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className={cn(c.image, c.imageRight)}>
                <Image
                    className={c.imgBorder}
                    src={rightImgUrl}
                    alt={rightImgDesc}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        </div>
    ) : (
        <div className={cn(rightImageMargin && c.imageRoot)}>
            <div className={cn(c.image, c.singleImage)}>
                <Image
                    className={c.imgBorder}
                    src={rightImgUrl}
                    alt={rightImgDesc}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        </div>
    )
}
