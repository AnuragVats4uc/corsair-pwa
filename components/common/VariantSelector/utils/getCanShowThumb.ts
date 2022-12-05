import type {
    Maybe,
    ConfigurableAttributeOption
} from '@pylot-data/pylotschema'
import { VariantType } from '@pylot-data/enums/VariantType.d'

export enum ThumbnailVariants {
    COLOR = 'color'
}

/**
 * Check if the attribute contains color or package
 * @param code
 * @returns
 */
export const getHasThumbnailAttribute = (code: string) => {
    return code.toLowerCase().includes(ThumbnailVariants.COLOR)
}

export const getCanShowThumb = (
    attributes: Maybe<ConfigurableAttributeOption>[],
    variantType: VariantType
) => {
    if (variantType) return variantType === VariantType.Image

    //fallback old method so it won't break the FE
    //as we don't have proper data for all products
    return attributes?.some((attribute) =>
        getHasThumbnailAttribute(attribute?.code!)
    )
}
