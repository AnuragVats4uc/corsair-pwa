import React, { FC, useState } from 'react'
import s from './ProductContent.module.scss'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { ITooltip, Tooltip } from '../../Tooltip/Tooltip'
import { ToolTipIcons } from '@components/common/OverlayProductBlock/ToolTipIcons'
import BackdropClick from '@components/common/BackDropClick/backdrop-click'
import type { IMeta } from '@components/common/types'
import { BackDropClickTooltip } from '@components/common/OverlayProductBlock/BackdropClickTooltip'

export interface ImageInterface {
    image: ImageType
}

export interface ImageResolutions {
    title: string
    desktopImage: ImageInterface
    mobileImage: ImageInterface
    tooltips: ITooltip[]
}

export interface ProductContentType {
    description: string
    image1: ImageResolutions
    image2: ImageResolutions
    meta: IMeta<'overlayProductContent'>
}

interface ProductContentProps {
    content: ProductContentType
}

const ProductContent: FC<ProductContentProps> = ({ content }) => {
    const [activeTooltip, setActiveTooltip] = useState<ITooltip | undefined>(
        undefined
    )

    const { description, image1, image2 } = content

    const handleClick = (tooltipContent: ITooltip) => {
        setActiveTooltip(tooltipContent)
    }

    const handleClose = () => {
        setActiveTooltip(undefined)
    }

    return (
        <div className={cn(s['product-content'], 'container')}>
            <section className={s['product-content__description']}>
                <p className={cn('font-bold')}>{description}</p>
            </section>
            <section className={s['product-content__image']}>
                {image1.desktopImage && (
                    <div>
                        <Image
                            src={image1.desktopImage.image.file.url}
                            alt={image1.desktopImage.image.description}
                            width={
                                image1.desktopImage.image.file.details.image
                                    .width
                            }
                            height={
                                image1.desktopImage.image.file.details.image
                                    .height
                            }
                        />
                        <div className={cn('relative')}>
                            <ToolTipIcons
                                isMobile
                                tooltips={image1.tooltips}
                                handleClick={handleClick}
                            />
                        </div>
                    </div>
                )}
                {(image1.mobileImage || image1.desktopImage) && (
                    <div className={cn('block sm:hidden')}>
                        <Image
                            src={
                                image1.mobileImage.image.file.url ||
                                image1.desktopImage.image.file.url
                            }
                            alt={
                                image1.mobileImage.image.description ||
                                image1.desktopImage.image.description
                            }
                            layout="fill"
                            objectFit="cover"
                        />
                        <ToolTipIcons
                            isMobile
                            tooltips={image1.tooltips}
                            handleClick={handleClick}
                        />
                    </div>
                )}
            </section>
            <section className={s['product-content__image']}>
                {image2.desktopImage && (
                    <div>
                        <Image
                            src={image2.desktopImage.image.file.url}
                            alt={image2.desktopImage.image.description}
                            width={
                                image2.desktopImage.image.file.details.image
                                    .width
                            }
                            height={
                                image2.desktopImage.image.file.details.image
                                    .height
                            }
                        />
                        <div className={cn('relative')}>
                            <ToolTipIcons
                                isMobile
                                tooltips={image2.tooltips}
                                handleClick={handleClick}
                            />
                        </div>
                    </div>
                )}
                {(image2.mobileImage || image2.desktopImage) && (
                    <div className={cn('block sm:hidden')}>
                        <Image
                            src={
                                image2.mobileImage.image.file.url ||
                                image2.desktopImage.image.file.url
                            }
                            alt={
                                image2.mobileImage.image.description ||
                                image2.desktopImage.image.description
                            }
                            layout="fill"
                            objectFit="cover"
                        />
                        <ToolTipIcons
                            isMobile
                            tooltips={image2.tooltips}
                            handleClick={handleClick}
                        />
                    </div>
                )}
            </section>

            <BackDropClickTooltip
                activeTooltip={activeTooltip}
                className="block sm:hidden"
                content={activeTooltip}
                onClick={handleClose}
                style={{
                    top: activeTooltip?.mobileCoordinate?.top,
                    left: activeTooltip?.mobileCoordinate?.left
                }}
            />

            <BackDropClickTooltip
                onClick={handleClose}
                content={activeTooltip}
                activeTooltip={activeTooltip}
                className="hidden sm:block"
                style={{
                    top: activeTooltip?.desktopCoordinate?.top,
                    left: activeTooltip?.desktopCoordinate?.left
                }}
            />
        </div>
    )
}

export default ProductContent
