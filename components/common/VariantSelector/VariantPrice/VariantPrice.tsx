import type { FC } from 'react'
import { useRouter } from 'next/router'
import type { PriceRange, SimpleProduct } from '@pylot-data/pylotschema'
import { getPriceDifference } from '../utils/getPriceDifference'
import s from './VariantPrice.module.scss'

export type VariantPriceProps<ProductType> = {
    priceRange: PriceRange
    variant: SimpleProduct | ProductType
}

export const VariantPrice: FC<VariantPriceProps<any>> = ({
    priceRange,
    variant
}) => {
    const { locale = 'en' } = useRouter()
    if (!priceRange || !variant) return null

    const price = getPriceDifference(priceRange, variant.price_range, locale)

    if (!price) return null

    //replace the formatted negative to move to separate span for styles
    const onlyPriceDigit = price.formatPrice.replace('-', '')
    const priceSign = price.isPositive ? '+' : '-'

    return (
        <span className={s['price-diff']}>
            <span className={s['price-sign']}>{priceSign}</span>
            {`${onlyPriceDigit} ${price.priceDifference.currency}`}
        </span>
    )
}
