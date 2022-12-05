import React, { SetStateAction, SyntheticEvent, Dispatch } from 'react'
import { ProductPrice } from '../ProductPrice/ProductPrice'
import s from './CompareTile.module.scss'
import styles from '@pagestyles/Plp.module.scss'
import Image from '@corratech/corsair-image'
import Link from 'next/link'
import { useBuildProductUrl } from '@lib/hooks/useBuildProductUrl'
import { ModelTypeEnum } from 'config'
import { ProductInterface } from '@pylot-data/fwrdschema'

interface CompareTileInterface {
    element: any
    key: number
    setCompareItems: Dispatch<SetStateAction<any>>
}

const categoryUrlSuffix = '.html'

export const CompareTile = ({
    element,
    key,
    setCompareItems
}: CompareTileInterface) => {
    const {
        uid,
        small_image,
        price_range,
        name,
        sku,
        __typename: typename
    } = element

    const productUrl = useBuildProductUrl({
        page: ModelTypeEnum.PRODUCT,
        product: element
    })

    /**
     * Handle Remove Compare Item Click
     */
    const handleRemoveCompareItem = (event: SyntheticEvent<EventTarget>) => {
        const { target } = event

        if (!(target instanceof HTMLButtonElement)) return

        const { compareSku } = target.dataset
        const $correspondingCheckbox = document.getElementById(
            `checkbox-${compareSku}`
        ) as HTMLInputElement

        if (!$correspondingCheckbox) {
            const localStorageCompareItems: string | null =
                localStorage.getItem('compare_items') || null

            if (localStorageCompareItems === '[]') return

            const parseCompareItems = localStorageCompareItems
                ? JSON.parse(localStorageCompareItems)
                : []

            setCompareItems((prevState: []) => {
                return prevState.filter((element: ProductInterface) => {
                    return element.sku !== compareSku
                })
            })

            localStorage.setItem(
                'compare_items',
                JSON.stringify(
                    parseCompareItems.filter((element: ProductInterface) => {
                        return element.sku !== compareSku
                    })
                )
            )
        } else {
            $correspondingCheckbox.click()
        }
    }

    return (
        <div className={s.compareTitle} key={key}>
            <button
                className={s.close}
                data-compare-sku={sku}
                onClick={(event) => handleRemoveCompareItem(event)}
                type="button"
            />
            <Link href={`${productUrl}${categoryUrlSuffix}`}>
                <a>
                    <div aria-label={name} className={s.link}>
                        <div className={s.image}>
                            <Image
                                alt={name || 'placeholder'}
                                src={
                                    small_image?.url ||
                                    '/images/default-product-image.png'
                                }
                                layout="fill"
                            />
                        </div>

                        <div className={s.content}>
                            <h3 className={s.header}>{name}</h3>
                            <div className={styles['compare-tile-price']}>
                                <ProductPrice
                                    className={String(typename).toLowerCase()}
                                    priceRange={price_range}
                                />
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}
