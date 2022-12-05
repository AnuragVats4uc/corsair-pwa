import React, { VFC } from 'react'
import { IProductBlock } from '../types'
import s from './ProductItem.module.scss'
import { CTA } from '../CTA'

export type ProductItemProps = {
    product: IProductBlock
}

const c = /*tw*/ {
    productItem: `${s['product-item']} flex flex-col items-center`,
    productItemImage: `${s['product-item-image']} relative`,
    productItemHeading: `${s['product-item-heading']} text-center text-white uppercase font-aktivGrotesk`
}

const ProductItem: VFC<ProductItemProps> = ({ product }) => {
    return (
        <CTA showDisplayText={false} cta={product.cta}>
            <div className={c.productItem}>
                <div
                    className={c.productItemImage}
                    style={{
                        backgroundImage: `url(${product?.image?.image.file.url})`
                    }}
                />
                <p className={c.productItemHeading}>{product.heading}</p>
            </div>
        </CTA>
    )
}

export default ProductItem
