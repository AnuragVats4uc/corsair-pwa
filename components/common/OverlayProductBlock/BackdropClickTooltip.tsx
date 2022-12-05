import React, { CSSProperties, VFC } from 'react'
import BackDropClick from '../BackDropClick'
import { ITooltip, Tooltip } from '../Tooltip/Tooltip'

export interface BackDropClickTooltipProps {
    activeTooltip: ITooltip | undefined
    onClick: () => void
    content: ITooltip | undefined
    style: CSSProperties
    className: string
    imageLeft?: boolean
}

export const BackDropClickTooltip: VFC<BackDropClickTooltipProps> = ({
    activeTooltip,
    content,
    onClick,
    style,
    className,
    imageLeft
}) => {
    if (!activeTooltip) {
        return null
    }

    return (
        <BackDropClick onClick={onClick} touchStart={false}>
            <div className={className}>
                <Tooltip
                    content={content as ITooltip}
                    onClose={onClick}
                    style={style}
                    imageLeft={imageLeft}
                />
            </div>
        </BackDropClick>
    )
}
