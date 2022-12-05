import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import s from './SwitcherTab.module.scss'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import type { IMeta } from '@components/common/types'
import Image from '@corratech/corsair-image'
import IconButton from '../IconButton/IconButton'

export interface ImageInterface {
    image: ImageType
}

interface ISwitcher {
    iconImage: ImageInterface
    iconTitle: string
    iconSize: number
    meta: IMeta<'switchers'>
    productImage: ImageInterface
    productImageMobile: ImageInterface
}

export interface ProductSwitcherType {
    description: string
    meta: IMeta<'overlayProductContent'>
    switchers: ISwitcher[]
    title: string
}

interface ProductSwitcherProps {
    content: ProductSwitcherType
}

const SwitcherTab: FC<ProductSwitcherProps> = ({
    content: { description, switchers }
}) => {
    const [activeSwitcher, setActiveSwitcher] = useState(switchers[0])

    useEffect(() => {
        setActiveSwitcher(switchers[0])
    }, [switchers])

    const handleClick = (productContent: ISwitcher) => {
        setActiveSwitcher(productContent)
    }

    if (switchers.length < 2) {
        return null
    }

    return (
        <div className={s['product-content']}>
            <section className={s['product-content__description']}>
                <p className="font-light">{description}</p>
                <div className={cn('flex')}>
                    {switchers.map((item) => {
                        return (
                            <IconButton
                                key={item.iconTitle}
                                image={item.iconImage.image}
                                label={item.iconTitle}
                                onClick={() => handleClick(item)}
                                size={item.iconSize}
                                active={
                                    item.iconTitle === activeSwitcher.iconTitle
                                }
                            />
                        )
                    })}
                </div>
            </section>
            <section className={s['product-content__image']}>
                {activeSwitcher.productImage && (
                    <div
                        className={cn(
                            s['product-content__image-desktop'],
                            'relative'
                        )}
                    >
                        <Image
                            src={activeSwitcher.productImage.image.file.url}
                            alt={activeSwitcher.productImage.image.description}
                            width={
                                activeSwitcher.productImage.image.file.details
                                    .image.width
                            }
                            height={
                                activeSwitcher.productImage.image.file.details
                                    .image.height
                            }
                        />
                    </div>
                )}
                {activeSwitcher.productImageMobile && (
                    <div className={cn('relative md:hidden')}>
                        <Image
                            src={
                                activeSwitcher.productImageMobile.image.file.url
                            }
                            alt={
                                activeSwitcher.productImageMobile.image
                                    .description
                            }
                            width={
                                activeSwitcher.productImageMobile.image.file
                                    .details.image.width
                            }
                            height={
                                activeSwitcher.productImageMobile.image.file
                                    .details.image.height
                            }
                        />
                    </div>
                )}
            </section>
        </div>
    )
}

export default SwitcherTab
