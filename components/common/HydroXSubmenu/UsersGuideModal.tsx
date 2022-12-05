import React, { Dispatch, SetStateAction } from 'react'
import { ClickOutside } from '@corratech/pylot-utils'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import type { Text } from '@components/common/types'

import s from './HydroXSubmenu.module.scss'

export interface UsersGuideModalProps {
    displayModal: boolean
    setDisplayModal: Dispatch<SetStateAction<boolean>>
    modal: Text
}

const Modal = dynamic(() => import('@corratech/pylot-ui/src/Modal'))

/**
 * Renders User's guide modal
 * @returns JSX
 */
const UsersGuideModal = ({
    displayModal,
    setDisplayModal,
    modal
}: UsersGuideModalProps): JSX.Element => {
    const { t } = useTranslation(['common'])

    return (
        <ClickOutside
            active={displayModal}
            onClick={() => setDisplayModal(false)}
        >
            <div>
                <Modal
                    className={s['hydroXSubmenu-modal']}
                    open={displayModal}
                    onClose={() => setDisplayModal(false)}
                    focusFirst={false}
                >
                    <h2 className="font-secondary">{t(modal?.text)}</h2>
                    <p>{t(modal?.description)}</p>
                </Modal>
            </div>
        </ClickOutside>
    )
}

export default UsersGuideModal
