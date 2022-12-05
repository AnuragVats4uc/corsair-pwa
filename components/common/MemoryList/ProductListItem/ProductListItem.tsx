import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { Button } from '@corratech/pylot-ui'
import { ProductInterface } from '@pylot-data/fwrdschema'
import { ProductInterface as PylotProductInterface } from '@pylot-data/pylotschema'
import { useAddToCart } from '@pylot-data/hooks/cart/use-add-to-cart'
import { ToastType, useUI } from '@corratech/pylot-ui/context'
import Image from '@corratech/corsair-image'
import { ProductStockStatus } from '@pylot-data/enums/ProductStockStatus.d'

import { ProductPrice } from '@components/common/ProductPrice/ProductPrice'
import { useBuildProductUrl } from '@lib/hooks/useBuildProductUrl'
import { ModelType, ModelTypeEnum } from 'config'
import { isTransactionalView } from 'helpers'

import s from './ProductListItem.module.scss'

const c = /*tw*/ {
    container: `${s.container} relative flex flex-row gap-5 md:gap-6 font-aktivGrotesk`,
    image: 'relative min-w-max-content',
    info:
        'flex flex-col md:flex-row gap-3 mb-6 w-full text-white md:items-center md:mb-0',
    name: `${s.name} text-white font-normal text-sm leading-normal`,
    specs: `${s.specs} hidden md:block flex-1 text-sm leading-none`,
    ctaContainer: `${s.ctaContainer} flex justify-between w-full md:flex-1`,
    cta: `${s.cta} text-white uppercase tracking-widest md:py-1 md:ml-6`
}

export type ProductListItemProps = {
    product: ProductInterface
    queryID?: string
    page?: ModelType
}

const TIMEOUT_AFTER_OPENING_SIDEBAR = 300

const mockSpecs = {
    memory: '8GB',
    frequency: '2133 MHZ',
    timing: '15-15-15-36'
}

const FwrdProductListItem = (props: ProductListItemProps) => {
    const { product, page = ModelTypeEnum.PRODUCT } = props

    const { t } = useTranslation(['common'])
    const { addToCart, isAdding } = useAddToCart()
    const { openSidebar, openCartToast } = useUI()
    const cartLabel = isAdding ? t('Adding...') : t('Add to Cart')

    const router = useRouter()
    const { locale } = router

    const addProductHandler = async () => {
        const variantProduct = product
        // 'variant' of a SimpleProduct is the same as 'product'
        const response = await addToCart(
            [
                {
                    sku: variantProduct.sku!,
                    uid: variantProduct.uid,
                    ...(variantProduct.sku !== product.sku && {
                        parent_sku: product.sku
                    }),
                    quantity: 1
                }
            ],
            [product as PylotProductInterface]
        )

        const errorMessage =
            response?.errors?.[0]?.message ??
            response?.user_errors?.[0]?.message ??
            null
        const successMessage = t('cart|{{name}} was added to cart', {
            name: variantProduct.name
        })

        openSidebar()
        if (response) {
            setTimeout(
                () =>
                    openCartToast(
                        errorMessage ? errorMessage : successMessage,
                        errorMessage ? ToastType.Warning : ToastType.Success
                    ),
                TIMEOUT_AFTER_OPENING_SIDEBAR
            )
        }
    }

    const { name, stock_status, price_range } = product

    const productUrl = useBuildProductUrl({
        page: page,
        product: product
    })

    //fallback if image node not present for recently viewed old cache products
    const imageUrl =
        product?.image?.url ||
        product?.media_gallery?.[0]?.url ||
        product?.small_image?.url

    const learnMoreCTA = () => (
        <Link href={productUrl}>
            <a className="flex">
                <Button aria-label={t('Learn More')} variant="link">
                    <span className={c.cta}>{t('Learn More')}</span>
                </Button>
            </a>
        </Link>
    )

    return (
        <div className={c.container}>
            <div className={c.image}>
                <Link href={productUrl}>
                    <a
                        className="border-0 bg-transparent text-left w-full h-auto max-w-full max-h-full"
                        aria-label={name!}
                    >
                        <Image
                            src={
                                imageUrl || '/images/default-product-image.png'
                            }
                            alt={product.name ? product.name : 'placeholder'}
                            width={72}
                            height={72}
                        />
                    </a>
                </Link>
            </div>

            <div className={c.info}>
                <h2 className={c.name}>
                    <Link href={productUrl}>
                        <a>
                            <button
                                className="border-0 bg-transparent text-left tracking-wide font-aktivGrotesk"
                                title={name!}
                            >
                                {name}
                            </button>
                        </a>
                    </Link>
                </h2>

                <span className={c.specs}>{mockSpecs.memory}</span>
                <span className={c.specs}>{mockSpecs.frequency}</span>
                <span className={c.specs}>{mockSpecs.timing}</span>

                <div className={c.ctaContainer}>
                    {isTransactionalView('addToCart', locale) ? (
                        <>
                            <ProductPrice
                                priceRange={price_range}
                                showComparePrice={false}
                            />
                            {product.not_sellable ? (
                                <Link href={productUrl}>
                                    <a className="flex">
                                        <Button
                                            aria-label={t('Learn More')}
                                            variant="link"
                                        >
                                            <span className={c.cta}>
                                                {t('Learn More')}
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            ) : stock_status ===
                              ProductStockStatus.OutOfStock ? (
                                learnMoreCTA()
                            ) : (
                                <Button
                                    aria-label={t('Add to Cart')}
                                    type="button"
                                    variant="link"
                                    onClick={addProductHandler}
                                    loading={false}
                                >
                                    <span className={cn(c.cta, 'text-yellow')}>
                                        {cartLabel}
                                    </span>
                                </Button>
                            )}
                        </>
                    ) : (
                        <div>{learnMoreCTA()}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export const ProductListItem = React.memo(
    (props: ProductListItemProps) => <FwrdProductListItem {...props} />,
    (prevProps, newProps) =>
        JSON.stringify(prevProps) === JSON.stringify(newProps)
)

ProductListItem.displayName = 'MemoProductListItem'
