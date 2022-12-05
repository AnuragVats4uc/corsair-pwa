import React from 'react'
import type { VFC } from 'react'
import cn from 'classnames'
import s from './SmartHome.module.scss'
import type { SmartHomeProduct } from './SmartHome.interfaces'

interface CtaDotItemProps {
    onClick: (product: SmartHomeProduct) => void
    product: SmartHomeProduct
    showOnMobile: boolean
    top: number
    left: number
}

export const CtaDotItem: VFC<CtaDotItemProps> = ({
    onClick,
    product,
    top,
    left
}) => {
    return (
        <div
            title={product.title}
            style={{
                left: `${left}%`,
                top: `${top}%`
            }}
            className={cn(
                s['smart-home-dot-item'],
                'flex absolute opacity-100 z-50'
            )}
        >
            <button
                className="w-6 h-6 border-white border border-solid border1 rounded-full bg-transparent flex items-center justify-center cursor-pointer opacity-100"
                onClick={() => onClick(product)}
            >
                <span className="text-white">+</span>
            </button>
        </div>
    )
}
