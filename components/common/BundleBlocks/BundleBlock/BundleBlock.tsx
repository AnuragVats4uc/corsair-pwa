import { URLType } from '@pylot-data/hooks/contentful/use-content-json'
import React from 'react'
import { IProductBlocks } from '../../types'
import s from '../BundleBlocks.module.scss'
import cn from 'classnames'
import { usePrice } from '@corratech/pylot-price'
import { useTranslation } from 'next-i18next'
import { PriceRange } from '@pylot-data/pylotschema'

export interface BundleBlockData {
    description: string
    nonInteractiveBlocks: IProductBlocks
    productSku: string
    title: string
    cta: URLType
    ctaLearnMore: URLType
    priceRange: PriceRange
    isInStock: boolean
}

interface BundleBlockProps {
    data: BundleBlockData
    active: boolean
    setProductBlockIndexHandle: (index: number) => void
    index: number
}

const DEFAULT_ERROR_VALUE = '-'

const c = /*tw*/ {
    bundleBlock: `${s['bundle-block']} inline-block bg-black text-center text-white cursor-pointer max-w-full`,
    previousPrice: `${s['previous-price']} font-quinary line-through flex items-center`,
    currentPrice: `${s['current-price']} font-quinary line-through flex items-center font-bold`,
    savedPrice: `${s['saved-price']} text-white font-bold`,
    description: `${s['description']} text-white`
}

const BundleBlock = ({
    data,
    active,
    setProductBlockIndexHandle,
    index
}: BundleBlockProps): JSX.Element | null => {
    const { t } = useTranslation('cms')
    const { title, description, priceRange } = data
    const { subtotal, total, discount } = usePrice(priceRange)

    return (
        <div
            key={title}
            onClick={() => setProductBlockIndexHandle(index)}
            onKeyPress={() => setProductBlockIndexHandle(index)}
            role="button"
            tabIndex={0}
            className={cn(c.bundleBlock, {
                [s['active']]: active
            })}
        >
            <h2 className="text-white whitespace-no-wrap">{title}</h2>
            <div>
                <h3 className={c.previousPrice}>
                    {subtotal || DEFAULT_ERROR_VALUE}
                </h3>
                <h3 className={c.currentPrice}>
                    {total || DEFAULT_ERROR_VALUE}
                </h3>
            </div>
            <p className={c.savedPrice}>
                {t('bundles|Save')} {discount || DEFAULT_ERROR_VALUE}
            </p>
            <p className={`${c.description} ${active && 'font-bold'}`}>
                {description}
            </p>
        </div>
    )
}

export default BundleBlock
