import type { ReactElement } from 'react'
import React, { useState } from 'react'
import type {
    SelectedOptions,
    UseOptionSelectorReturn
} from '../VariantSelector'
import type { Option } from '@pylot-data/hooks/product/use-product-ui'
import { SimpleProduct } from '@pylot-data/pylotschema'
import { ProductStockStatus } from '@pylot-data/pylotschema.d'
import s from './SwatchGroup.module.scss'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import { ChevronUp } from '@components/icons'
import { VariantPrice } from '../VariantPrice'
import { ModelTypeEnum } from 'config'
import { useProductUrlBuilder } from '@lib/hooks/useBuildProductUrl'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { isTransactionalView } from 'helpers'
import { useRouter } from 'next/router'

type SwatchGroupProps = {
    selectedOptions: UseOptionSelectorReturn['selectedOptions']
    option: Option
    variantData?: Record<string, any>
    currentVariantProduct: SimpleProduct
    notSellable: boolean
}

export const SwatchGroup = ({
    option,
    selectedOptions,
    variantData,
    currentVariantProduct,
    notSellable
}: SwatchGroupProps): ReactElement => {
    const { t } = useTranslation(['common'])
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()
    const { locale } = router
    const active = selectedOptions[option.code as keyof SelectedOptions] ?? ''

    const productUrlBuilder = useProductUrlBuilder({
        page: ModelTypeEnum.PRODUCT
    })

    const renderItems = option.values!.map((v, i: number) => {
        const value = v.label! as string
        const variantForValue = variantData![option.code][value]
        const isOutOfStock =
            variantForValue.label === value &&
            variantForValue.stock_status === ProductStockStatus.OutOfStock

        if (!Object.keys(variantForValue).length) return null

        return (
            <div
                key={`${v.value_index ?? value}-${i}`}
                className={cn([isOutOfStock && s['swatch-wrapper-disabled']])}
            >
                <Link
                    href={productUrlBuilder({
                        product: variantForValue
                    })}
                >
                    <a>
                        <li
                            className={cn(
                                s['swatch-item'],
                                [active === value && s['swatch-active']],
                                [isOutOfStock && s['swatch-item-disabled']]
                            )}
                            aria-hidden="true"
                        >
                            <div className={s['swatch-text-container']}>
                                {variantForValue?.thumbnail?.url && (
                                    <div className={s['swatch-image']}>
                                        <Image
                                            src={
                                                variantForValue?.thumbnail?.url
                                            }
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                )}
                                <span className={s['swatch-value']}>
                                    {value}
                                </span>
                            </div>
                            {isTransactionalView('pdp', locale) &&
                                !notSellable && (
                                    <>
                                        {variantForValue.price
                                            ?.minimum_price && (
                                            <VariantPrice
                                                priceRange={
                                                    variantForValue.price
                                                }
                                                variant={currentVariantProduct}
                                            />
                                        )}
                                        {isOutOfStock && (
                                            <span className={s['oos-span']}>
                                                {t('OUT OF STOCK')}
                                            </span>
                                        )}
                                    </>
                                )}
                        </li>
                    </a>
                </Link>
            </div>
        )
    })

    return (
        <div className={s['swatch-group-container']}>
            <div
                className={cn(s['swatch-selected-label'], [
                    isVisible && s['swatch-dropdown-active']
                ])}
                aria-hidden="true"
                onKeyDown={() => setIsVisible(!isVisible)}
                onClick={() => setIsVisible(!isVisible)}
            >
                <div>
                    <span className={s['swatch-code']}>
                        {option.displayName}
                    </span>
                    <span className={s['swatch-label']}>{active}</span>
                </div>
                <ChevronUp width={18} />
            </div>
            {isVisible && (
                <ul className={s['swatch-dropdown']}>{renderItems}</ul>
            )}
        </div>
    )
}
