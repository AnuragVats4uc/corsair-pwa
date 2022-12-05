import { SwatchGroup } from './Swatches'
import type {
    CategoryInterface,
    ConfigurableVariant,
    SimpleProduct
} from '@pylot-data/pylotschema'
import type { Option } from '@pylot-data/hooks/product/use-product-ui'
import React, { ReactElement, useMemo, Dispatch, SetStateAction } from 'react'
import { getProductOptionData } from './utils/getProductOptionData'
import s from './VariantSelector.module.scss'

export type SelectedOptions = {
    [key: string]: string | null
}

export type UseOptionSelectorReturn = {
    categories: CategoryInterface[]
    selectedOptions: SelectedOptions
    setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
    options: Option[]
}

export type VariantSelectorProps = UseOptionSelectorReturn & {
    disableAll: boolean
    variants: ConfigurableVariant[]
    showVariantCount?: boolean
    displaySwatchOptionLabel?: boolean
    variant: SimpleProduct
    notSellable: boolean
}

/**
 * Component that displays attributes and swatches.
 * Should be used in combination with `useOptionSelector` hook.
 * @param param0 product option API, that `useOptionSelector` hook provides.
 * @param param0.disableAll boolean value that indicates if parent product is *OUT_OF_STOCK*
 * @param param0.variants configurable product variants. Disabled options are calculated based on variant attributes.
 * @returns Varian selector representation (attributes and swatches)
 */
const VariantSelector = ({
    categories = [],
    options,
    selectedOptions,
    setSelectedOptions,
    variants = [],
    variant,
    notSellable
}: VariantSelectorProps): ReactElement => {
    const variantsWithCategories = variants.map((variant) => ({
        ...variant,
        product: { ...variant.product, categories: categories }
    }))

    const variantsByOptions = getProductOptionData(
        options,
        selectedOptions,
        variantsWithCategories as ConfigurableVariant[]
    )

    const renderItems = useMemo(
        () =>
            options.map((opt) => (
                <div className={s['swatch-group-items']} key={opt.code}>
                    <SwatchGroup
                        option={opt}
                        selectedOptions={selectedOptions}
                        variantData={variantsByOptions}
                        currentVariantProduct={variant}
                        notSellable={notSellable}
                    />
                </div>
            )),
        [options, selectedOptions, variantsByOptions, variant]
    )

    return <div className={s['swatch-group-container']}>{renderItems}</div>
}

export default VariantSelector
