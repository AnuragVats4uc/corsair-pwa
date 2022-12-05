import { PriceRange, Money } from '@pylot-data/pylotschema'
import { formatPrice } from '@corratech/pylot-price/src/utils/formatPrice'

export type GetPriceDifferenceReturn = {
    priceDifference: Money
    formatPrice: string
    isPositive: boolean
}

export const getPriceDifference = (
    priceRange: PriceRange,
    variantPriceRange: PriceRange,
    locale: string
): GetPriceDifferenceReturn | null => {
    let priceDifference: null | Money = null

    const {
        minimum_price: { final_price, regular_price }
    } = variantPriceRange

    const {
        minimum_price: {
            final_price: variantFinalPrice,
            regular_price: variantRegularPrice
        }
    } = priceRange

    //Price value is returned as number | float always
    if (final_price?.value && variantFinalPrice?.value) {
        priceDifference = {
            value: variantFinalPrice.value - final_price.value,
            currency: final_price?.currency
        }
    } else {
        priceDifference = {
            value: variantRegularPrice.value! - regular_price.value!,
            currency: regular_price?.currency
        }
    }

    if (
        !priceDifference ||
        !priceDifference?.value ||
        priceDifference?.value === 0
    )
        return null

    return {
        priceDifference,
        formatPrice: formatPrice(priceDifference, locale),
        isPositive: Math.sign(priceDifference.value!) === 1
    }
}
