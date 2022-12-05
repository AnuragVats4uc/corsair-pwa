import React, { VFC } from 'react'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
import { FullCardProps } from './types'
import s from './FullCardMobile.module.scss'
import ProductItem from '../ProductItem'

const c = /*tw*/ {
    fullCardMobile: `${s['full-card-mobile']} mx-auto`,
    fullCardMobileImage: `${s['full-card-mobile-image']} relative w-full`,
    fullCardMobileHeadingOverlay: `${s['full-card-mobile-heading-overlay']} absolute w-full h-full flex items-end uppercase font-bebasNeue text-white`,
    fullCardMobileText: `${s['full-card-mobile-text']} w-full font-aktivGrotesk text-base font-normal text-white tracking-wider leading-6 overflow-y-auto `,
    fullCardMobileGrid: `grid grid-cols-2 col-gap-0 place-items-center mt-4`
}
const CARD_MOBILE_SIZE = '50vw'

const FullCardMobile: VFC<FullCardProps> = ({ card }) => {
    return (
        <div className={c.fullCardMobile}>
            <div className={c.fullCardMobileImage}>
                <Image
                    src={card.backgroundImage?.image.file.url}
                    layout="fill"
                    sizes={CARD_MOBILE_SIZE}
                    alt={card.backgroundImage?.image?.description || ''}
                />
                <div className={c.fullCardMobileHeadingOverlay}>
                    <p>{card.heading}</p>
                </div>
            </div>
            <div className="p-4">
                <p
                    className={cn(c.fullCardMobileText, {
                        [s['full-card-mobile-text-full']]: !card.productCards
                    })}
                >
                    {card.text}
                </p>
                <div className={c.fullCardMobileGrid}>
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

export default FullCardMobile
