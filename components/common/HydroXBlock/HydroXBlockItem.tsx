import { FC } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Link from 'next/link'
import Image from 'next/image'
import s from './HydroXBlock.module.scss'
import cn from 'classnames'

export interface HydroXCards {
    title: string
    url: string
    image: ImageType
    Key: string
    newTab: boolean
}

const twClasses = /*tw*/ {
    imageHeading:
        'text-white font-bold font-secondary absolute flex justify-center items-center w-full h-full px-2.5 py-0 text-center'
}
export const HydroXBlockItem: FC<HydroXCards> = ({
    title,
    url,
    image,
    newTab
}): JSX.Element => {
    const {
        file: { url: imageUrl },
        description: imageTitle
    } = image
    return (
        <Link href={url}>
            <a target={newTab ? '_blank' : '_self'}>
                <div
                    className={cn(
                        s['ImageWithText'],
                        'flex flex-col relative cursor-pointer'
                    )}
                >
                    <Image
                        alt={imageTitle}
                        height={120}
                        src={imageUrl}
                        width={148}
                        layout="responsive"
                    />
                    <div
                        className={cn(
                            s['ImageHeading'],
                            s['hydroXblock-fonts'],
                            twClasses.imageHeading
                        )}
                    >
                        {title}
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default HydroXBlockItem
