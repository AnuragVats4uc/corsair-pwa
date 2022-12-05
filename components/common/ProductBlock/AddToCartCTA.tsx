import { VFC } from 'react'
import { useAddToCart } from '@pylot-data/hooks/cart/use-add-to-cart'
import { useUI, ToastType } from '@corratech/pylot-ui/context'
import { useTranslation } from 'next-i18next'
import { Plus } from '@components/icons'
import { ProductInterface } from '@pylot-data/pylotschema'
import s from './ProductBlock.module.scss'

const TIMEOUT_AFTER_OPENING_SIDEBAR = 300

interface AddToCartCTAProps {
    sku: string
    uid: string
    product: ProductInterface
    className?: string
    label?: string
}
export const AddToCartCTA: VFC<AddToCartCTAProps> = ({
    sku,
    uid,
    product,
    className,
    label = 'Add to cart'
}) => {
    const { addToCart } = useAddToCart()
    const { openSidebar, openCartToast } = useUI()
    const { t } = useTranslation(['common'])
    const addProductHandler = async () => {
        const response = await addToCart(
            [
                {
                    sku: sku,
                    uid: uid,
                    quantity: 1
                }
            ],
            [product]
        )

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
        <div className={className}>
            <button onClick={addProductHandler} type="button">
                <div className={`${s['buttons-container']}`}>
                    <Plus
                        className={`${s['plus-icon']}`}
                        width={24}
                        height={24}
                    />
                    <span className={`${s['add-to-card-text']}`}>
                        {t(label)}
                    </span>
                </div>
            </button>
        </div>
    )
}
