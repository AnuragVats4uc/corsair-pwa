import { FC } from 'react'
import { TooltipItem } from '@components/common/Tooltip/TooltipItem'
import type { ITooltip } from '../Tooltip/Tooltip'

export interface IToolTipIcons {
    isMobile: boolean
    tooltips?: ITooltip[]
    handleClick: (tooltipContent: ITooltip) => void
}

export const ToolTipIcons: FC<IToolTipIcons> = ({
    isMobile,
    tooltips,
    handleClick
}) => {
    return (
        <div>
            {tooltips &&
                tooltips.map((tooltip: ITooltip, index: number) => {
                    const coordinate = isMobile
                        ? tooltip.mobileCoordinate
                        : tooltip.desktopCoordinate
                    return (
                        coordinate && (
                            <TooltipItem
                                onClick={handleClick}
                                content={tooltip}
                                title={tooltip.title}
                                top={coordinate.top}
                                left={coordinate.left}
                                key={index}
                            />
                        )
                    )
                })}
        </div>
    )
}
