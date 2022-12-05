import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import Grid from '@components/icons/Grid'
import List from '@components/icons/List'

import s from './OptionsPLPHeader.module.scss'

const c = /*tw*/ {
    container:
        'md-max:hidden text-white flex flex-row gap-4 font-aktivGrotesk mr-8',
    button: `${s.button} w-6/12 uppercase cursor-pointer flex items-center`
}

type OptionsPLPHeaderProps = {
    layout: number
    setLayout: (newLayout: number) => void
}

const OptionsPLPHeader = (props: OptionsPLPHeaderProps): JSX.Element => {
    const { layout, setLayout } = props

    const { t } = useTranslation(['common', 'plp'])

    return (
        <div className={c.container}>
            <button
                className={cn(c.button, {
                    [s['active']]: layout === 0
                })}
                onClick={() => setLayout(0)}
            >
                <List />
                <span>{t('List')}</span>
            </button>
            <button
                className={cn(c.button, {
                    [s['active']]: layout === 1
                })}
                onClick={() => setLayout(1)}
            >
                <Grid />
                <span>{t('Grid')}</span>
            </button>
        </div>
    )
}

export default OptionsPLPHeader
