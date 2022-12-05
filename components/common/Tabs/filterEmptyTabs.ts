import isEmpty from 'lodash/isEmpty'
import { ITabItem } from '../types'
import { TypeComponentsTab } from './ProductTabContent'

type Filters = {
    contentType: TypeComponentsTab
    filterKey: string
}[]

type TabsType = ITabItem<TypeComponentsTab>[]

const filterEmptyTabs = (tabs: TabsType, filters: Filters): TabsType => {
    return tabs.filter((tab) => {
        const appliedFilter = filters.find(
            (filter) => filter.contentType === tab.meta.contentType
        )

        if (appliedFilter) {
            //@ts-ignore
            return !isEmpty(tab[appliedFilter.filterKey])
        }

        return true
    })
}

export default filterEmptyTabs
