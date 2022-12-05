import {
    ButtonLabel,
    ProductStockStatus,
    ProductVariant
} from '../use-product-ui'

/**
 * Get Cart button status
 * @param __typename
 * @param stockStatus
 * @param variantId
 * @returns
 */
export const getButtonLabel = (
    isConfig: boolean,
    parentStockStatus: string,
    stockStatus: string,
    variantId: number,
    buttonActionLabel: string
): ButtonLabel | string => {
    if (
        parentStockStatus === ProductStockStatus.OutOfStock ||
        stockStatus === ProductStockStatus.OutOfStock ||
        variantId === ProductVariant.NOT_EXIST
    ) {
        return ButtonLabel.OUT_OF_STOCK
    }

    if (isConfig && variantId === ProductVariant.NOT_SELECTED) {
        return ButtonLabel.SELECT_A_VARIANT
    }

    return buttonActionLabel
}
