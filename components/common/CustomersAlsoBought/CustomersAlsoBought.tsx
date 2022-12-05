import React, { FC, useCallback, useEffect, useState } from 'react'
import s from './CustomersAlsoBought.module.scss'
import Product from './Product/Product'
import Slider from 'react-slick'
import Arrow from '../Carousel/Arrow/Arrow'
import { getProducts } from '@pylot-data/api/operations/get-products'
import { ProductInterface } from '@pylot-data/fwrdschema'
import { useRouter } from 'next/router'

const defaultSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    /* eslint-disable i18next/no-literal-string */
    prevArrow: <Arrow color="black" direction="left" />,
    nextArrow: <Arrow color="black" direction="right" />
}

export type CustomersAlsoBoughtContent = {
    heading: string
    addToOrder: string
}

export interface CustomersAlsoBoughtProps {
    content: CustomersAlsoBoughtContent
    customers_also_bought_skus: string[]
}

// type any will be changed after Algolia is connected to this component
const CustomersAlsoBought: FC<CustomersAlsoBoughtProps> = ({
    content,
    customers_also_bought_skus
}) => {
    const { locale } = useRouter()
    const [relatedProductsData, setRelatedProductsData] = useState<
        ProductInterface[]
    >([])

    const getRelatedProductsData = useCallback(
        async (skus: string[], locale: string) => {
            const products = await getProducts(skus, null, locale)
            const productsData: ProductInterface[] = []

            products.forEach((productData) => {
                const index = productData.productData.findIndex(
                    (product, i) =>
                        product?.sku === productData.productData[i]?.sku
                )

                if (index != null) {
                    productsData.push(productData.productData[index])
                }
            })

            return productsData?.filter(Boolean)
        },
        []
    )

    useEffect(() => {
        if (!customers_also_bought_skus || !locale) return

        getRelatedProductsData(
            customers_also_bought_skus as string[],
            locale
        ).then((productsData: ProductInterface[]) => {
            if (productsData?.length) {
                setRelatedProductsData(productsData)
            }
        })
    }, [])

    const FIRST_4_PRODUCTS = relatedProductsData.slice(0, 4)

    return (
        <div className={s['customers-also-bought']}>
            <header className={s['cab-header']}>
                <h2>{content.heading}</h2>
            </header>
            <div className={s['desktop']}>
                <ul className={s['products-list']}>
                    {FIRST_4_PRODUCTS.map((product: any) => (
                        <Product
                            key={product.uid}
                            product={product}
                            label={content.addToOrder}
                        />
                    ))}
                </ul>
            </div>
            <div className={s['mobile']}>
                <Slider {...defaultSettings} className={s['slider-wrapper']}>
                    {FIRST_4_PRODUCTS.map((product: any) => (
                        <Product
                            key={product.uid}
                            product={product}
                            label={content.addToOrder}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default CustomersAlsoBought
