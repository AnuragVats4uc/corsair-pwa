import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { graphqlFetch, GraphqlFetchOutput } from '@pylot-data/graphqlFetch'
import type {
    AddProductsToCartOutput as AddProductsToCartOutputRaw,
    Cart,
    CartItemInput,
    ProductInterface
} from '@pylot-data/pylotschema'
import { addToCartMutation } from '@corratech/pylot-cart-manager/src/graphql/addToCartMutation'
import { CartData, useCart } from '@corratech/pylot-cart-manager/src/use-cart'
import { getIsSignedIn } from '@corratech/pylot-cart-manager/src/utils/getIsSignedIn'
import { getOptimisticAddToCartData } from '@corratech/corsair-cart-manager/src/utils/getOptimisticAddToCartData'
import { useUI } from '@corratech/pylot-ui/context'
import { CartItemInterface, Maybe } from '@pylot-data/pylotschema'
import { useCartState } from '@corratech/corsair-cart/src/CartContext'
import { useStoreConfig } from '@config/hooks/useStoreConfig'
import { orderCart } from 'helpers'
import { orderCartFromLocalStorageSkuList } from '@corratech/corsair-cart/src/CartSidebarView/utils/cartOrderHelper'

export interface PersonalizationDataInput {
    uid: string
    value: string
}

export interface AddProductsToCartInput {
    cartId: string
    cartItems: CartItemInput[]
    isSignedIn: boolean
}

export interface AddProductsToCartOutput {
    addProductsToCart: AddProductsToCartOutputRaw
}

export interface UseAddToCartReturn {
    addToCart: (
        cartItems: CartItemInput[],
        products?: ProductInterface[],
        excludeItems?: string[]
    ) => Promise<CartData | undefined>
    isAdding: boolean
}

const formatData = (
    output: GraphqlFetchOutput<AddProductsToCartOutput>
): ((oldData?: CartData) => CartData) | CartData => {
    const outputData = output.data.addProductsToCart
    const errors = output.errors

    if (errors?.length || outputData?.user_errors?.length) {
        // populate cart data using the old data and append it with new errors
        return (oldData) => ({
            errors: errors,
            data: oldData?.data ?? outputData,
            user_errors: outputData?.user_errors
        })
    }

    return {
        data: { cart: outputData.cart },
        errors: errors
    }
}

// During 'editing cart item' we remove an old item and add a new item simultaneously
// So, we have to ignore the outdated cart item
const filterExcluded = (cart: Cart, excludeItems?: string[]): Cart => {
    if (cart.items && excludeItems) {
        cart.items = cart.items.filter(
            (item) => item && !excludeItems.includes(item.uid)
        )
    }
    return cart
}

export const useAddToCart = (): UseAddToCartReturn => {
    const { locale } = useRouter()
    const { data, mutate } = useCart()
    const { openSidebar } = useUI()
    const { setCartError } = useCartState()
    const [isAdding, setIsAdding] = useState(false)
    const [optimisticItems, setOptimisticItems] = useState<
        Maybe<Array<Maybe<CartItemInterface>>>
    >()
    const {
        base: {
            product: { default_max_quantity }
        }
    } = useStoreConfig()

    // If cart data is being updated during ATC request - restore optimistic items
    useEffect(() => {
        if (isAdding && data && optimisticItems) {
            data.data.cart.items = optimisticItems
            mutate(data, false)
        }
    }, [data])

    /**
     * validate if the product exists in the cart and validate
     * the max quantity the can added to cart
     * @param products
     * @returns
     */
    const validate = (products: ProductInterface[]) => {
        //check if the product has max qty attribute or default max quantity
        const maxQty = products[0]?.max_qty || default_max_quantity
        const { items } = data?.data.cart!
        const cartItem = items?.filter(
            (item) => item?.product?.url_key === products[0]?.url_key
        )
        if (!cartItem?.length) return false

        return cartItem[0]?.quantity === maxQty
            ? cartItem[0]?.product?.url_key
            : null
    }

    return {
        addToCart: async (
            cartItems: CartItemInput[],
            products?: ProductInterface[],
            excludeItems?: string[]
        ) => {
            const hasLimitReached = validate(products!)
            let optimisticData
            //If max limit reached then prevent adding product to cart
            if (hasLimitReached) {
                setCartError(hasLimitReached)
                return
            }

            setIsAdding(true)
            if (products) {
                optimisticData = getOptimisticAddToCartData(
                    data!,
                    cartItems,
                    products
                )
                optimisticData.data.cart = filterExcluded(
                    optimisticData.data.cart,
                    excludeItems
                )

                optimisticData.data.cart.items = orderCartFromLocalStorageSkuList(
                    optimisticData.data.cart.items
                )
                setOptimisticItems(optimisticData.data.cart.items)
                mutate(optimisticData, false)
                openSidebar(true)
            }

            const response = await graphqlFetch<
                AddProductsToCartInput,
                AddProductsToCartOutput
            >({
                query: addToCartMutation,
                variables: {
                    cartId: String(data!.data.cart.id),
                    cartItems,
                    isSignedIn: getIsSignedIn()
                },
                locale
            })

            if (response.data.addProductsToCart.cart.items) {
                response.data.addProductsToCart.cart = filterExcluded(
                    response.data.addProductsToCart.cart,
                    excludeItems
                )
            }

            response.data.addProductsToCart.cart.items = orderCart(
                optimisticData?.data.cart.items,
                response.data.addProductsToCart.cart.items
            )
            setOptimisticItems(null)
            const result = await mutate(formatData(response), false)
            // If there were errors - revalidate cart data
            if (
                result?.errors?.length ||
                response.data.addProductsToCart?.user_errors?.length
            ) {
                await mutate(undefined, true)
            }
            setIsAdding(false)
            return result
        },
        isAdding
    }
}
