import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import type { PLPFilterTypes } from '@corratech/corsair-filters-and-sort'
import { useTranslation } from 'next-i18next'
import { Maybe, SortFields } from '@pylot-data/fwrdschema'
import s from './Toolbar.module.scss'
import { Button } from '@corratech/pylot-ui'

type ToolbarProps = {
    showItemsEnabled?: boolean
    sortEnabled?: boolean
    sortFields?: Maybe<SortFields>
    filtersToggleEnabled?: boolean
    setMaxVisible?: Dispatch<SetStateAction<number>>
    setCurrentPage?: Dispatch<SetStateAction<number>>
    amountOfProducts?: number
    currentPage?: number | string
    plpManager: PLPFilterTypes.PLPManager
}

const c = {
    btnLabel: `${s['btn-label']} border-none uppercase text-center md:w-44 p-1.5 font-normal font-aktivGrotesk leading-3 w-full`,
    toggleFilters: `${s['toggle-filters']} flex flex-col items-center`,
    toolbarItems: `${s['toolbar-items']} text-sm block pb-2 mb-2 pt-4`
}

export const Toolbar: React.FC<ToolbarProps> = (props): JSX.Element => {
    const { t } = useTranslation('plp')
    const [isSortVisible, setIsSortVisible] = useState(false)

    const {
        setCurrentPage,
        plpManager: {
            plpState: { filtersVisible },
            setFiltersVisible
        }
    } = props

    useEffect(() => {
        document.body.classList.remove('modal-open-mob')
        if (filtersVisible || isSortVisible)
            return document.body.classList.add('modal-open-mob')
    }, [filtersVisible, isSortVisible])

    return (
        <div className={s['product-list-toolbar']}>
            <div className={c.toolbarItems}>
                <div className={c.toggleFilters}>
                    <div className="block md:hidden w-full">
                        <Button
                            className={c.btnLabel}
                            onClick={() => {
                                setFiltersVisible(!filtersVisible)
                                setIsSortVisible(false)
                            }}
                        >
                            {t('Refine')}
                        </Button>
                    </div>
                </div>
            </div>

            {props.children}
        </div>
    )
}
