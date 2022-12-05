import { useEffect, useMemo, useState } from 'react'
import type { Maybe, ProductInterface } from '@pylot-data/pylotschema'
import { Products } from '@pylot-data/fwrdschema'
import type { PLPFilterTypes } from '@corratech/corsair-filters-and-sort'
import { getKeyString } from '@corratech/pylot-utils'

export const usePlpProducts = (
    isValidating: boolean,
    plpManager: PLPFilterTypes.PLPManager,
    productItems?: Maybe<Array<Maybe<ProductInterface>>>,
    initialProducts?: Maybe<Products>,
    productsResult?: Maybe<Products>,
    currentPage = 1
): {
    visibleProductData: Maybe<Products>
    productsToRender: Maybe<ProductInterface>[]
} => {
    const defaultSort = productsResult?.sort_fields?.default ?? 'position'
    const [firstProducts, setFirstProducts] = useState(initialProducts)
    const [visibleProductData, setVisibleProductData] = useState(
        initialProducts ?? {
            keywords: [],
            items: [],
            aggregations: []
        }
    )

    const initialProductsKey = useMemo(() => {
        //@ts-ignore
        return firstProducts?.items ? getKeyString(firstProducts.items) : ''
    }, [firstProducts])

    const visibleProductsKey = useMemo(() => {
        return visibleProductData?.items
            ? //@ts-ignore
              getKeyString(visibleProductData.items)
            : ''
    }, [visibleProductData?.items])

    /* New product set can be loaded from the cache immediately if:
     * - it is not the initial set
     * - it is the initial set and there are no filters or non-default sort applied (after reset)
     * The purpose of this condition is to prevent initialData from appearing while we filter collection
     */
    const canUpdateProducts = (items: Maybe<ProductInterface>[]) => {
        const newProductsKey = getKeyString(items)
        if (visibleProductsKey === newProductsKey) {
            return false // same products
        }
        const hasFilters = Object.keys(plpManager.plpState.filters).length > 0
        const sortAttributes = Object.keys(plpManager.plpState.sort)
        const hasDefaultSort =
            sortAttributes.length === 0 || sortAttributes.includes(defaultSort)
        return (
            initialProductsKey !== newProductsKey ||
            (!hasFilters && hasDefaultSort)
        )
    }

    // Depending on other variables than isValidating may cause rendering cycle
    useEffect(() => {
        if (!productItems || productItems.length === 0) {
            setVisibleProductData(productsResult!)
            return
        }
        // Update products from SWR cache if possible
        if (isValidating && canUpdateProducts(productItems)) {
            setVisibleProductData({
                ...productsResult,
                items: productItems,
                keywords: []
            })
        }
        // Update products (if it is a new set) after loading
        const newProductsKey = getKeyString(productItems)
        if (!isValidating && visibleProductsKey !== newProductsKey) {
            setVisibleProductData({
                ...productsResult,
                items: productItems,
                keywords: []
            })
        }

        // If no initial products are provided, we use the first loaded set as 'initial'
        if (!firstProducts) {
            setFirstProducts(productsResult)
        }
    }, [isValidating, productsResult]) // eslint-disable-line

    const productsToRenderNoPosition = useMemo(
        () =>
            visibleProductData?.items && visibleProductData.items.length
                ? visibleProductData.items
                : productItems ?? [],
        [productItems, visibleProductData?.items]
    )
    const productsToRender = useMemo(
        () =>
            productsToRenderNoPosition &&
            productsToRenderNoPosition.map((product, index) => {
                return { ...product, position: (index + 1) * currentPage }
            }),
        [productsToRenderNoPosition, currentPage]
    )

    return {
        visibleProductData,
        //@ts-ignore
        productsToRender
    }
}
