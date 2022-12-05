import Image from '@corratech/corsair-image'
import cn from 'classnames'
import Link from 'next/link'
import React, {
    Dispatch,
    ReactElement,
    SetStateAction,
    useState,
    useEffect
} from 'react'
import Skeleton from 'react-loading-skeleton'
import { ProductPrice } from '../ProductPrice/ProductPrice'
import s from './ProductTile.module.scss'
import { Button } from '@corratech/pylot-ui'
import { Cart as CartIcon } from '@components/icons/Cart'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'
import { useAddToCart } from '@pylot-data/hooks/cart/use-add-to-cart'
import { ToastType, useUI } from '@corratech/pylot-ui/context'
import { ProductInterface } from '@pylot-data/fwrdschema'
import { ProductStockStatus } from '@pylot-data/enums/ProductStockStatus.d'
import type { Variants } from '@components/common/VariantSelector/hooks/useSwatchTiles'
import { SwatchTiles } from '@components/common/VariantSelector/SwatchTiles'
import { Badge } from '@components/common/ProductTile/Badge'
import { useBuildProductUrl } from '@lib/hooks/useBuildProductUrl'
import { ModelType, ModelTypeEnum } from 'config'
import { useDataLayerAction } from '@corratech/pylot-tag-manager'
import { useRouter } from 'next/router'
import { isTransactionalView } from 'helpers'

export interface ProductTileProps {
    product: any
    imageParam: {
        width?: number
    }
    className?: string
    isPDP?: boolean
    compareItems?: ProductInterface[]
    setCompareItems?: Dispatch<SetStateAction<any>>
    setCompareVisibility?: Dispatch<SetStateAction<boolean>>
    page?: ModelType
    queryID?: ProductInterface
    position?: number
}

export interface Attribute {
    __typename: string
    code: string
    value_index: number
    label: string
}

export interface SmallImage {
    __typename: string
    url: string
}

export interface VariantProduct {
    __typename: string
    id: number
    small_image: SmallImage
    sku: string
    stock_status: string
    uid: string
}

export interface Variant {
    __typename: string
    attributes: Attribute[]
    product: VariantProduct
}

export const LoaderTile = () => (
    <div className={cn(s['productitem-block'])}>
        <Skeleton height={320} width={320} className={s['product-img']} />
        <Skeleton count={2} />
        <Skeleton circle width={16} count={2} />
    </div>
)

const TIMEOUT_AFTER_OPENING_SIDEBAR = 300

export const FwrdProductTile = ({
    product = {},
    className,
    isPDP = false,
    compareItems,
    setCompareItems,
    setCompareVisibility,
    page = ModelTypeEnum.PRODUCT,
    queryID
}: ProductTileProps): ReactElement | null => {
    const { t } = useTranslation(['common'])
    const { addToCart, isAdding } = useAddToCart()
    const { openSidebar, openCartToast } = useUI()
    const [variant, setVariant] = useState<null | Variants>(null)
    const cartLabel = isAdding ? t('Adding...') : t('Add to Cart')
    const isConfig = product.__typename === 'ConfigurableProduct'
    const [checked, setChecked] = useState<boolean>(false)
    const dataLayerAction = useDataLayerAction()
    const listOfVariantUids = product?.variants?.map((element: Variant) =>
        parseInt(element.product.uid, 10)
    )
    const router = useRouter()
    const { locale } = router

    useEffect(() => {
        //reset the variants when there is a change in product avoid
        //not to pick during sort or filter variant values for simple products
        setVariant(null)
        setCheckedStateFromLocalStorage()
    }, [product])

    /**
     * Manages product tile variant update state
     */
    useEffect(() => {
        if (!variant) return

        const compareItemsUids = compareItems?.map((element) => element.uid)

        if (compareItemsUids?.includes(variant?.product?.uid)) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [variant])

    /**
     * Set checked state from local storage
     * @description checks local storage and based on the value we set the components checked state
     * @function setCheckedStateFromLocalStorage
     * @returns checked state
     */
    const setCheckedStateFromLocalStorage = () => {
        const localStorageCompareItems: string | null =
            localStorage.getItem('compare_items') || null

        if (localStorageCompareItems === '[]') return

        const parseCompareItems = localStorageCompareItems
            ? JSON.parse(localStorageCompareItems)
            : []

        const isChecked = parseCompareItems.some(
            (element: ProductInterface) => {
                const { uid } = element
                const elementUid = parseInt(uid, 10)
                return listOfVariantUids?.includes(elementUid)
            }
        )

        setChecked(isChecked)
    }

    /**
     * Handle Checkbox Change
     * @param event click
     * @param variant current product variant
     * @param item parent product, contains variant products
     * @returns Updates state to re-render DOM for checked v un-checked
     */
    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
        variant: Variants | null,
        item: ProductInterface
    ) => {
        if (!setCompareItems || !setCompareVisibility || !compareItems) return

        const compareItem = variant ? variant.product : item

        if (!compareItem) return null

        const localStorageCompareItems: string | null =
            localStorage.getItem('compare_items') || null

        const parseCompareItems: ProductInterface[] = localStorageCompareItems
            ? JSON.parse(localStorageCompareItems)
            : compareItems

        if (!checked) {
            setChecked(true)
            setCompareVisibility(true)
            setCompareItems((prevState: any) => [...prevState, compareItem])

            localStorage.setItem(
                'compare_items',
                JSON.stringify(parseCompareItems.concat(compareItem))
            )

            localStorage.setItem('compare_plp', window.location.pathname)
        } else {
            setChecked(false)
            setCompareVisibility(true)
            setCompareItems((prevState: []) => {
                return prevState.filter((element: ProductInterface) => {
                    return element.sku !== variant?.product?.sku
                })
            })

            localStorage.setItem(
                'compare_items',
                JSON.stringify(
                    parseCompareItems.filter((element: ProductInterface) => {
                        return element.sku !== variant?.product?.sku
                    })
                )
            )
        }
    }

    const addProductHandler = async () => {
        if (setCompareVisibility) setCompareVisibility(false)

        const variantProduct = variant?.product || product
        // 'variant' of a SimpleProduct is the same as 'product'
        const response = await addToCart(
            [
                {
                    sku: variantProduct.sku,
                    uid: variantProduct.uid,
                    ...(variantProduct.sku !== product.sku && {
                        parent_sku: product.sku
                    }),
                    selected_options: variant?.selectedOptions,
                    quantity: 1
                }
            ],
            [product]
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
            dataLayerAction({
                type: 'ADD_TO_CART_WITH_QUERY_ID',
                data: { product: response.data.cart, queryID }
            })
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

    const { name, stock_status, price_range } = variant?.product || product
    const badge = variant ? variant?.product?.badge : product?.badge

    // CORSAIR: This assumes that the selected variant is in the same categories as
    // the variant used for the parent product
    if (variant?.product) {
        variant.product.categories = product.categories
    }

    const productUrl = useBuildProductUrl({
        page: page,
        product: variant?.product || product
    })

    if (!product) return null

    //fallback if image node not present for recently viewed old cache products
    const imageUrl =
        variant?.product?.image?.url ||
        product?.image?.url ||
        product?.media_gallery?.[0]?.url ||
        product?.small_image?.url

    const { position } = product

    const onClickHandler = () => {
        dataLayerAction({
            type: 'PRODUCT_CLICK_PLP',
            data: { product, queryID, position }
        })
    }

    // Commenting this lines because:
    // The client has decided to deprioritize comparison tray from MVP

    // const outputVariantIds = product?.variants
    //     ?.map((element: Variant) => {
    //         return `checkbox-${element.product.uid} `
    //     })
    //     .join('')
    //     .trim()

    const learnMoreCTA = () => (
        <Link href={productUrl}>
            <a>
                <Button
                    aria-label={t('Learn More')}
                    className={s['p-tile-add-to-cart-button']}
                    onClick={onClickHandler}
                >
                    <span>{t('Learn More')}</span>
                </Button>
            </a>
        </Link>
    )

    return (
        <div className={cn(s['productitem-block'], className)}>
            {badge && <Badge label={badge} />}
            <div className={s['productimage-block']}>
                <Link href={productUrl}>
                    <a>
                        <button
                            className={`${s['productimg-link']} border-0 bg-transparent text-left"`}
                            onClick={onClickHandler}
                            aria-label={name}
                        >
                            <Image
                                src={
                                    imageUrl ||
                                    '/images/default-product-image.png'
                                }
                                alt={
                                    product.name ? product.name : 'placeholder'
                                }
                                width={280}
                                height={280}
                                layout="responsive"
                            />
                        </button>
                    </a>
                </Link>
                {isConfig && product.show_variants && (
                    <SwatchTiles
                        product={product}
                        variant={variant}
                        setSelectedVariant={setVariant}
                    />
                )}
            </div>

            <div
                className={cn(s['p-tile-details'], 'product-details-container')}
            >
                {/*
                  Commenting this lines because:
                  The client has decided to deprioritize comparison tray from MVP
                <div
                    className={cn(
                        s['product-compare'],
                        'product-compare-wrapper'
                    )}
                >
                    <Checkbox
                        checked={checked}
                        id={
                            variant?.product ? variant.product.sku : product.sku
                        }
                        className={outputVariantIds}
                        labelName={t('Compare')}
                        onChange={(event) =>
                            handleCheckboxChange(event, variant, product)
                        }
                    />
                </div>
                */}

                <h2 className={s['product-name-wrapper']}>
                    <Link href={productUrl}>
                        <a>
                            <button
                                className={`${s['product-name']} border-0 bg-transparent text-left"`}
                                onClick={onClickHandler}
                                title={product.name}
                            >
                                {name}
                            </button>
                        </a>
                    </Link>
                </h2>
                {isTransactionalView('addToCart', locale) ? (
                    <>
                        <ProductPrice
                            className={String(product.__typename).toLowerCase()}
                            priceRange={price_range}
                            notSellable={product.not_sellable}
                        />
                        {!product.not_sellable ? (
                            <div
                                className={cn(
                                    s['p-tile-add-cart-wrapper'],
                                    'add-cart-wrapper'
                                )}
                            >
                                {stock_status === ProductStockStatus.InStock ? (
                                    <Button
                                        aria-label={t('Add to Cart')}
                                        type="button"
                                        className={
                                            s['p-tile-add-to-cart-button']
                                        }
                                        onClick={addProductHandler}
                                        loading={false}
                                    >
                                        <span
                                            className={s['p-tile-icon-wrapper']}
                                        >
                                            <CartIcon />
                                            {cartLabel}
                                        </span>
                                    </Button>
                                ) : (
                                    <div className="flex flex-row justify-between items-center">
                                        {learnMoreCTA()}
                                        <div
                                            className={cn(
                                                s['p-tile-out-of-stock'],
                                                'out-of-stock-wrapper'
                                            )}
                                        >
                                            {t('Out of Stock')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className={cn(
                                    s['p-tile-add-cart-wrapper'],
                                    'add-cart-wrapper'
                                )}
                            >
                                <Link href={productUrl}>
                                    <a>
                                        <Button
                                            aria-label={t('Learn More')}
                                            className={
                                                s['p-tile-add-to-cart-button']
                                            }
                                            onClick={onClickHandler}
                                        >
                                            <span
                                                className={
                                                    s['p-tile-icon-wrapper']
                                                }
                                            >
                                                {t('Learn More')}
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        className={cn(
                            s['p-tile-add-cart-wrapper'],
                            'add-cart-wrapper'
                        )}
                    >
                        {learnMoreCTA()}
                    </div>
                )}
            </div>
        </div>
    )
}

export const ProductItem = React.memo(
    (props: ProductTileProps) => <FwrdProductTile {...props} />,
    (prevProps, newProps) =>
        JSON.stringify(prevProps) === JSON.stringify(newProps)
)

ProductItem.displayName = 'MemoProductItem'
