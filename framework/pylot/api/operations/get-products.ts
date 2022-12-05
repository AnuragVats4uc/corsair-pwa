import { ConfigurableProduct, GiftCardProduct } from '@pylot-data/fwrdschema'
import getProduct from '@pylot-data/api/operations/get-product'

export interface Products {
    productSku: string
    productUrlKey: string
    productData: ConfigurableProduct[] & GiftCardProduct[]
}

export const getProducts = async (
    skus: string[] | null,
    url_keys: string[] | null,
    locale: string
): Promise<Products[]> => {
    const products: Products[] = []
    if (skus?.length) {
        await Promise.all(
            skus?.map(async (productSku) => {
                const product = await getProduct({ sku: productSku, locale })
                const productDetailsItem = product?.productDetail?.items
                products.push({
                    productSku,
                    productUrlKey: '',
                    productData: productDetailsItem
                })
            })
        )
    }
    if (url_keys?.length) {
        await Promise.all(
            url_keys?.map(async (url_key) => {
                const product = await getProduct({ url_key, locale })
                const productDetailsItem = product?.productDetail?.items
                products.push({
                    productSku: '',
                    productUrlKey: url_key,
                    productData: productDetailsItem
                })
            })
        )
    }

    return products
}
