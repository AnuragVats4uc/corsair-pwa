import React, { CSSProperties, VFC } from 'react'
import { CardCurrentPosition, SmartHomeProduct } from './SmartHome.interfaces'
import cn from 'classnames'
import s from './SmartHome.module.scss'
import { SmartHomeProductItem } from './SmartHomeProductItem'
import { SmartHomeCarousel } from './SmartHomeCarousel'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
import { SmartHomeCloseIcon } from '@components/icons/SmartRoomCloseIcon'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateTransform = (
    activeProduct: SmartHomeProduct | undefined,
    position: CardCurrentPosition
) => {
    if (activeProduct) {
        const { scalePriority, translateX, translateY, scale } = activeProduct[
            position
        ]

        if (scalePriority) {
            return `scale(${scale}) translateX(${translateX}%) translateY(${translateY}%) `
        }

        return `translateX(${translateX}%) translateY(${translateY}%) scale(${scale}) `
    }

    return `translateX(0%) translateY(0%) scale(1)`
}

export interface SmartHomeZoomContainerProps {
    backgroundImage: ImageType
    activeProduct: SmartHomeProduct | undefined
    products: SmartHomeProduct[]
    handleClose: (isMobile: boolean) => void
    setActiveProduct: (product: SmartHomeProduct) => void
}

export const SmartHomeZoomContainer: VFC<SmartHomeZoomContainerProps> = ({
    backgroundImage,
    activeProduct,
    products,
    setActiveProduct,
    handleClose
}) => {
    const transform = generateTransform(
        activeProduct,
        CardCurrentPosition.SMARTROOM_DESKTOP
    )
    const transformMobile = generateTransform(
        activeProduct,
        CardCurrentPosition.SMARTROOM_MOBILE
    )

    const style: CSSProperties = {
        opacity: activeProduct ? 1 : 0,
        zIndex: activeProduct ? 999 : -1
    }

    return (
        <div
            style={style}
            className="w-full fixed h-full overflow-hidden top-0 left-0 bottom-0 right-0"
        >
            <div
                className={cn(
                    s['smart-home-product-close-button'],
                    'top-56 right-4 absolute lg:hidden block'
                )}
            >
                <button
                    onClick={() => handleClose(true)}
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                >
                    <SmartHomeCloseIcon />
                </button>
            </div>
            <SmartHomeCarousel
                activeProduct={activeProduct}
                products={products}
                setActiveProduct={setActiveProduct}
            />
            <div
                className={cn(
                    s['smart-home-overlay-image-wrap'],
                    'absolute z-3 left-0  top-0 w-full h-full bg-black'
                )}
            >
                <div
                    className={cn(
                        s['smart-home-overlay-image'],
                        'z-30 opacity-100 w-full h-full lg:flex items-center hidden'
                    )}
                >
                    <div
                        className="opacity-100 z-30 flex items-center w-full h-auto top-0 left-0 bottom-0 right-0 m-auto relative"
                        style={{
                            transform
                        }}
                    >
                        <Image
                            src={backgroundImage.file.url}
                            alt={backgroundImage?.description || ''}
                            width={backgroundImage.file.details.image.width}
                            height={backgroundImage.file.details.image.height}
                        />
                    </div>
                </div>
                <div
                    style={{
                        transform: transformMobile,
                        minHeight: 735,
                        width: '600%'
                    }}
                    className={cn(
                        s['smart-home-overlay-image'],
                        'z-30 opacity-100 flex items-center h-full lg:hidden block absolute left-0 top-0 min-h-screen'
                    )}
                >
                    <Image
                        src={backgroundImage.file.url}
                        alt={backgroundImage?.description || ''}
                        width={backgroundImage.file.details.image.width}
                        height={backgroundImage.file.details.image.height}
                        objectFit="cover"
                    />
                </div>
            </div>
            <div className={cn(s['smart-home-products-cards'])}>
                <div className={cn(s['smart-home-products-wrapper'])}>
                    {products.map((product) => (
                        <SmartHomeProductItem
                            product={product}
                            active={
                                activeProduct &&
                                activeProduct.productTitle ===
                                    product.productTitle
                            }
                            key={product.productTitle}
                            handleClose={handleClose}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
