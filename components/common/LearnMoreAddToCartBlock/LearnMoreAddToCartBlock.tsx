import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { ProductBlock } from '../ProductBlock'
import { ILearnMoreBlock, IProductBlock } from '../types'
import s from './LearnMoreAddToCartBlock.module.scss'
import { SliderWrapper } from '../SliderWrapper'
import Arrow from '@components/common/Carousel/Arrow/Arrow'
import { getProducts } from '@pylot-data/api/operations/get-products'
import { useRouter } from 'next/router'
import { PriceRange } from '@pylot-data/fwrdschema'

export type LearnMoreAddToCartBlockProps = {
    block: ILearnMoreBlock
}

type BundleBlockData = IProductBlock & {
    priceRange: PriceRange
}

const MIN_ELEMENTS_BEFORE_SLIDE = 3

const LearnMoreAddToCartBlock: VFC<LearnMoreAddToCartBlockProps> = ({
    block
}) => {
    const { heading, subheading, bodyCopy } = block
    const [productBlocksWithPrice, setProductBlocksWithPrice] = useState<
        BundleBlockData[]
    >([])
    const { locale, defaultLocale } = useRouter()

    const getProductBlocksWithPriceData = useCallback(
        async (skus: string[]) => {
            const newBlocks: BundleBlockData[] = []

            const products = await getProducts(
                skus,
                null,
                locale || defaultLocale || 'en-US'
            )

            if (!products?.length) return

            block.products.forEach((blockData) => {
                products.forEach((product) => {
                    const productPriceRange =
                        product.productData[0]?.price_range

                    if (
                        blockData.sku === product.productSku &&
                        productPriceRange &&
                        !newBlocks.find(
                            (newBlock) => newBlock.sku === product.productSku
                        )
                    ) {
                        newBlocks.push({
                            ...blockData,
                            priceRange: productPriceRange
                        })
                    }
                })
            })
            return newBlocks
        },
        []
    )

    useEffect(() => {
        if (!block.products) {
            return
        }

        const skus: string[] = block.products.map((product) => product.sku)

        if (!skus.length) {
            return
        }

        getProductBlocksWithPriceData(skus).then(
            (newBlocks: BundleBlockData[] | undefined) => {
                if (!newBlocks?.length) return
                setProductBlocksWithPrice(newBlocks)
            }
        )
    }, [])

    const productBlockList = useMemo(() => {
        if (!productBlocksWithPrice) {
            return null
        }

        return productBlocksWithPrice.map((productBlock, index) => (
            <ProductBlock
                key={`${productBlock.title}-${index}`}
                productBlock={productBlock}
            />
        ))
    }, [productBlocksWithPrice])

    const hasMinimumElements =
        block.products.length <= MIN_ELEMENTS_BEFORE_SLIDE

    if (!productBlockList || productBlockList.length < 1) {
        return null
    }

    return (
        <div className="pb-8 mt-20 md:mt-32">
            {heading && subheading && bodyCopy && (
                <header className={s['product-block-header']}>
                    <p className={s['subheading']}>{subheading}</p>
                    <h2 className={s['heading']}>{heading}</h2>
                    <p className={s['bodycopy']}>{bodyCopy}</p>
                </header>
            )}
            <div className="flex w-full justify-center">
                {hasMinimumElements ? (
                    <div className="grid grid-cols-1 lg:flex lg:justify-around gap-6 place-items-center lg:w-10/12">
                        {productBlockList}
                    </div>
                ) : (
                    <SliderWrapper
                        // eslint-disable-next-line i18next/no-literal-string
                        containerClassName="block w-10/12"
                        settings={{
                            prevArrow: <Arrow direction="left" />,
                            nextArrow: <Arrow direction="right" />,
                            responsive: [
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        }}
                        className={s['product-list-slider']}
                    >
                        {productBlockList}
                    </SliderWrapper>
                )}
            </div>
        </div>
    )
}

export default LearnMoreAddToCartBlock
