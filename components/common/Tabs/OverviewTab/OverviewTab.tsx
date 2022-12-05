import {
    ITabItem,
    OverviewItem as OverviewItemType
} from '@components/common/types'
import React, { useMemo, VFC } from 'react'
import { OverviewItem } from './OverviewItem'

export type OverviewTabProps = {
    content: ITabItem<'overviewTab', OverviewItemType>
}

const OverviewTab: VFC<OverviewTabProps> = ({ content: { content } }) => {
    const overviewItemsComponents = useMemo(() => {
        if (!content) {
            return []
        }
        return content.map((overviewItem, index) => {
            return <OverviewItem overviewItem={overviewItem} key={index} />
        })
    }, [content])

    return <div>{overviewItemsComponents}</div>
}

export default OverviewTab
