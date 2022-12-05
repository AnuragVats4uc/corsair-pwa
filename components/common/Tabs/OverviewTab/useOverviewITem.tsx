import { useMemo } from 'react'
import { getOverviewItemElement } from './helpers'
import { OverviewItem as OverviewItemType } from '@components/common/types'

export const useOverviewItem = (
    overviewItem: OverviewItemType
): JSX.Element | undefined => {
    return useMemo(() => getOverviewItemElement(overviewItem), [overviewItem])
}
