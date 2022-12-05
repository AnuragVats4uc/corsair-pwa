import type { SelectedOptions } from '@corratech/corsair-variant-selector'
import { useOptionSelector } from '@corratech/corsair-variant-selector'
import type {
    ConfigurableAttributeOption,
    ConfigurableProductOptionsValues,
    ConfigurableVariant,
    Maybe,
    MediaGalleryInterface,
    SimpleProduct
} from '@pylot-data/fwrdschema'
import type { ConfigurableProductOptions } from '@pylot-data/pylotschema'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ProductType } from './use-product-fetch'
import { getButtonLabel } from './utils/getButtonLabel'
import { getMediaGalleryEntries } from './utils/getMediaGalleryEntries'

// Redefining here, as importing original enum as a value from (fwrd/pylot)schema does not work
export enum ProductStockStatus {
    InStock = 'IN_STOCK',
    OutOfStock = 'OUT_OF_STOCK'
}

export enum OptionType {
    VisualSwatch = 'VisualSwatch',
    TextSwatch = 'TextSwatch',
    Dropdown = 'Dropdown',
    Other = 'Other'
}

export type Option = {
    displayName: string
    code: string
    values: Maybe<ConfigurableProductOptionsValues[]>
    type: OptionType | null
}

export enum ButtonLabel {
    OUT_OF_STOCK = 'Out of stock',
    SELECT_A_VARIANT = 'Select a variant',
    ADD_TO_CART = 'Add to cart',
    UPDATE_CART_ITEM = 'Update'
}

export enum ProductVariant {
    NOT_EXIST = -1,
    NOT_SELECTED = -2
}

export type UseProductUIReturn<ProductType> = {
    setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
    selectedOptions: SelectedOptions
    options: Option[]
    variantId: number
    variant: SimpleProduct | ProductType
    mediaGalleryEntries: Array<Maybe<MediaGalleryInterface>>
    buttonLabel: string
    isButtonDisabled: boolean
    isConfigOptionSelected: boolean
    selectedOptionUIDs: string[]
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
    isOutOfStock: boolean
}

export type UseProductUi<ProductType> = (
    product: ProductType,
    options?: {
        preselectedOptions?: Record<string, string>
        buttonActionLabel?: ButtonLabel
        sku?: string
    }
) => UseProductUIReturn<ProductType>

export const useProductUI: UseProductUi<any> = (
    product,
    { preselectedOptions, buttonActionLabel = ButtonLabel.ADD_TO_CART, sku } = {
        buttonActionLabel: ButtonLabel.ADD_TO_CART
    }
) => {
    const { t } = useTranslation(['common'])

    const variantIndex =
        (product?.variants as ConfigurableVariant[])?.findIndex(
            (variant) =>
                variant!.product!.sku?.toLowerCase() === sku?.toLowerCase()
        ) ?? ProductVariant.NOT_SELECTED

    const [quantity, setQuantity] = useState<number>(1)

    const productType = product?.__typename as ProductType | undefined
    const isConfig =
        product?.variants?.length > 0 &&
        productType === ProductType.CONFIGURABLE_PRODUCT

    const variant = (product?.variants?.[variantIndex]?.product ??
        product) as SimpleProduct

    const { options, setSelectedOptions } = useOptionSelector(
        product?.configurable_options as ConfigurableProductOptions[],
        preselectedOptions!,
        true,
        product?.variants?.[variantIndex]?.attributes || []
    )

    const selectedOptions =
        (product?.variants?.[variantIndex]
            ?.attributes as ConfigurableAttributeOption[])?.reduce(
            (accOptions, curr) => {
                if (!curr?.code || !curr.label) return accOptions
                accOptions[curr.code] = curr.label as string
                return accOptions
            },
            {} as Record<string, string>
        ) || {}

    const isButtonDisabled =
        variantIndex === ProductVariant.NOT_EXIST ||
        (product as SimpleProduct)?.stock_status ===
            ProductStockStatus.OutOfStock ||
        variant?.stock_status === ProductStockStatus.OutOfStock ||
        (isConfig && variantIndex === ProductVariant.NOT_SELECTED)

    const isOutOfStock =
        product?.stock_status === ProductStockStatus.OutOfStock ||
        variant?.stock_status === ProductStockStatus.OutOfStock ||
        variantIndex === ProductVariant.NOT_EXIST

    const isConfigOptionSelected =
        isConfig && variantIndex === ProductVariant.NOT_SELECTED

    const { attributes } = product?.variants?.[variantIndex] ?? {}

    const selectedOptionUIDs =
        (attributes as ConfigurableAttributeOption[])?.map(
            (attr) => attr?.uid ?? ''
        ) ?? []

    // Removed a useEffect here for choosing the active variant based on the selected options,
    // it is not needed in Corsair because each variant has its own product page,
    // so we can select the variant by sku

    //get the media galleries to render the gallery component
    const mediaGalleryEntries = useMemo(
        () => getMediaGalleryEntries(product, variantIndex),
        [product, variantIndex]
    )

    //get button text status
    const buttonLabel = useMemo(() => {
        const label = getButtonLabel(
            isConfig,
            product?.stock_status,
            variant?.stock_status || ProductStockStatus.OutOfStock,
            variantIndex,
            buttonActionLabel
        )
        return t(label)
        // TODO: check if that brings any benefit
    }, [
        buttonActionLabel,
        isConfig,
        variant?.stock_status,
        product?.stock_status,
        variantIndex,
        t
    ])

    return {
        setSelectedOptions,
        selectedOptions,
        setQuantity,
        quantity,
        options,
        variantId: variantIndex,
        variant,
        mediaGalleryEntries,
        buttonLabel,
        isButtonDisabled,
        isConfigOptionSelected,
        selectedOptionUIDs,
        isOutOfStock
    }
}
