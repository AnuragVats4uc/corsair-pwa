import type {
    ConfigurableProduct,
    MediaGalleryInterface
} from '@pylot-data/fwrdschema'
import { ProductVariant } from '../use-product-ui'

/**
 * Get media gallery entries to generate the gallery
 * @param product
 * @param variantId
 * @returns Media gallery entries either from product or the variant
 */
export const getMediaGalleryEntries = (
    product: ConfigurableProduct,
    variantId: number
): MediaGalleryInterface[] => {
    let gallery
    if (variantId === ProductVariant.NOT_SELECTED) {
        gallery = product?.media_gallery ?? []
    } else {
        gallery = product?.variants?.[variantId]?.product?.media_gallery ?? []
    }

    if (gallery?.length) return gallery as MediaGalleryInterface[]
    if (product?.small_image) return [product?.small_image]

    return []
}
