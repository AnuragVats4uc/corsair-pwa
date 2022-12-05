export type TransactionalDataType =
    | 'plp'
    | 'pdp'
    | 'serp'
    | 'addToCart'
    | 'filters'
    | 'sorters'
    | 'cart'
    | 'stock'
    | 'customersAlsoBought'
    | 'worksWellWith'

const DISPLAY = true
const HIDE = false

const HIDE_ALL = {
    plp: HIDE,
    pdp: HIDE,
    serp: HIDE,
    addToCart: HIDE,
    filters: HIDE,
    sorters: HIDE,
    cart: HIDE,
    stock: HIDE,
    customersAlsoBought: HIDE,
    worksWellWith: HIDE
}

const DISPLAY_ALL = {
    plp: DISPLAY,
    pdp: DISPLAY,
    serp: DISPLAY,
    addToCart: DISPLAY,
    filters: DISPLAY,
    sorters: DISPLAY,
    cart: DISPLAY,
    stock: DISPLAY,
    customersAlsoBought: DISPLAY,
    worksWellWith: DISPLAY
}

const STORE_VIEWS = {
    CN: HIDE_ALL,
    JP: HIDE_ALL,
    RU: HIDE_ALL,
    WW: HIDE_ALL,
    LM: HIDE_ALL,
    BR: HIDE_ALL,
    KR: HIDE_ALL,
    default: DISPLAY_ALL
}

type STORE_VIEW_REGIONS = keyof typeof STORE_VIEWS

export const isTransactionalView = (
    dataType: TransactionalDataType,
    locale?: string
): boolean => {
    const currentRegionCode = locale?.substring(3)

    return STORE_VIEWS[currentRegionCode as STORE_VIEW_REGIONS]
        ? STORE_VIEWS[currentRegionCode as STORE_VIEW_REGIONS][dataType]
        : STORE_VIEWS['default'][dataType]
}
