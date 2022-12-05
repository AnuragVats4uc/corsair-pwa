import { FC, useState } from 'react'
import cn from 'classnames'
import s from './ProductOverviewTab.module.scss'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { ITooltip } from '../Tooltip/Tooltip'
import { ToolTipIcons } from '@components/common/OverlayProductBlock/ToolTipIcons'
import type { IHTMLBlock, IMeta } from '@components/common/types'
import Image from '@corratech/corsair-image'
import { BackDropClickTooltip } from '../OverlayProductBlock/BackdropClickTooltip'
import { HtmlBlock } from '../HtmlBlock'

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
    imageComparison: IHTMLBlock
    logo: ImageType
    meta: IMeta<'overlayProductContent'>
}

interface ProductContentProps {
    content: ProductContentType
}

const ProductOverviewTab: FC<ProductContentProps> = ({
    content: { description, image1, image2, imageComparison, logo }
}) => {
    const [activeTooltip, setActiveTooltip] = useState<ITooltip | undefined>(
        undefined
    )

    const handleClick = (tooltipContent: ITooltip) => {
        setActiveTooltip(tooltipContent)
    }

    const handleClose = () => {
        setActiveTooltip(undefined)
    }

    return (
        <div className={s['product-content']}>
            <section className={s['product-content__description']}>
                {logo?.file && (
                    <div className={s['logo-container']}>
                        <Image
                            src={logo.file.url}
                            alt={logo.description}
                            width={logo.file.details.image.width}
                            height={logo.file.details.image.height}
                            objectFit="contain"
                        />
                    </div>
                )}
                <p
                    dangerouslySetInnerHTML={{ __html: description }}
                    className={cn('font-light')}
                />
            </section>
            <section className={cn(s['product-content__image'], 'relative')}>
                {image1?.desktopImage && (
                    <div
                        className={cn(
                            s['product-content__image-desktop'],
                            'relative'
                        )}
                    >
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
                        <div className={cn('block')}>
                            <ToolTipIcons
                                isMobile={false}
                                tooltips={image1.tooltips}
                                handleClick={handleClick}
                            />
                        </div>
                    </div>
                )}

                <BackDropClickTooltip
                    onClick={handleClose}
                    content={activeTooltip}
                    activeTooltip={activeTooltip}
                    className="hidden lg:block"
                    imageLeft
                    style={{
                        top: activeTooltip?.desktopCoordinate?.top,
                        left: activeTooltip?.desktopCoordinate?.left
                    }}
                />

                {image1?.mobileImage && (
                    <div className={s['product-content__image-mobile']}>
                        <Image
                            src={image1.mobileImage.image.file.url}
                            alt={image1.mobileImage.image.description}
                            width={
                                image1.mobileImage.image.file.details.image
                                    .width
                            }
                            height={
                                image1.mobileImage.image.file.details.image
                                    .height
                            }
                        />
                        <ToolTipIcons
                            isMobile
                            tooltips={image1.tooltips}
                            handleClick={handleClick}
                        />
                    </div>
                )}

                {imageComparison && <HtmlBlock props={imageComparison} />}
            </section>
            {image2 && (
                <section
                    className={cn(s['product-content__image'], 'relative')}
                >
                    {image2?.desktopImage && (
                        <div
                            className={cn(
                                s['product-content__image-desktop'],
                                'relative'
                            )}
                        >
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
                            <div className={cn('block')}>
                                <ToolTipIcons
                                    isMobile={false}
                                    tooltips={image2.tooltips}
                                    handleClick={handleClick}
                                />
                            </div>
                        </div>
                    )}
                    <BackDropClickTooltip
                        onClick={handleClose}
                        content={activeTooltip}
                        activeTooltip={activeTooltip}
                        className="hidden lg:block"
                        imageLeft
                        style={{
                            top: activeTooltip?.desktopCoordinate?.top,
                            left: activeTooltip?.desktopCoordinate?.left
                        }}
                    />
                    {image2?.mobileImage && (
                        <div className={s['product-content__images']}>
                            <Image
                                src={image2.mobileImage.image.file.url}
                                alt={image2.mobileImage.image.description}
                                width={
                                    image2.mobileImage.image.file.details.image
                                        .width
                                }
                                height={
                                    image2.mobileImage.image.file.details.image
                                        .height
                                }
                            />
                            <ToolTipIcons
                                isMobile
                                tooltips={image2.tooltips}
                                handleClick={handleClick}
                            />
                        </div>
                    )}
                </section>
            )}
            <BackDropClickTooltip
                onClick={handleClose}
                content={activeTooltip}
                activeTooltip={activeTooltip}
                className="block lg:hidden"
                imageLeft
                style={{
                    top: activeTooltip?.desktopCoordinate?.top,
                    left: activeTooltip?.desktopCoordinate?.left
                }}
            />
        </div>
    )
}

export default ProductOverviewTab
