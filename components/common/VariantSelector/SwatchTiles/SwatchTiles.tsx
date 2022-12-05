import React, { FC, useMemo, Dispatch, SetStateAction } from 'react'
import type {
    ConfigurableProduct,
    SimpleProduct
} from '@pylot-data/pylotschema'
import { useSwatchTiles, Variants } from '../hooks/useSwatchTiles'
import { getCanShowThumb } from '../utils/getCanShowThumb'
import Image from '@corratech/corsair-image'
import Link from 'next/link'
import { SwatchTwClasses as twClasses } from './SwatchTwClasses'
import s from './SwatchTiles.module.scss'
import cn from 'classnames'
import { useBuildProductUrl } from '@lib/hooks/useBuildProductUrl'
import type {
    THandleSwatchAction,
    TSwatchRefById
} from '../hooks/useSwatchTiles'
import { ModelTypeEnum } from 'config'
import { VariantType } from '@pylot-data/enums/VariantType.d'
import { useRouter } from 'next/router'

export type SwatchTilesProps = {
    product: ConfigurableProduct
    variant: Variants | null
    setSelectedVariant: Dispatch<SetStateAction<null | Variants>>
}

interface ISwatchItem {
    variant: Variants
    handleSwatchAction: THandleSwatchAction
    swatchRefById: TSwatchRefById
    index: number
    selectedVariant: Variants | null
    variantType: VariantType
}

const SwatchItem: FC<ISwatchItem> = ({
    variant,
    handleSwatchAction,
    swatchRefById,
    index,
    selectedVariant,
    variantType
}) => {
    const { attributes, product } = variant
    const label = attributes?.length ? attributes[0]?.label : ''
    const variantText = attributes?.length ? attributes[0]?.variant_text : ''
    const swatchLabel = variantText ?? label

    const productUrl = useBuildProductUrl({
        page: ModelTypeEnum.PRODUCT,
        product: selectedVariant?.product as SimpleProduct
    })

    const handleEvents = () => {
        handleSwatchAction(variant, productUrl, true, swatchRefById[index])
    }

    const productImage =
        product?.image?.url && product?.image?.url.length > 0
            ? product?.image?.url
            : '/images/default-product-image.png'

    return (
        <li
            key={index}
            ref={swatchRefById[index]}
            aria-hidden="true"
            className={cn(s['swatch-tiles'], twClasses.swatchTiles, {
                [s['active-swatch']]:
                    product?.uid === selectedVariant?.product?.uid
            })}
            onMouseEnter={() => handleSwatchAction(variant, productUrl)}
            onClick={handleEvents}
            onKeyPress={handleEvents}
        >
            {getCanShowThumb(attributes!, variantType) ? (
                <div
                    className={cn(
                        s['swatch-tiles-image'],
                        twClasses.swatchTilesImage
                    )}
                >
                    <Image
                        src={productImage}
                        width={48}
                        height={48}
                        alt={`${product!.name}`}
                    />
                </div>
            ) : (
                <p
                    title={swatchLabel as string}
                    className={cn(
                        s['swatch-tiles-text'],
                        twClasses.swatchTilesText
                    )}
                >
                    {swatchLabel}
                </p>
            )}
        </li>
    )
}
/**
 * Product Variant Tiles are used in PLP Grids
 * @param
 * @returns
 */
export const SwatchTiles: FC<SwatchTilesProps> = ({
    product: productItem,
    variant: selectedVariant,
    setSelectedVariant
}) => {
    const {
        variants,
        swatchRefById,
        hasMoreOptions,
        handleSwatchAction
    } = useSwatchTiles(productItem, setSelectedVariant, selectedVariant)

    const router: any = useRouter()
    const filters = [
        ...(router.query?.filter?.matchAll(/::(?<filterValue>.+?)(-|$)/g) || [])
    ].map((f) => f.groups.filterValue)

    let variantsFiltered: Variants[] | null = variants

    const variantsWithFilteredTechSpecs = variants.filter((variant) => {
        const matchingTechSpecFilters = variant.product?.tech_specs?.filter(
            (techSpec) => {
                return filters?.find(
                    (filter: string) => filter === techSpec?.value
                )
            }
        )
        const matchingTechSpecAttributes = variant.attributes?.filter(
            (attribute) =>
                filters?.find((filter: string) => filter === attribute?.label)
        )
        return (
            matchingTechSpecAttributes?.length === filters?.length ||
            matchingTechSpecFilters?.length === filters?.length
        ) //only variants that contains all the tech specs on filter query can be shown
    })

    if (variantsWithFilteredTechSpecs.length > 0) {
        variantsFiltered = variantsWithFilteredTechSpecs
    }

    if (router.query?.filter?.includes('in_stock:true')) {
        variantsFiltered = variantsFiltered.filter((variant: any) => {
            return variant.product.stock_status === 'IN_STOCK'
        })
    }

    if (router.query?.filter?.includes('sp:true')) {
        variantsFiltered = variantsFiltered.filter((variant: any) => {
            return (
                variant.product.price_range?.maximum_price?.discount
                    ?.amount_off > 0
            )
        })
    }

    const totalProductVariants = variantsFiltered?.length

    const renderItems = useMemo(
        () =>
            variantsFiltered?.map((variant, index) => {
                return (
                    <SwatchItem
                        variant={variant}
                        handleSwatchAction={handleSwatchAction}
                        swatchRefById={swatchRefById}
                        index={index}
                        selectedVariant={selectedVariant}
                        key={index}
                        variantType={productItem?.variant_type!}
                    />
                )
            }),
        [variants, variantsFiltered]
    )

    const productUrl = useBuildProductUrl({
        page: ModelTypeEnum.PRODUCT,
        product: selectedVariant?.product as SimpleProduct
    })

    const moreLink = hasMoreOptions &&
        selectedVariant?.product?.url_key &&
        productUrl &&
        totalProductVariants >= 1 && (
            <li className={cn(s['more-tiles'], twClasses.moreTiles)}>
                <Link href={productUrl}>
                    <a>+</a>
                </Link>
            </li>
        )

    if (
        (totalProductVariants && totalProductVariants <= 1) ||
        !variants?.length
    )
        return null

    return (
        <ul
            className={cn(
                s['swatch-tiles-container'],
                twClasses.swatchTilesContainer
            )}
        >
            {renderItems}
            {moreLink}
        </ul>
    )
}
