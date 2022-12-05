import { VFC } from 'react'
import type { CarouselSlideProp } from '.'
import Image from '@corratech/corsair-image'
import s from './CarouselImageText.module.scss'

const c = /*tw*/ {
    imageRoot: `${s['image-root']} lg:w-2/3 m-auto relative`
}

export const Images: VFC<CarouselSlideProp> = ({ slide }) => {
    if (!slide) return null
    const {
        mainImage: {
            file: {
                url,
                details: {
                    image: { width, height }
                }
            },
            description
        },
        secondaryImage,
        secondaryImageCoordinates
    } = slide

    const { top, left } = secondaryImageCoordinates || {}
    const isResizable = slide?.imageWidth && slide?.imageHeight

    return (
        <div className={c.imageRoot}>
            <div className="flex flex-col h-full justify-center">
                <div className={`'relative' ${isResizable && 'mx-auto'}`}>
                    <Image
                        src={url}
                        alt={description}
                        {...(!isResizable && { layout: 'responsive' })}
                        width={slide?.imageWidth ? slide?.imageWidth : width}
                        height={
                            slide?.imageHeight ? slide?.imageHeight : height
                        }
                    />
                    {secondaryImage && (
                        <div
                            className="w-1/3 absolute"
                            style={{ top: top, left: left }}
                        >
                            <Image
                                src={secondaryImage.file.url}
                                alt={secondaryImage.description}
                                layout="responsive"
                                width={secondaryImage.file.details.image.width}
                                height={
                                    secondaryImage.file.details.image.height
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
