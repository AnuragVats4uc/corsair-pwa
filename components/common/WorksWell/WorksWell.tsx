import { useCallback, useEffect, useState } from 'react'
import Image from '@corratech/corsair-image'
import { ProductPrice } from '../ProductPrice/ProductPrice'
import { Plus } from '@components/icons'
import { getProducts, Products } from '@pylot-data/api/operations/get-products'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAddToCart } from '@pylot-data/hooks/cart/use-add-to-cart'
import { useUI, ToastType } from '@corratech/pylot-ui/context'
import s from '@pagestyles/PDP.module.scss'
import { ProductStockStatus } from '@pylot-data/enums/ProductStockStatus.d'
import { useProductUrlBuilder } from '@lib/hooks/useBuildProductUrl'
import { ModelTypeEnum } from 'config'
import Link from 'next/link'
import {
    ConfigurableProduct,
    ConfigurableVariant,
    GiftCardProduct,
    Maybe
} from '@pylot-data/fwrdschema'
import { ProductInterface } from '@pylot-data/pylotschema'

export interface WorksWellObject {
    productsSkus?: string[]
}

const c = /*tw*/ {
    title: `font-bebasNeueBold font-bold mb-4 ${s.title}`,
    container: 'grid grid-cols-2 gap-4 relative',
    containerRelative: `${s['pdp-link']} relative z-0 cursor-pointer`,
    btnContainer: `h-10 absolute bg-white font-aktivGrotesk text-xs lg:text-base rounded text-black leading-4 font-bold z-10 flex items-center justify-center ${s['btn-container']}`,
    btnTextContainer: 'flex items-center px-3.5',
    hrefContainer: 'flex ',
    btnText: `pb-1 font-bold ${s.btnText}`,
    textContainer: `mt-8 grid ${s['text-container']}`,
    pdpName: `font-aktivGroteskBold overflow-hidden font-bold ${s['pdp-name']}`,
    pdpPrice: `items-center justify-between w-full m-0 ${s['works-well-add-to-cart']} ${s['pdp-price']}`,
    linkButton: `${s['works-well-button']} p-0 h-full w-full text-left grid`
}

const TIMEOUT_AFTER_OPENING_SIDEBAR = 300
const MAX_NUMBER_OF_PRODUCTS_IN_CAROUSEL = 4

export const WorksWell = ({
    productsSkus
}: WorksWellObject): JSX.Element | null => {
    const { locale } = useRouter()

    const { t } = useTranslation(['pdp'])
    const [productBlocks, setProductBlocks] = useState<
        ConfigurableProduct[] & GiftCardProduct[]
    >([])
    const skusArray = productsSkus?.slice(0, MAX_NUMBER_OF_PRODUCTS_IN_CAROUSEL)
    const productUrlBuilder = useProductUrlBuilder({
        page: ModelTypeEnum.PRODUCT
    })

    const getRelatedProducts = useCallback(async () => {
        if (skusArray !== undefined && skusArray.length > 1) {
            const relatedProducts: Products[] = await getProducts(
                skusArray,
                null,
                locale ?? ''
            )

            const productsData = relatedProducts.map((product) =>
                product?.productData?.length > 0 ? product?.productData[0] : ''
            )

            const finalData: ConfigurableProduct[] & GiftCardProduct[] = []

            productsSkus?.filter((sku) => {
                return productsData?.filter((product) => {
                    if (product && product?.sku === sku) finalData.push(product)
                })
            })

            if (productBlocks.length === 0) {
                setProductBlocks(finalData)
            }
        }
    }, [skusArray, locale])

    const { addToCart } = useAddToCart()
    const { openSidebar, openCartToast } = useUI()
    const productHandler = async (
        prod: ConfigurableProduct & GiftCardProduct
    ) => {
        const variant = prod?.variants!.find(
            (variantProduct: Maybe<ConfigurableVariant>) =>
                variantProduct?.product?.sku === prod?.sku
        )

        const response = await addToCart(
            [
                {
                    sku: prod.sku as string,
                    uid: variant?.product?.uid,
                    quantity: 1
                }
            ],
            [prod as ProductInterface]
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

    useEffect(() => {
        getRelatedProducts()
    }, [productBlocks?.length])

    return productBlocks && productBlocks?.length > 1 ? (
        <>
            <p className={c.title}>{t('workswell|WORKS WELL WITH')}</p>
            <div className={c.container}>
                {productBlocks?.map((product) => {
                    const {
                        sku,
                        image,
                        name,
                        price_range: priceRange
                    } = product
                    const inStock = !!(
                        product &&
                        product.stock_status === ProductStockStatus.InStock
                    )

                    return (
                        <div className={c.containerRelative} key={sku}>
                            <div className={c.btnContainer}>
                                {inStock ? (
                                    <button
                                        onClick={() =>
                                            productHandler(
                                                product as ConfigurableProduct &
                                                    GiftCardProduct
                                            )
                                        }
                                        type="button"
                                    >
                                        <div className={c.btnTextContainer}>
                                            <Plus
                                                className="mr-2"
                                                width={24}
                                                height={24}
                                            />
                                            <span className={c.btnText}>
                                                {t('workswell|Add to Order')}
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    <Link
                                        href={productUrlBuilder({
                                            product: product
                                        })}
                                    >
                                        <a>{t('workswell|Learn more')}</a>
                                    </Link>
                                )}
                            </div>
                            <Link
                                href={productUrlBuilder({
                                    product: product
                                })}
                            >
                                <a>
                                    <button
                                        onClick={() => setProductBlocks([])}
                                        className={c.linkButton}
                                    >
                                        <Image
                                            src={
                                                (image?.url as string) ||
                                                '/images/default-product-image.png'
                                            }
                                            width="183"
                                            height="183"
                                            alt={
                                                image?.label as
                                                    | string
                                                    | undefined
                                            }
                                        />
                                        <div className={c.textContainer}>
                                            <p className={c.pdpName}>{name}</p>
                                            <span className={c.pdpPrice}>
                                                <ProductPrice
                                                    priceRange={priceRange}
                                                    showCurrencyCode
                                                    splitSymbol
                                                />
                                            </span>
                                        </div>
                                    </button>
                                </a>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    ) : null
}

export default WorksWell
