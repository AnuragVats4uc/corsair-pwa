import React from 'react'
import type { CSSProperties, VFC } from 'react'
import { useTranslation } from 'next-i18next'
import type { SmartHomeProduct } from './SmartHome.interfaces'

import cn from 'classnames'
import s from './SmartHome.module.scss'
import { SmartHomeCloseIcon } from '@components/icons/SmartRoomCloseIcon'
import Image from '@corratech/corsair-image'

interface SmartHomeProductItemProps {
    product: SmartHomeProduct
    handleClose: (isMobile: boolean) => void
    active: boolean | undefined
}

export const SmartHomeProductItem: VFC<SmartHomeProductItemProps> = ({
    product,
    active,
    handleClose
}) => {
    const { t } = useTranslation()

    const style: CSSProperties = {
        opacity: active ? 1 : 0,
        zIndex: active ? 1000 : 0
    }

    return (
        <div
            style={style}
            key={product.productTitle}
            className={cn(
                s['smart-home-product-item'],
                'absolute md:rounded-lg bottom-0 w-full md:mb-20 mb-4'
            )}
        >
            <div
                className={cn(
                    s['smart-home-product-item-image-wrapper'],
                    'w-auto block m-auto mb-4'
                )}
            >
                <span className="m-auto items-center justify-center">
                    <Image
                        src={product.productImage.file.url}
                        width={product.productImage.file.details.image.width}
                        height={product.productImage.file.details.image.height}
                        alt={product.productImage.description || ''}
                    />
                </span>
            </div>
            <div
                className={cn(
                    s['smart-home-product-close-button'],
                    'absolute hidden lg:block'
                )}
            >
                <button
                    onClick={() => handleClose(false)}
                    className="flex items-center justify-center rounded-full"
                >
                    <SmartHomeCloseIcon />
                </button>
            </div>
            <div className={cn(s['smart-home-product-card'], 'relative')}>
                <h4 className="font-bebasNeue text-4xl font-semibold uppercase text-white text-left md:leading-6 leading-10">
                    {product.productTitle}
                </h4>
                <p className="font-aktivGrotesk md:text-xl text-xl text-white text-left font-normal tracking-wider mt-8">
                    {product.productDescription}
                </p>
                <a
                    target="blank"
                    href={product.ctaUrl}
                    className="mt-8 w-full flex m-auto border border-solid border-white text-center text-white pb-4 px-10 hover:bg-white hover:text-black text-lg md:text-base"
                >
                    <span className="w-full flex items-center justify-center uppercase">
                        {t('Explore Product')}
                    </span>
                </a>
            </div>
        </div>
    )
}
