import { FC, memo } from 'react'
import ProductPromoIcon from '@components/icons/ProductPromo'
import s from '@pagestyles/PDP.module.scss'
export interface ProductPromoProps {
    message?: string
}

const c = /*tw*/ {
    container: 'flex items-center justify-start p-2 rounded bg-white w-full',
    codeText: `ml-5 font-normal text-black leading-none ${s['product-promo-text']}`
}

const ProductPromo: FC<ProductPromoProps> = (promo) => {
    if (!promo || !promo.message) {
        return null
    }

    const message = promo.message.includes('__')
        ? promo.message
              .replace(/\s__/gm, ' <strong>')
              .replace(/__\s/gm, '</strong> ')
        : promo.message

    return (
        <div className={c.container}>
            <ProductPromoIcon />
            <span
                className={c.codeText}
                dangerouslySetInnerHTML={{ __html: message }}
            />
        </div>
    )
}

export default memo(ProductPromo)
