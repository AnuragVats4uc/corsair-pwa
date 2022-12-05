import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from '@corratech/pylot-ui'
import { useUI, ToastType } from '@corratech/pylot-ui/context'
import { useAddToCart } from '@pylot-data/hooks/cart/use-add-to-cart'
import { ProductPrice } from '@components/common/ProductPrice/ProductPrice'
import { SimpleProduct, PriceRange } from '@pylot-data/fwrdschema'
import { useDataLayerAction } from '@corratech/pylot-tag-manager'
import { Cart } from '@components/icons/Cart'
import cn from 'classnames'
import s from '@pagestyles/PDP.module.scss'

const TIMEOUT_AFTER_OPENING_SIDEBAR = 300

export type AddToCartPropsType<ProductType> = {
    isButtonDisabled: boolean
    buttonLabel: string
    variant: SimpleProduct | ProductType
    selectedOptionUIDs: string[]
    product: ProductType
    priceRange: PriceRange
    isGiftCard: boolean
    showPrice?: boolean
    enableIcon?: boolean
    queryID?: string
}

const STICKY_CLASS = 'sticky-top'

export const AddToCart: FC<AddToCartPropsType<any>> = ({
    isButtonDisabled,
    buttonLabel,
    variant,
    selectedOptionUIDs,
    product,
    priceRange,
    isGiftCard,
    showPrice = true,
    enableIcon = false,
    queryID
}) => {
    const { t } = useTranslation(['common', 'pdp'])
    const { openSidebar, openCartToast } = useUI()
    const { isAdding, addToCart } = useAddToCart()
    const containerRef = useRef<HTMLDivElement>(null)
    const dataLayerAction = useDataLayerAction()

    const label = isAdding ? t('Adding...') : buttonLabel

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const boundaries = containerRef.current.getBoundingClientRect()

                if (boundaries.y === 0) {
                    containerRef.current.classList.add(STICKY_CLASS)
                } else {
                    containerRef.current.classList.remove(STICKY_CLASS)
                }
            }
        }
        if (typeof document !== 'undefined') {
            document.body.classList.add('pdp-page')
            document.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.body.classList.remove('pdp-page')
                document.removeEventListener('scroll', handleScroll)
            }
        }
    }, [containerRef])

    //moved the add to cart logic to component from the PDP page
    const addProductHandler = async () => {
        // 'variant' of a SimpleProduct is the same as 'product'
        const response = await addToCart(
            [
                {
                    sku: variant.sku,
                    uid: variant.uid,
                    // ...(variant.sku !== product.sku && {
                    //     parent_sku: product.sku
                    // }),
                    selected_options: [],
                    quantity: 1
                }
            ],
            [product]
        )

        if (response) {
            dataLayerAction({
                type: 'ADD_TO_CART_WITH_QUERY_ID',
                data: { product: response.data.cart, queryID }
            })
        }

        const errorMessage =
            response?.errors?.[0]?.message ??
            response?.user_errors?.[0]?.message

        openSidebar()

        if (errorMessage) {
            setTimeout(
                () => openCartToast(errorMessage, ToastType.Warning),
                TIMEOUT_AFTER_OPENING_SIDEBAR
            )
        }
    }

    return (
        <div className={s['add-to-cart-container']} ref={containerRef}>
            <div className={cn(s['price-add-to-cart'], s['pdp-price'])}>
                {showPrice && (
                    <ProductPrice
                        priceRange={priceRange}
                        showCurrencyCode
                        splitSymbol
                        isGiftCard={isGiftCard}
                    />
                )}
                <Button
                    aria-label={t('Add to Cart')}
                    type="button"
                    className={s['add-to-cart-button']}
                    onClick={addProductHandler}
                    loading={false}
                    disabled={isButtonDisabled}
                >
                    {enableIcon && <Cart />}
                    {label}
                </Button>
            </div>
        </div>
    )
}
