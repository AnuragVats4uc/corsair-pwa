import { FC } from 'react'
import s from './Product.module.scss'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import { ProductPrice } from '../../ProductPrice/ProductPrice'
import { AddToCartCTA } from '@components/common/ProductBlock/AddToCartCTA'
import { ProductInterface } from '@pylot-data/pylotschema'
import { useProductUrlBuilder } from '@lib/hooks/useBuildProductUrl'
import { ModelTypeEnum } from 'config'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
interface ProductProps {
    product: ProductInterface
    label: string
}

const Product: FC<ProductProps> = ({ product, label }) => {
    const { name, image, price_range, description } = product
    const productUrlBuilder = useProductUrlBuilder({
        page: ModelTypeEnum.PRODUCT
    })
    const { t } = useTranslation(['common'])
    const descriptionTranslated = t('{{ description }}', {
        description: description?.html
    })

    return (
        <div
            className={cn(
                s['product-cab'],
                'md:p-6 flex flex-col justify-start items-center m-auto w-full pointer relative'
            )}
        >
            <header
                className={cn('relative flex flex-col md:justify-start w-full')}
            >
                <div className={s['cta-btn']}>
                    <AddToCartCTA
                        sku={product?.sku || ''}
                        uid={product?.uid}
                        product={product}
                        label={label}
                    />
                </div>
                <Link
                    href={productUrlBuilder({
                        product: product
                    })}
                >
                    <span className={s['product-img']}>
                        <Image
                            src={
                                image?.url ||
                                '/images/default-product-image.png'
                            }
                            alt={image?.label || ''}
                            layout="fill"
                            objectFit="contain"
                        />
                    </span>
                </Link>
            </header>
            <section
                className={cn('relative flex flex-col md:justify-start w-full')}
            >
                <h2
                    className={cn(
                        s['product-name'],
                        'text-white font-aktivGrotesk pt-12 overflow-hidden text-ellipsis'
                    )}
                >
                    {t('{{ name }}', {
                        name: name
                    })}
                </h2>
                <p
                    className={`${cn(
                        s['product-description']
                    )} text-white font-bold leading-normal tracking-wider font-bebasNeueSemiExpanded overflow-hidden text-ellipsis`}
                    dangerouslySetInnerHTML={{
                        __html: descriptionTranslated || ''
                    }}
                />
            </section>

            <div className="flex w-full">
                <div className="flex items-start justify-start pt-6 w-full text-white font-bebasNeueSemiExpanded">
                    <ProductPrice
                        priceRange={price_range}
                        className={s['product-price']}
                    />
                </div>
            </div>
        </div>
    )
}

export default Product
