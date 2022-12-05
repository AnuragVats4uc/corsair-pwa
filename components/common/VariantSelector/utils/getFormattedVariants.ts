import type { ConfigurableVariant } from '@pylot-data/pylotschema'
import type { Variants } from '../hooks/useSwatchTiles'

export const getFormattedVariants = (
    variants: ConfigurableVariant[]
): Variants[] => {
    return variants?.map((variant) => ({
        ...variant,
        product: {
            ...variant?.product,
            url_key: `${variant.product?.url_key}`
        },
        selectedOptions: variant.attributes?.map((attribute) => attribute?.uid)
    })) as Variants[]
}
