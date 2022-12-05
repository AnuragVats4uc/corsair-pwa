import React, { useMemo } from 'react'
import { ProductInterface } from '@pylot-data/pylotschema'
import s from './ProductInfoBundles.module.scss'
import { useTranslation } from 'next-i18next'
import Image from '@corratech/corsair-image'

interface ProductInfoBundlesInterface {
    bundles: ProductInterface[]
}

const c = {
    button: `text-left font-light`,
    copy: `${s.copy}`,
    header: `${s.header} font-bold font-aktivGroteskBold`,
    return: `${s.return} flex items-center`
}

const ProductInfoBundles = ({
    bundles
}: ProductInfoBundlesInterface): JSX.Element | null => {
    const { t } = useTranslation(['pdp'])

    const promoIcon = '/images/promo-icon.png'

    const BundleItems = useMemo(() => {
        return bundles?.map((bundle: ProductInterface) => (
            <li className={s.item} key={bundle?.sku}>
                <button className={`${c.button}`} type="button">
                    {bundle.name}
                </button>
            </li>
        ))
    }, [bundles])

    if (!bundles) return null

    return (
        <div className={s.wrapper}>
            <div className={`${c.return}`}>
                <Image layout="fixed" src={promoIcon} height={24} width={24} />
                <p className={`${c.copy}`}>{t('Bundle Products Return')}</p>
            </div>
            <h5 className={`${c.header}`}>{t('This Bundle Contains:')}</h5>
            <ul className={s.list}>{BundleItems}</ul>
        </div>
    )
}

export default ProductInfoBundles
