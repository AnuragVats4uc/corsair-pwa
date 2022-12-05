import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from '@corratech/pylot-ui'

import s from './HydroXSubmenu.module.scss'

export interface HydroXToggleButtonProps {
    isMenuVisible: boolean
    setMenuVisible: Dispatch<SetStateAction<boolean>>
    submenuToggleButton: string
}

/**
 * Renders menu toggle button
 * @returns JSX
 */
const HydroXToggleButton = ({
    isMenuVisible,
    setMenuVisible,
    submenuToggleButton
}: HydroXToggleButtonProps): JSX.Element => {
    const { t } = useTranslation(['common'])

    const HamburgerButton = () => (
        <div className={s['hamburger-btn']}>
            <div className={s['line']} />
            <div className={s['line']} />
            <div className={s['line']} />
        </div>
    )

    return (
        <Button
            className={`${s['hydroXSubmenu-toggle']} font-secondary`}
            onClick={() => setMenuVisible(!isMenuVisible)}
        >
            <div className={s['hydroXSubmenu-toggleLabel']}>
                <span>{t(submenuToggleButton)}</span>
                <span>{t('Close Menu')}</span>
            </div>
            {HamburgerButton()}
        </Button>
    )
}

export default HydroXToggleButton
