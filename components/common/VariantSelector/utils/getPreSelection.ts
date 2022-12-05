import { ConfigurableProduct } from '@pylot-data/pylotschema'

/**
 * Util method to find the variant based on uid
 * return the attribute code and attribute label as an object
 * for pre-selection for PDP variants
 * eg: { color: 'black', package_size: 'single', size: '140mm' }
 * @param uid
 * @param product
 * @returns Record<string, string>
 */
export const getPreSelection = (uid: string, product: ConfigurableProduct) => {
    if (!uid || !product || !product?.variants?.length) return

    const variant = product?.variants.find(
        (variantItem) => variantItem?.product?.uid === uid
    )

    if (!variant) return

    const { attributes } = variant

    return attributes?.reduce((acc, attribute) => {
        if (!attribute?.code || !attribute?.label) return acc
        acc[attribute.code] = attribute.label
        return acc
    }, {} as Record<string, string>)
}
