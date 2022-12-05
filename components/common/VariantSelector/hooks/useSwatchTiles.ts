import {
    useEffect,
    useMemo,
    createRef,
    Dispatch,
    SetStateAction,
    RefObject
} from 'react'
import {
    ConfigurableProduct,
    ConfigurableVariant
} from '@pylot-data/pylotschema'
import { getFormattedVariants } from '../utils/getFormattedVariants'
import { useRouter } from 'next/router'

export type Variants = ConfigurableVariant & {
    selectedOptions: string[]
}
export type THandleSwatchAction = (
    Variant: Variants,
    productUrl: string,
    isClickEvent?: boolean,
    swatchRefById?: RefObject<HTMLLIElement>
) => void

export type TSwatchRefById = Record<number, RefObject<HTMLLIElement>>

export type UseSwatchTilesReturnTypes = {
    hasMoreOptions: boolean | null | undefined
    variants: Variants[]
    swatchRefById: TSwatchRefById
    handleSwatchAction: THandleSwatchAction
}

const isTouchDevice = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
}

const VARIANT_COUNT = 4
const INITIAL_EVENT_TYPE = 'hover'

export const useSwatchTiles = (
    product: ConfigurableProduct,
    setSelectedVariant: Dispatch<SetStateAction<null | Variants>>,
    selectedVariant: Variants | null
): UseSwatchTilesReturnTypes => {
    const router = useRouter()
    const hasMoreOptions =
        product?.variants && product.variants.length > VARIANT_COUNT
    const variantsLimited = product.variants?.slice(0, VARIANT_COUNT)
    const variants = getFormattedVariants(
        variantsLimited as ConfigurableVariant[]
    )

    /**
     * Swatch refs for identifying the double click events for
     * touch devices
     */
    const swatchRefById = useMemo(() => {
        const refs = {} as Record<number, RefObject<HTMLLIElement>>
        variants?.forEach(
            (value, index) => (refs[index] = createRef<HTMLLIElement>())
        )
        return refs
    }, [variants])

    /**
     * Set the first item as selected always if non-selected
     */
    useEffect(() => {
        if (variants?.length && !selectedVariant) {
            setSelectedVariant(variants[0])
        }
    }, [selectedVariant, variants])

    /**
     * handle swatch click / hover events
     * @param variant
     */
    const handleSwatchAction = (
        variant: Variants,
        productUrl: string,
        isClickEvent = false,
        swatchRef?: RefObject<HTMLLIElement>
    ) => {
        if (isTouchDevice() && isClickEvent && swatchRef?.current) {
            if (swatchRef.current.classList.contains(INITIAL_EVENT_TYPE)) {
                router.push(productUrl)
            } else {
                setSelectedVariant(variant)
                swatchRef.current.classList.add(INITIAL_EVENT_TYPE)
            }
            return
        }

        if (isClickEvent) {
            router.push(productUrl)
        } else {
            setSelectedVariant(variant)
        }
    }

    return {
        hasMoreOptions,
        swatchRefById,
        variants,
        handleSwatchAction
    }
}
