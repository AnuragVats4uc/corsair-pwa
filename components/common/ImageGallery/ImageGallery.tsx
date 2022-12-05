import Image from 'next/image'
import React, { VFC } from 'react'
import s from './ImageGallery.module.scss'
import { ImageGallerySystem } from '../types'

type ImageGalleryProps = {
    content: ImageGallerySystem
}

const c = /*tw*/ {
    parent: 'bg-black',
    container: `md:p-12 py-12 flex items-center justify-center content-center ${s['gallery-row']}`,
    square: s.square,
    twoThree: s['two-three']
}

const ImageGallery: VFC<ImageGalleryProps> = ({
    content
}): JSX.Element | null => {
    const ratio = `${content.ratio ? c.square : c.twoThree}`
    return (
        <div className={content.pageBackgroundImage ? '' : c.parent}>
            <div className={c.container}>
                {content.images.map((image, index) => {
                    const title = image?.description
                    const background = image?.file
                    return (
                        <div className={ratio} key={index}>
                            <Image
                                alt={title}
                                src={background?.url}
                                width={background?.details?.image?.width}
                                height={background?.details?.image?.height}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ImageGallery
