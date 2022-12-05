import { FC, SetStateAction, useState } from 'react'
import s from './ProductFamily.module.scss'
import cn from 'classnames'
import ProductFamilyBlockVariant from './ProductFamilyBlockVariant'
import { useTranslation } from 'next-i18next'
import { ProductFamilyBlockVariantType, ProductFamilyBlockType } from '../types'
import Image from '@corratech/corsair-image'
import { ProductPrice } from '../ProductPrice/ProductPrice'
import { AddToCartCTA } from '../ProductBlock/AddToCartCTA'
import { useProductFetch } from '@pylot-data/hooks/product/use-product-fetch'
import { find } from 'lodash'
import Link from 'next/link'

interface ProductFamilyBlockProps {
    productBlock: ProductFamilyBlockType
    key: number
}

const ProductFamilyBlock: FC<ProductFamilyBlockProps> = ({
    productBlock,
    key
}) => {
    const [activeVariantSku, setActiveVariantSku] = useState(null)
    const [productVariantURL, setProductVariantURL] = useState(undefined)

    const { t } = useTranslation(['common'])

    const url_key = productBlock.productSlug as string

    const { product } = useProductFetch({ sku: null, url_key })

    const selectedVariant = find(product?.variants, {
        product: { url_key: productBlock?.sku }
    })

    const handleSetActiveVariantSku = (uid: SetStateAction<null>) => {
        setActiveVariantSku(uid)
    }

    const handleSetProductVariantURL = (url: SetStateAction<undefined>) => {
        setProductVariantURL(url)
    }

    const classNameVariantImage =
        productBlock?.variants?.length > 1 ? s['margin-x-10'] : 'mx-0'

    return (
        <div
            className={`p-6 flex flex-col items-center ${s['swatch-buttons-container']}`}
            key={key}
        >
            <p className={`${cn(s['items-to-center'])} ${s['heading-block']}`}>
                {productBlock.description}
            </p>

            <div
                className={`${cn(s['items-to-center'])} ${
                    s['product-image-container']
                }`}
            >
                {productBlock.variants.map(
                    (
                        productBlockVariant: ProductFamilyBlockVariantType,
                        index: number
                    ) => (
                        <Image
                            key={productBlockVariant.sku}
                            src={
                                productVariantURL ??
                                productBlock.primaryImage.file.url!
                            }
                            alt={productBlock.primaryImage.description}
                            className={`${
                                index === 0 ||
                                productBlockVariant.sku === activeVariantSku
                                    ? s['transition-image-visible']
                                    : s['transition-image-invisible']
                            }
                            }`}
                            layout="fill"
                        />
                    )
                )}
            </div>

            <div className={`${s['variant-image']}`}>
                {productBlock?.variants.map(
                    (
                        productBlockVariant: ProductFamilyBlockVariantType,
                        index: number
                    ) => (
                        <div key={productBlockVariant.sku}>
                            <ProductFamilyBlockVariant
                                index={index}
                                {...{
                                    productBlockVariant,
                                    handleSetActiveVariantSku,
                                    activeVariantSku,
                                    handleSetProductVariantURL,
                                    productVariantURL,
                                    classNameVariantImage
                                }}
                            />
                        </div>
                    )
                )}
            </div>

            {productBlock?.showPrice && product?.price_range ? (
                <div className="flex w-full">
                    <div className="product-price-container">
                        <ProductPrice
                            priceRange={product?.price_range}
                            className={`text-5xl ${String(
                                product?.__typename
                            ).toLowerCase()}`}
                        />
                    </div>
                </div>
            ) : (
                <div className="no-prices" />
            )}
            <div
                className={`flex ${cn({
                    'justify-between': productBlock?.showPrice
                })}`}
            >
                {product?.sku && productBlock?.showPrice && (
                    <AddToCartCTA
                        sku={selectedVariant?.product?.sku}
                        uid={selectedVariant?.product?.uid}
                        product={product}
                        className="bg-white text-black rounded-md"
                    />
                )}
                <button
                    className={`text-white border-white border-2 ${cn({
                        [s['button-space']]: productBlock?.showPrice
                    })} rounded-md`}
                >
                    <Link href={productBlock?.productSlug}>
                        {t('Learn more')}
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default ProductFamilyBlock
