import React from 'react'

import s from './Indicator.module.scss'

export const LoadingIndicator: React.FC = () => {
    return (
        <div className={s['loading-container']}>
            <span className={s['loading-message']} />
        </div>
    )
}
