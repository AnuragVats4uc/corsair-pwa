import React, { HTMLAttributes, VFC } from 'react'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
import { IINTProductItem } from '../types'
import s from './INTProductsItem.module.scss'
import { CTA } from '../CTA'
import { getThemeFromContent } from '@lib/getThemeFromContent'

export type INTProductsItemProps = {
    product: IINTProductItem
    className?: HTMLAttributes<HTMLDivElement>['className']
}

const c = /*tw*/ {
    container: `${s['int-products-item']} flex items-center`,
    image: `${s['int-products-item-image']} relative rounded-full`,
    heading: `${s['int-products-item-heading']} font-bebasNeue uppercase`
}

const IMAGE_SIZES = '50vw'

const INTProductsItem: VFC<INTProductsItemProps> = ({ product, className }) => {
    const theme = getThemeFromContent(product.theme)
    return (
        <CTA cta={product.cta} showDisplayText={false}>
            <div className={cn(c.container, className)}>
                <p className={c.heading} style={{ color: theme.color }}>
                    {product.heading}
                </p>
                <div
                    className={c.image}
                    style={{
                        borderColor: theme.color,
                        backgroundColor: theme.backgroundColor
                    }}
                >
                    <Image
                        layout="fill"
                        sizes={IMAGE_SIZES}
                        src={product.productImage.image.file.url}
                        alt={product.productImage.image.description}
                    />
                </div>
            </div>
        </CTA>
    )
}

export default INTProductsItem
