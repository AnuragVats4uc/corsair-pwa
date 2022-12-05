import React, { VFC } from 'react'
import { IINTProducts } from '../types'
import INTProductsItem, { INTProductsItemProps } from './INTProductsItem'
import s from './INTProducts.module.scss'
import { getThemeFromContent } from '@lib/getThemeFromContent'
import chunk from 'lodash/chunk'
import Image from '@corratech/corsair-image'
import { CTA } from '../CTA'

export type INTProductsProps = {
    content: IINTProducts
}

const c = /*tw*/ {
    container: `${s['int-products']} flex flex-col`,
    heading: `${s['int-products-heading']} uppercase font-bebasNeue text-center`,
    text: `${s['int-products-text']} font-aktivGrotesk text-center mx-auto`,
    image: `${s['int-products-image']} relative`,
    grid: `${s['int-products-grid']} hidden grid-cols-3 items-center mx-auto lg:grid`,
    mobileGrid: `mx-auto flex flex-col lg:hidden`
}

const renderProductList = (
    products: IINTProducts['intProductList'],
    extraProps: Omit<INTProductsItemProps, 'product'> = {}
) => {
    if (products) {
        return products.map((product) => (
            <INTProductsItem
                product={product}
                key={product.title}
                {...extraProps}
            />
        ))
    }

    return []
}

const INTProducts: VFC<INTProductsProps> = ({ content }) => {
    const theme = getThemeFromContent(content.theme)
    const chunkedProducts = chunk(
        content.intProductList,
        Math.ceil(content.intProductList?.length / 2)
    )
    const leftColumn = chunkedProducts[0]
    const rightColumn = chunkedProducts[1]

    return (
        <div style={{ ...theme }} className={c.container}>
            <p className={c.heading}>{content.heading}</p>
            <p className={c.text}>{content.text}</p>
            <div className={c.grid} style={{ color: theme.color }}>
                <div className="flex flex-col items-end">
                    {renderProductList(leftColumn)}
                </div>
                <div>
                    <div className={c.image}>
                        <Image
                            src={content.mainImage.image.file.url}
                            layout="fill"
                            alt={content.mainImage.image.description}
                        />
                    </div>
                </div>
                <div>
                    {renderProductList(rightColumn, {
                        className: 'flex-row-reverse justify-end'
                    })}
                </div>
            </div>
            <div className={c.mobileGrid}>
                <div className={c.image}>
                    <Image
                        src={content.mainImage.image.file.url}
                        layout="fill"
                        alt={content.mainImage.image.description}
                    />
                </div>
                <div className="mx-auto block lg:hidden">
                    <CTA cta={content.cta} className={s['int-products-cta']} />
                </div>
                <div>
                    {renderProductList(content.intProductList, {
                        className: 'flex-row-reverse justify-end'
                    })}
                </div>
            </div>
            <div className="mx-auto hidden lg:block">
                <CTA cta={content.cta} className={s['int-products-cta']} />
            </div>
        </div>
    )
}

export default INTProducts
