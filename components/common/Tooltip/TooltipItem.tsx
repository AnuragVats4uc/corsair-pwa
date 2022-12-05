import React from 'react'
import type { VFC } from 'react'
import cn from 'classnames'
import s from '@components/common/SmartHome/SmartHome.module.scss'
import sc from './TooltipItem.module.scss'
import type { ITooltip } from '@components/common/Tooltip/Tooltip'

type TToolTip = ITooltip

export interface ITooltipItem<T> {
    onClick: (content: T) => void
    content: T
    title: string
    top: string
    left: string
    className?: string
}

export const TooltipItem: VFC<ITooltipItem<TToolTip>> = ({
    onClick,
    content,
    title,
    top,
    left,
    className
}) => {
    return (
        <div
            title={title}
            style={{
                left: `${left}`,
                top: `${top}`
            }}
            className={cn(
                s['smart-home-dot-item'],
                sc['tooltip-item-container'],
                'flex absolute opacity-100 z-50',
                className
            )}
        >
            <button
                className={cn(sc['tooltip-button'], 'border1')}
                onClick={() => onClick(content)}
            >
                +
            </button>
        </div>
    )
}
