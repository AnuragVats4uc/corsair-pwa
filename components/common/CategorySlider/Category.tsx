import React from 'react'
import s from './CategorySlider.module.scss'
import Image from 'next/image'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Link from 'next/link'

export interface CategoryInterface {
    backgroundColor?: string
    identifier: string
    image: ImageType
    title: string
    url: string
}

const Category = ({
    content
}: {
    content: CategoryInterface
}): JSX.Element | null => {
    const { image: collectionImage, title, backgroundColor, url } = content
    const { description, file } = collectionImage
    const categoryBackgroundImage = {
        backgroundImage: backgroundColor
    }

    return (
        <Link href={url} passHref>
            <button className={s.card} style={categoryBackgroundImage}>
                <div className={`${s.image} relative`}>
                    <Image
                        alt={description || ''}
                        height={400}
                        src={file.url}
                        width={400}
                    />
                </div>
                <h3 className={s.title}>{title}</h3>
            </button>
        </Link>
    )
}

export default Category
