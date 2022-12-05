import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import s from './StockStatus.module.scss'

export type StockStatusProps = {
    isOutOfStock: boolean
}

export const StockStatus: FC<StockStatusProps> = ({ isOutOfStock }) => {
    const { t } = useTranslation('pdp')
    return (
        <div className={s['stock-status']}>
            {isOutOfStock ? t('Out Of Stock') : t('In Stock')}
        </div>
    )
}
