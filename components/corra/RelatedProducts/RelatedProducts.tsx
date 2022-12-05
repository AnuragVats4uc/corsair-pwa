import type { Settings as ReactSlickSettings } from 'react-slick'
import { useTranslation } from 'next-i18next'
import s from './RelatedProducts.module.scss'
import type { ConfigurableProduct, SimpleProduct } from '@pylot-data/fwrdschema'
import type { Maybe } from '@pylot-data/pylotschema'

import dynamic from 'next/dynamic'
const Slider = dynamic(() => import('react-slick'))

const settings = {
    arrows: false,
    speed: 400,
    slidesToScroll: 1,
    slidesToShow: 5,
    draggable: true,
    infinite: false,
    dots: false,
    fade: false,
    prevArrow: <button type="button" className="slick-prev" />,
    nextArrow: <button type="button" className="slick-next" />,
    responsive: [
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                dots: true
            }
        }
    ]
} as ReactSlickSettings

export interface RelatedProducts<ProductType> {
    products: ProductType
    ProductTile: React.ElementType
    imgPreviewSize: {
        imageLg: number
        imageSm: number
    }
    sliderSettings: ReactSlickSettings
}

export const RelatedProducts = ({
    products,
    ProductTile,
    imgPreviewSize: { imageLg, imageSm },
    sliderSettings
}: RelatedProducts<
    Maybe<Array<SimpleProduct | ConfigurableProduct>>
>): JSX.Element | null => {
    const { t } = useTranslation(['common'])

    const getPreviewSize = (index: number) => {
        const preIndex = index + 1
        const postIndex = preIndex
        return `?auto=webp&format=pjpg&width=${
            postIndex % 4 === 0 && postIndex % 12 !== 8 ? imageLg : imageSm
        }`
    }

    if (!products?.length) {
        return null
    }

    return (
        <div className={s['related-products']}>
            <div className={s['heading-container']}>
                <h2 className={s.title}>{t('Related Products')}</h2>
            </div>
            <div className={s['products-list']}>
                <Slider {...{ ...settings, ...sliderSettings }}>
                    {products.map(
                        (
                            product: SimpleProduct | ConfigurableProduct,
                            index: number
                        ) => {
                            return (
                                <div className={s['product-item']} key={index}>
                                    <ProductTile
                                        product={product}
                                        imageParam={{
                                            width: getPreviewSize(index)
                                        }}
                                    />
                                </div>
                            )
                        }
                    )}
                </Slider>
            </div>
        </div>
    )
}

RelatedProducts.defaultProps = {
    imgPreviewSize: { imageLg: 854, imageSm: 405 },
    sliderSettings: settings
}
