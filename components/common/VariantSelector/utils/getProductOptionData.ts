import type { ConfigurableVariant } from '@pylot-data/pylotschema'
import { VariantSelectorProps } from '../VariantSelector'
import { getHasThumbnailAttribute } from '../utils/getCanShowThumb'
import type { Option } from '@pylot-data/hooks/product/use-product-ui'

type VariantOptionsType = Record<string, unknown>
export type AllVariantOptions = Record<string, VariantOptionsType>

const ascSort = (a: Option, b: Option) => (a.code > b.code ? 1 : -1)

export const getProductOptionData = (
    options: VariantSelectorProps['options'],
    selectedOptions: VariantSelectorProps['selectedOptions'],
    variants: ConfigurableVariant[]
): AllVariantOptions => {
    //Get all variants options
    const allVariantOptions = options
        .sort(ascSort)
        .reduce((acc, { code, values }) => {
            acc[code] = values!
                .map((val) => String(val.label))
                .reduce((a, v) => {
                    return { ...a, [v]: {} }
                }, {})
            return acc
        }, {} as AllVariantOptions)

    variants?.forEach(({ product: variantProduct, attributes }) => {
        const variantOptions: Record<string, string> = Object.fromEntries(
            attributes!.map((attr) => [attr!.code, attr!.label])
        )

        const combinations = Object.keys(selectedOptions).filter(
            (optionCode) =>
                variantOptions[optionCode] !== selectedOptions[optionCode]
        )

        //selected variant product
        if (!combinations.length) {
            Object.keys(selectedOptions).forEach((code) => {
                allVariantOptions[code][variantOptions[code]] = {
                    categories: variantProduct?.categories,
                    thumbnail: getHasThumbnailAttribute(code)
                        ? variantProduct?.image
                        : null,
                    price: null, //there will no difference in price for selected options
                    uid: variantProduct?.uid,
                    sku: variantProduct?.sku,
                    url_key: variantProduct?.url_key,
                    stock_status: variantProduct?.stock_status,
                    label: variantOptions[code]
                }
            })
        }

        //other possible combination of the selected variant based on current selection
        //manage the thumbnail and price difference
        if (combinations.length) {
            combinations.forEach(
                (code) =>
                    (allVariantOptions[code][variantOptions[code]] = {
                        categories: variantProduct?.categories,
                        thumbnail: getHasThumbnailAttribute(code)
                            ? variantProduct?.image
                            : null,
                        price: variantProduct?.price_range,
                        uid: variantProduct?.uid,
                        sku: variantProduct?.sku,
                        url_key: variantProduct?.url_key,
                        stock_status: variantProduct?.stock_status,
                        label: variantOptions[code]
                    })
            )
        }
    })
    return allVariantOptions
}
