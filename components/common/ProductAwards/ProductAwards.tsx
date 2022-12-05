import React, { VFC } from 'react'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
import s from './ProductAwards.module.scss'
import { Award } from 'react-feather'

const AWARDS = 'Awards'
interface ProductAwardInterface {
    image: ImageType
    meta: {
        contentType: string
    }
    title: string
    url?: string
}

export interface ProductAwardsInterface {
    items?: ProductAwardInterface[]
    heading?: string
    meta: {
        contentType: string
    }
    title: string
    type: string
}

const c = {
    heading: `${s.heading} uppercase`,
    list: `${s.list} grid grid-cols-2 grid-rows-2`,
    productAward: `${s.productAward} rounded`,
    productAwards: `${s.productAwards}`
}

const targetBlank = '_blank'
const relNoOpenerNoReferrer = 'noopener noreferrer'

/**
 * Product Award Component
 * @param award ProductAwardInterface
 * @returns JSX Element | null
 */
const ProductAward: VFC<ProductAwardInterface> = (
    award
): JSX.Element | null => {
    if (!award) return null

    const { image, url, title } = award

    return (
        <li className={c.productAward}>
            {url && image && (
                <a href={url} rel={relNoOpenerNoReferrer} target={targetBlank}>
                    <Image
                        height={151}
                        src={image?.file.url}
                        alt={image?.description || ''}
                        width={151}
                    />
                </a>
            )}

            {!url && image && (
                <Image
                    height={151}
                    src={image?.file.url}
                    alt={image?.description || ''}
                    width={151}
                />
            )}
        </li>
    )
}

/**
 * Product Awards Component
 * @param param0 awards
 * @returns JSX Element | null
 */
const ProductAwards: VFC<{
    awards: ProductAwardsInterface | undefined
}> = ({ awards }): JSX.Element | null => {
    if (!awards) return null
    if (awards?.type !== AWARDS) return null

    const { items: awardsList, heading } = awards

    const outputAwardsList = awardsList?.map((award) => (
        <ProductAward key={award.title} {...award} />
    ))

    return (
        <section className={c.productAwards}>
            <h4 className={c.heading}>{heading}</h4>
            <ul className={c.list}>{outputAwardsList}</ul>
        </section>
    )
}

export default ProductAwards
