import React, { ReactElement } from 'react'
import { Maybe, ProductInterface } from '@pylot-data/fwrdschema'
import { ProductPrice } from '@components/common/ProductPrice/ProductPrice'
import Image from '@corratech/pylot-image'
import s from './SearchAutocomplete.module.scss'
import { useProductUrlBuilder } from '@lib/hooks/useBuildProductUrl'
import { ModelTypeEnum } from '@config/base'
import { useDataLayerAction } from '@corratech/pylot-tag-manager'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isTransactionalView } from 'helpers'

export type ProductItemProp = {
    product?: Maybe<ProductInterface>
    queryID?: string
    position?: number
}

const ProductItemTiny = ({
    product,
    queryID,
    position
}: ProductItemProp): ReactElement | null => {
    const productUrlBuilder = useProductUrlBuilder({
        page: ModelTypeEnum.PRODUCT
    })
    const router = useRouter()
    const { locale } = router

    const dataLayerAction = useDataLayerAction()

    if (!product) return null

    const getOnClickHandler = () => {
        dataLayerAction({
            type: 'PRODUCT_CLICK_AUTOCOMPLETE',
            data: { product, queryID, position }
        })
    }

    return (
        <div className={`${s['autocomplete-product-tiny']} flex text-left`}>
            <Link
                href={`${productUrlBuilder({
                    product: product
                })}`}
            >
                <a>
                    <button
                        className={s['autocomplete-product-image']}
                        onClick={getOnClickHandler}
                    >
                        <Image
                            src={
                                product.small_image?.url ||
                                `${
                                    window?.location?.origin || ''
                                }/images/default-product-image.png`
                            }
                            width={70}
                            height={70}
                        />
                    </button>
                </a>
            </Link>
            <div
                className={`${s['autocomplete-product-tiny-name-price']} pr-2.5`}
            >
                <div className={s['autocomplete-product-tiny-name']}>
                    <Link
                        href={`${productUrlBuilder({
                            product: product
                        })}`}
                    >
                        <a>
                            <p
                                className={`${s['product-name']} border-0 bg-transparent text-left !text-bold`}
                                onClick={getOnClickHandler}
                                onKeyPress={getOnClickHandler}
                                role="presentation"
                            >
                                {product.name}
                            </p>
                        </a>
                    </Link>
                </div>
                {isTransactionalView('serp', locale) &&
                    !product.not_sellable && (
                        <ProductPrice
                            className={`${s['autocomplete-product-tiny-price']} !text-bold`}
                            priceRange={product?.price_range}
                            showComparePrice={false}
                        />
                    )}
            </div>
        </div>
    )
}
export default ProductItemTiny
