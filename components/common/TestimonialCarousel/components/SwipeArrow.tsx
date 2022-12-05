import { VFC } from 'react'
import s from '../AnimatedArrow.module.scss'
import { useTranslation } from 'next-i18next'

export const SwipeArrow: VFC = () => {
    const { t } = useTranslation(['common'])
    return (
        <div className="relative mb-4 md:mb-10">
            <div className={s['animated-arrow']}>
                <div className={s['arrow']} />
                <div className={s['line']} />
            </div>
            <div className="font-bebasNeue relative text-center text-xl md:-left-5 uppercase">
                {t('Click & Drag')}
            </div>
        </div>
    )
}
