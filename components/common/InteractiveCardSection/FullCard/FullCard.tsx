import React, { VFC } from 'react'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
import s from './FullCard.module.scss'
import ProductItem from '../ProductItem'
import { FullCardProps } from './types'

const c = /*tw*/ {
    fullCard: `${s['full-card']} relative mb-5 mx-auto`,
    fullCardContent: `${s['full-card-content']} w-full h-full absolute flex flex-col`,
    fullCardText: `${s['full-card-text']} text-white text-base flex-1`,
    fullCardHeading: `${s['full-card-heading']} text-white font-bebasNeue uppercase`,
    fullCardGrid: `${s['full-card-grid']}`
}

const cardElementId = 'full-card-text'

const FullCard: VFC<FullCardProps> = ({ card }) => {
    const hasProducts = Boolean(card.productCards)
    const textPlace = card.textPlacement?.toLocaleLowerCase()
    return (
        <div className={c.fullCard}>
            <Image
                src={card.backgroundImage?.image.file.url}
                alt={card.backgroundImage?.image?.description || ''}
                layout="fill"
            />
            <div
                className={cn(c.fullCardContent, {
                    [s['full-card-empty']]: !hasProducts
                })}
            >
                <div
                    className={cn(
                        s['full-card-text-wrapper'],
                        s[`full-card-${textPlace}`]
                    )}
                    style={{ width: card.textWidth }}
                >
                    <p className={c.fullCardHeading}>{card.heading}</p>
                    <p className={c.fullCardText} id={cardElementId}>
                        {card.text}
                    </p>
                </div>
                <div className={c.fullCardGrid}>
                    {card.productCards?.map((product, index) => (
                        <ProductItem
                            product={product}
                            key={product.title + index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FullCard
