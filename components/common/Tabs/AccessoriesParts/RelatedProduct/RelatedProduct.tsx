import React from 'react'
import Link from 'next/link'
import { ModelTypeEnum } from 'config'
import Image from '@corratech/corsair-image'
import {
    SimpleProduct,
    ConfigurableProduct,
    ProductInterface
} from '@pylot-data/fwrdschema'
import { AddToCart } from '@components/corra/AddToCart'
import { useProductUI } from '@pylot-data/hooks/product/use-product-ui'
import { ProductPrice } from '@components/common/ProductPrice/ProductPrice'
import { useTranslation } from 'next-i18next'
import { useBuildProductUrl } from '@lib/hooks/useBuildProductUrl'

import s from './RelatedProduct.module.scss'

const c = /*tw*/ {
    relatedProduct: `${s['related-product']} flex`,
    imageContainer: `${s['related-product-image']} related-product-image relative flex justify-center items-center`,
    productDetails: `${s['related-product-details']} relative block`,
    productCTA: `${s['related-product-cta']} w-full lg:absolute`
}

const RelatedProduct = ({
    product
}: {
    product: ConfigurableProduct | SimpleProduct
}): JSX.Element | null => {
    const { name, sku, price_range, uid, image } = product
    const options = { sku: sku as string }
    const {
        variant,
        buttonLabel: buttonLabelWithoutAdding,
        isButtonDisabled,
        selectedOptionUIDs,
        isOutOfStock
    } = useProductUI(product, options)
    const { t } = useTranslation(['common', 'pdp'])
    const productUrl = useBuildProductUrl({
        page: ModelTypeEnum.PRODUCT,
        product: product as ProductInterface
    })

    return (
        <div key={uid} className={c.relatedProduct}>
            {image?.url && (
                <div className={c.imageContainer}>
                    <Image
                        src={image.url}
                        alt={image.label || name || ''}
                        width={80}
                        height={80}
                    />
                </div>
            )}
            <div className={c.productDetails}>
                <p>{name}</p>
                <ProductPrice
                    priceRange={price_range}
                    showCurrencyCode={false}
                    splitSymbol
                    isGiftCard={false}
                    showComparePrice={false}
                />
                <div className={c.productCTA}>
                    {isOutOfStock ? (
                        <Link href={productUrl}>{t('Learn More')}</Link>
                    ) : (
                        <AddToCart
                            priceRange={price_range}
                            isButtonDisabled={isButtonDisabled}
                            product={product}
                            buttonLabel={buttonLabelWithoutAdding}
                            variant={variant}
                            selectedOptionUIDs={selectedOptionUIDs}
                            isGiftCard={false}
                            showPrice={false}
                            enableIcon
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
