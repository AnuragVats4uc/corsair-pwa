import { Icallouts } from './BannerIntereactiveCallout'
import s from './BannerIntereactiveCallout.module.scss'
import cn from 'classnames'
import type { Dispatch, SetStateAction } from 'react'

export type BannerIntereactiveCalloutProps = {
    data: Icallouts
    index: number
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
}

const c = /*tw*/ {
    callOutTextBlock: `${s['callOutTextBlock']} text-white flex text-2xl`,
    calOutPoint: `${s['callOutPoint']} hover:text-yellow-300 text-2xl`,
    calOutText: `${s['calOutText']} pl-5 text-2xl`
}

export const BannerIntereactiveCalloutPoints = ({
    data,
    index,
    selectedIndex,
    setSelectedIndex
}: BannerIntereactiveCalloutProps): JSX.Element => {
    return (
        <div
            className={cn(c.callOutTextBlock, {
                [s['active']]: selectedIndex === index
            })}
            onMouseOver={() => setSelectedIndex(index)}
            onFocus={() => setSelectedIndex(index)}
        >
            <div className={c.calOutPoint}>{index}</div>
            <div className={c.calOutText}>{data?.point}</div>
        </div>
    )
}
