import React, { VFC } from 'react'
import Image from 'next/image'
import { IProductBlock } from '../types'
import s from './ProductBlock.module.scss'
import { CTA } from '@components/common/CTA'
import { useProductFetch } from '@pylot-data/hooks/product/use-product-fetch'
import { ProductStockStatus } from '@pylot-data/enums/ProductStockStatus.d'
import { AddToCartCTA } from './AddToCartCTA'
import { PriceRange } from '@pylot-data/fwrdschema'
import { usePrice } from '@corratech/pylot-price'
export type ProductBlockProps = {
    productBlock: IProductBlock & {
        priceRange: PriceRange
    }
}

const c = /*tw*/ {
    commonClass:
        'mt-8 bg-white font-aktivGrotesk text-xs lg:text-base rounded text-black leading-4 font-bold',
    ctaClass: 'py-3',
    addToCartClass: 'pt-1'
}

const ProductBlock: VFC<ProductBlockProps> = ({ productBlock }) => {
    const { cta, heading, image, text, priceRange } = productBlock

    const { product } = useProductFetch({ productUrl: cta?.url })
    const { subtotal, total } = usePrice(priceRange)

    const inStock = !!(
        product && product.stock_status === ProductStockStatus.InStock
    )

    return (
        <div className={s['product-block']}>
            <p className="text-2xl md:text-3xl mb-3 uppercase font-semibold tracking-widest font-bebasNeue">
                {heading}
            </p>
            <CTA cta={cta} showDisplayText={false}>
                <div className={`${s['image']}`}>
                    {image ? (
                        <Image
                            src={image.image.file.url}
                            alt={image?.image?.description || ''}
                            width={346}
                            height={346}
                            layout="responsive"
                        />
                    ) : null}
                </div>
            </CTA>
            <p className="text-center font-bebasNeueProMiddle text-white font-bold text-3xl mt-2">
                {total}
                {subtotal && subtotal !== total && (
                    <span
                        className="ml-4 text-2xl line-through"
                        style={{ color: '#A2A2A6' }}
                    >
                        {subtotal}
                    </span>
                )}
            </p>
            <p className={s['product-block-text']}>{text}</p>
            {inStock ? (
                <AddToCartCTA
                    sku={product?.sku}
                    uid={product?.uid}
                    product={product}
                    className={`${s['product-block-add-to-cart']} ${c.addToCartClass} ${c.commonClass}`}
                />
            ) : (
                <CTA
                    cta={cta}
                    className={`${s['product-block-cta']} ${c.commonClass} ${c.ctaClass}`}
                    isLearnMoreBtn
                />
            )}
        </div>
    )
}

export default ProductBlock
