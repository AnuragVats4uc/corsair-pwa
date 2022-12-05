import React, { VFC } from 'react'
import { OverviewItem as OverviewItemType } from '@components/common/types'
import { useOverviewItem } from './useOverviewITem'

export const OverviewItem: VFC<{ overviewItem: OverviewItemType }> = ({
    overviewItem
}) => {
    const element = useOverviewItem(overviewItem)

    return <div>{element || null}</div>
}
