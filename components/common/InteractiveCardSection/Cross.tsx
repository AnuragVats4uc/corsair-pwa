import React, { VFC } from 'react'
import CrossIcon from '@components/icons/Cross'
import s from './Cross.module.scss'

export type CrossProps = {
    onClick: () => void
}

const c = /*tw*/ {
    cross: `${s['cross']} border border-white border-solid rounded-full absolute cursor-pointer flex justify-center items-center`
}

const Cross: VFC<CrossProps> = ({ onClick }) => {
    return (
        <div
            className={c.cross}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.code === 'Escape') {
                    onClick()
                }
            }}
            tabIndex={0}
            role="button"
        >
            <CrossIcon />
        </div>
    )
}

export default Cross
