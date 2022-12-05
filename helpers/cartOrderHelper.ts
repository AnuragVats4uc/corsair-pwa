import { CartItemInterface, Maybe } from '@pylot-data/pylotschema'
import { isEmpty } from 'lodash'

const isVariant = (
    cartItemA: Maybe<CartItemInterface>,
    cartItemB: Maybe<CartItemInterface>
) => {
    return cartItemA?.product.variants?.some((variant) => {
        return variant?.product?.sku === cartItemB?.product.sku
    })
}

const productNotAdded = (
    productOrder: Maybe<CartItemInterface>[],
    cartItemB: Maybe<CartItemInterface>
) => {
    if (isEmpty(productOrder)) return true
    return !productOrder?.some((product) => {
        return product?.product.name === cartItemB?.product.name
    })
}

const saveCartOrderOnLocalStorage = (
    productOrder: Maybe<CartItemInterface>[]
) => {
    const skuList = productOrder.map((item) => {
        return item?.product.sku
    })
    localStorage.setItem('skuCartOrder', JSON.stringify(skuList))
}

export const orderCart = (
    optimisticItems: Maybe<Maybe<CartItemInterface>[]> | undefined,
    definitiveItems: Maybe<Maybe<CartItemInterface>[]> | undefined
): Maybe<Maybe<CartItemInterface>[]> | undefined => {
    if (!optimisticItems || !definitiveItems) return definitiveItems
    const productOrder: Maybe<CartItemInterface>[] = []

    optimisticItems.forEach((cartItemA: Maybe<CartItemInterface>) => {
        definitiveItems.forEach((cartItemB: Maybe<CartItemInterface>) => {
            if (
                ((cartItemA &&
                    cartItemB &&
                    cartItemB.product.sku == cartItemA.product.sku) ||
                    isVariant(cartItemA, cartItemB)) &&
                productNotAdded(productOrder, cartItemB)
            )
                productOrder.push(cartItemB)
        })
    })
    if (definitiveItems.length === productOrder.length) {
        saveCartOrderOnLocalStorage(productOrder)
        return productOrder
    }

    return definitiveItems
}
