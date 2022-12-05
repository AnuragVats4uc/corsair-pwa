import React, { useState, useEffect, useCallback } from 'react'
import ProductBlocksWrapper from '../ProductBlocks/ProductBlocksWrapper'
import s from './BundleBlocks.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import BundleBlock, { BundleBlockData } from './BundleBlock/BundleBlock'
import { getProducts } from '@pylot-data/api/operations/get-products'
import { ProductStockStatus } from '@pylot-data/pylotschema.d'
import { useRouter } from 'next/router'
export interface BundleBlocksType {
    backgroundColor: string
    items: BundleBlockData[]
}

export interface BundleBlocksProps {
    content: BundleBlocksType
}

const c = /*tw*/ {
    bundleBlocksContainer: `${s['bundle-blocks-container']} flex flex-col md:flex-row justify-center m-auto`,
    ctaContainer: `${s['cta-container']} w-full flex justify-center mb-4 md:mb-0`,
    productDataContainer: `${s['product-data-container']} opacity-100 duration-300 transition-all`
}

const BundleBlocks = ({ content }: BundleBlocksProps): JSX.Element | null => {
    const { locale, defaultLocale } = useRouter()
    const [productBlockIndex, setProductBlockIndex] = useState<number>(0)
    const [isContentInTransition, setIsContentInTransition] = useState(false)
    const [blocks, setBlocks] = useState<BundleBlockData[]>([])

    const { items, backgroundColor } = content
    const bundleBlock = blocks[productBlockIndex]
    const cta = bundleBlock?.cta
    const ctaLearnMore = bundleBlock?.ctaLearnMore
    const nonInteractiveBlock = bundleBlock?.nonInteractiveBlocks
    const productSkus = items?.map((block) => block.productSku)
    let timerHideContent: number

    const getBundleBlocksWithPriceData = useCallback(async () => {
        const products = await getProducts(
            productSkus,
            null,
            locale || defaultLocale || 'en-US'
        )
        const newBlocks: BundleBlockData[] = []

        if (!products?.length) return

        items.forEach((block) => {
            products.forEach((product) => {
                const productPriceRange = product.productData[0]?.price_range
                const stockStatus = product.productData[0]?.stock_status
                if (
                    block.productSku === product.productSku &&
                    productPriceRange &&
                    !newBlocks.find(
                        (newBlock) => newBlock.productSku === product.productSku
                    )
                ) {
                    newBlocks.push({
                        ...block,
                        priceRange: productPriceRange,
                        isInStock: stockStatus === ProductStockStatus.InStock
                    })
                }
            })
        })

        return newBlocks
    }, [productSkus, items])

    useEffect(() => {
        getBundleBlocksWithPriceData().then(
            (newBlocks: BundleBlockData[] | undefined) => {
                if (!newBlocks?.length) return
                setBlocks(newBlocks)
            }
        )

        return () => {
            clearTimeout(timerHideContent)
        }
    }, [])

    const setProductBlockIndexHandle = (index: number) => {
        setIsContentInTransition(true)
        timerHideContent = window.setTimeout(() => {
            setIsContentInTransition(false)
            setProductBlockIndex(index)
        }, 150)
    }

    return blocks.length > 0 ? (
        <div style={{ backgroundColor: backgroundColor }}>
            <div className={c.bundleBlocksContainer}>
                {blocks.map((block, i) => (
                    <BundleBlock
                        key={block.title}
                        data={block}
                        index={i}
                        setProductBlockIndexHandle={setProductBlockIndexHandle}
                        active={i === productBlockIndex}
                    />
                ))}
            </div>

            <div
                className={cn(c.productDataContainer, {
                    [s['in-transition']]: isContentInTransition
                })}
            >
                {bundleBlock?.isInStock && cta?.url && (
                    <div className={c.ctaContainer}>
                        <Link href={cta.url}>{cta.text}</Link>
                    </div>
                )}

                {!bundleBlock?.isInStock && ctaLearnMore?.url && (
                    <div className={c.ctaContainer}>
                        <Link href={ctaLearnMore.url}>{ctaLearnMore.text}</Link>
                    </div>
                )}

                {nonInteractiveBlock && (
                    <ProductBlocksWrapper productBlocks={nonInteractiveBlock} />
                )}
            </div>
        </div>
    ) : (
        <span />
    )
}

export default BundleBlocks
