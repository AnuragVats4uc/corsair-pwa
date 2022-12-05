import { RichContent } from '@corratech/pylot-rich-content'
import { memo, ReactElement } from 'react'
import s from '@pagestyles/PDP.module.scss'
import { ProductInterface } from '@pylot-data/pylotschema'
import ProductInfoBundles from './ProductInfoBundles'

type ProductInfoProps = {
    bundles?: ProductInterface[]
    description?: {
        html?: string
    }
}

const ProductInfoComponent = ({
    description,
    bundles
}: ProductInfoProps): ReactElement | null => {
    if (!description && !bundles) return null

    return (
        <div className={s['pdp-info-wrap']}>
            {description && <RichContent html={description?.html} />}
            {bundles && <ProductInfoBundles bundles={bundles} />}
        </div>
    )
}

export const ProductInfo = memo(ProductInfoComponent)
