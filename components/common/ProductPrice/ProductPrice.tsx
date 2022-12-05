import { usePrice } from '@corratech/pylot-price'
import type { CartItemPrices, PriceRange } from '@pylot-data/pylotschema'
import { PriceSymbolSeparated } from './PriceSymbolSeparated'
import cn from 'classnames'
import { FC, useMemo } from 'react'

export type ProductPriceType = {
    priceRange: PriceRange | CartItemPrices
    isGiftCard?: boolean
    className?: string
    showCurrencyCode?: boolean
    splitSymbol?: boolean
    overrideSubTotal?: boolean
    altSubTotal?: string
    showComparePrice?: boolean
    noAltSubTotal?: boolean
    altFinalSubTotal?: string
    notSellable?: boolean
}

export type PriceNodePropType = {
    price: string
    currencyCode?: string | null
    splitSymbol?: boolean
}

const currencyMap: { [x: string]: string } = {
    '€': '€',
    '£': '£',
    '¥': '¥',
    '₩': '₩',
    $: '$',
    zł: 'zł',
    USD: '$',
    EUR: '€',
    GBP: '£',
    TWD: '$',
    PLN: 'zł',
    CNY: '¥',
    CAD: '$',
    KRW: '₩'
}

const PriceNode = ({
    price,
    currencyCode,
    splitSymbol = false
}: PriceNodePropType) => {
    const currencySymbol =
        price.match(/[$€¢£¥₩]|USD|EUR|GBP|TWD|PLN|CNY|CAD|KRW|zł/gi)?.[0] || '$'

    const { wholePart, decimalAmount } = price
        .matchAll(
            /.*?(?<wholePart>[0-9.,]+)[,.](?<decimalAmount>\d{2})(?=\D|$)/gi
        )
        .next().value.groups
    const intAmount = `${currencyMap[currencySymbol]}${wholePart}`

    return (
        <>
            {splitSymbol ? (
                <PriceSymbolSeparated amount={intAmount} />
            ) : (
                <span className="price-amount">{intAmount}</span>
            )}
            {decimalAmount && (
                <span className="price-decimal">{`.${decimalAmount}`}</span>
            )}
            {currencyCode && (
                <span className="price-currency">{currencyCode}</span>
            )}
        </>
    )
}

export const ProductPrice: FC<ProductPriceType> = ({
    priceRange,
    className,
    isGiftCard,
    showCurrencyCode = false,
    splitSymbol = false,
    overrideSubTotal = false,
    altSubTotal = '',
    altFinalSubTotal = '',
    showComparePrice = true,
    noAltSubTotal = false,
    notSellable = false
}) => {
    const { subtotal, total, currency, comparedPrice, discount } = usePrice(
        priceRange
    )
    const currencyCode = showCurrencyCode ? currency : null

    const subTotalNode = useMemo(() => {
        if (comparedPrice && String(comparedPrice) !== total) {
            return (
                <span className="compare-price">
                    <PriceNode
                        price={altSubTotal || String(comparedPrice)}
                        currencyCode={currencyCode}
                        splitSymbol={splitSymbol}
                    />
                </span>
            )
        }

        if (
            overrideSubTotal &&
            altSubTotal &&
            altSubTotal !== total &&
            parseInt(altSubTotal?.replace(/\D+/g, '')) > 0
        ) {
            return (
                <span className="compare-price">
                    <PriceNode
                        price={altSubTotal}
                        currencyCode={currencyCode}
                        splitSymbol={splitSymbol}
                    />
                </span>
            )
        }

        if (
            !overrideSubTotal &&
            !altSubTotal &&
            !noAltSubTotal &&
            subtotal &&
            subtotal !== total &&
            parseInt(subtotal?.replace(/\D+/g, '')) > 0
        ) {
            return (
                <span className="compare-price">
                    <PriceNode
                        price={subtotal}
                        currencyCode={currencyCode}
                        splitSymbol={splitSymbol}
                    />
                </span>
            )
        }

        return null
    }, [
        comparedPrice,
        overrideSubTotal,
        subtotal,
        altSubTotal,
        currencyCode,
        splitSymbol,
        total
    ])

    if (isGiftCard || notSellable) return null

    return (
        <div
            className={cn(['product-price', className])}
            tabIndex={0}
            role="button"
        >
            <span className="regular-price">
                <PriceNode
                    price={altFinalSubTotal || total}
                    currencyCode={currencyCode}
                    splitSymbol={splitSymbol}
                />
            </span>
            {showComparePrice &&
                discount !== '$0.00' &&
                (subTotalNode ||
                    (comparedPrice && String(comparedPrice) !== total))}
        </div>
    )
}
