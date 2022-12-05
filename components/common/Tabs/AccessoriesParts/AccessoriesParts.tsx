import React, { useCallback, useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'

import { IAccessoriesParts } from '@components/common/types'
import { getProducts } from '@pylot-data/api/operations/get-products'
import { ProductInterface } from '@pylot-data/fwrdschema'
import RelatedProduct from './RelatedProduct/RelatedProduct'

import s from './AccessoriesParts.module.scss'

const c = /*tw*/ {
    tab: `${s['tab-container']}`,
    tabWrapper: `${s['tab-wrapper']} sm:m-auto px-6 sm:px-0`,
    accessories: `${s['tab-accessories']} grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto`,
    accessoriesHeading: `${s['tab-accessories-heading']} font-primary uppercase`
}

export type AccessoriesPartsProps = {
    content?: IAccessoriesParts
    productData?: ProductInterface
}

const AccessoriesParts: VFC<AccessoriesPartsProps> = ({
    content,
    productData
}) => {
    const { locale } = useRouter()
    const [relatedProductsData, setRelatedProductsData] = useState<
        ProductInterface[]
    >([])
    const relatedProductSkus = productData?.related_accessories_skus
    const getRelatedProductsData = useCallback(
        async (skus: string[], locale: string) => {
            const products = await getProducts(skus, null, locale)
            const productsData: ProductInterface[] = []

            products.forEach((productData) => {
                const index = productData?.productData?.findIndex(
                    (product, i) =>
                        product?.sku === productData.productData[i]?.sku
                )

                if (index != null) {
                    productsData.push(productData.productData[index])
                }
            })

            const socialDefaultImage = `${
                typeof window !== 'undefined' ? window.location.origin : ''
            }/images/default-product-image.png`

            return productsData?.filter(Boolean).map((item) => {
                if (item.image) {
                    if (!item.image.url) {
                        item.image.url = socialDefaultImage
                    }
                } else {
                    item.image = {
                        url: socialDefaultImage
                    }
                }
                return item
            })
        },
        []
    )

    useEffect(() => {
        if (!relatedProductSkus || !locale) return

        getRelatedProductsData(relatedProductSkus as string[], locale).then(
            (productsData: ProductInterface[]) => {
                if (productsData?.length) {
                    setRelatedProductsData(productsData)
                }
            }
        )
    }, [])

    return (
        <div className={c.tab}>
            <div className={c.tabWrapper}>
                <h2 className={c.accessoriesHeading}>{content?.description}</h2>

                <div className={c.accessories}>
                    {relatedProductsData.length > 0 &&
                        relatedProductsData.map((relatedProduct) => (
                            <div key={relatedProduct.uid}>
                                <RelatedProduct product={relatedProduct} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AccessoriesParts
