import { FC } from 'react'
import cn from 'classnames'
import { ProductFamilyBlockVariantType } from '../types'
import Image from '@corratech/corsair-image'
import s from './ProductFamily.module.scss'

interface ProductFamilyBlockVariantProps {
    productBlockVariant: ProductFamilyBlockVariantType
    handleSetActiveVariantSku: (sku: any) => void
    activeVariantSku: string | null
    handleSetProductVariantURL: (url: any) => void
    productVariantURL: string | undefined
    index: number
    classNameVariantImage?: string
}

const ProductFamilyBlockVariant: FC<ProductFamilyBlockVariantProps> = ({
    productBlockVariant,
    handleSetActiveVariantSku,
    activeVariantSku,
    handleSetProductVariantURL,
    index,
    classNameVariantImage
}) => {
    const handleSwatchClick = (sku: string, url: string) => {
        handleSetActiveVariantSku(sku || null)
        handleSetProductVariantURL(url || null)
    }
    return (
        <div className={`${classNameVariantImage}`}>
            <div className="flex flex-col items-center cursor-pointer relative">
                <div
                    className={`${cn({
                        'border-white border-2':
                            activeVariantSku === productBlockVariant.sku ||
                            (index === 0 && activeVariantSku === null)
                    })} rounded-full flex items-center justify-center absolute ${
                        s['swatch-image']
                    }`}
                    onClick={() =>
                        handleSwatchClick(
                            productBlockVariant.sku,
                            productBlockVariant?.variantImage?.file.url
                        )
                    }
                    tabIndex={0}
                    role="button"
                    onKeyDown={(event) => handleSetActiveVariantSku(event.key)}
                >
                    <Image
                        src={`${productBlockVariant?.colorSwatch?.file.url}`}
                        alt={`${productBlockVariant?.colorSwatch?.description}`}
                        className="rounded-full"
                        layout="fixed"
                        width={32}
                        height={32}
                    />
                </div>
                <div
                    className={`flex mt-16 justify-center ${cn({
                        'text-gray-400':
                            activeVariantSku !== productBlockVariant.sku
                    })} ${cn({
                        'text-white':
                            activeVariantSku === productBlockVariant.sku
                    })} ${s['swatch-text']}`}
                >
                    {productBlockVariant?.colorSwatch?.title}
                </div>
            </div>
        </div>
    )
}

export default ProductFamilyBlockVariant
