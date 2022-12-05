import React, { FC, useEffect, useState } from 'react'
import TabTitle from './TabTitle'
import cn from 'classnames'
import s from './Tabs.module.scss'
import router from 'next/router'
import useHorizontalScroll from './useHorizontalScroll'
import { ProductTabContent } from '@components/common/Tabs/'
import type {
    IProductContentfulResponse,
    ITabItem
} from '@components/common/types'
import type { TypeComponentsTab } from './ProductTabContent'
import { ProductInterface } from '@pylot-data/fwrdschema'
import { WithoutTabTypeTitle } from './TabTitle'

export interface TabsPropType {
    defaultTab?: number
    tabs: ITabItem<TypeComponentsTab>[]
    linkedProducts?: IProductContentfulResponse<TypeComponentsTab>[]
    packageContents?: IProductContentfulResponse<TypeComponentsTab>
    className?: string
    customClassTabTitle?: string
    productData?: ProductInterface
}

const getTabIndexByAnchor = (tabs: ITabItem<TypeComponentsTab>[]) => {
    const hashes = router.asPath.match(/#.*/gi)
    if (hashes?.length) {
        const anchorName = hashes[hashes?.length - 1]
        if (tabs?.length) {
            return tabs.findIndex((tab) => {
                return tab?.url === anchorName
            })
        }
    }
    return -1
}

const Tabs: FC<TabsPropType> = ({
    defaultTab,
    tabs,
    linkedProducts,
    packageContents,
    className,
    customClassTabTitle,
    productData
}) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab || 0)
    const scrollRef = useHorizontalScroll()

    useEffect(() => {
        const indexTab = getTabIndexByAnchor(tabs)
        setSelectedTab(indexTab >= 0 ? indexTab : selectedTab)
    }, [])

    if (!tabs?.length) {
        return null
    }
    const visibleTabs = tabs.filter(
        (tab: ITabItem<TypeComponentsTab>) => tab.visible !== false
    )
    return (
        <div>
            <div className={cn(s['tab-list-wrapper'], className)}>
                <ul ref={scrollRef} className={s['tab-list']}>
                    {visibleTabs.map((tab, index) => {
                        if (!tab.type) {
                            return (
                                <WithoutTabTypeTitle
                                    key={index}
                                    title={tab.tabName}
                                    url={tab.url}
                                    index={index}
                                    setSelectedTab={setSelectedTab}
                                    selectedTab={selectedTab}
                                    className={customClassTabTitle}
                                />
                            )
                        }
                        if (
                            tab?.type === 'accessories-parts' &&
                            (productData?.related_accessories_skus == null ||
                                productData?.related_accessories_skus?.length <=
                                    0)
                        )
                            return

                        return (
                            <TabTitle
                                key={index}
                                title={tab.tabName}
                                tabType={tab.type}
                                url={tab.url || `#${tab.type}`}
                                index={index}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                                className={customClassTabTitle}
                            />
                        )
                    })}
                </ul>
            </div>
            <div>
                <ProductTabContent
                    selectedTab={selectedTab}
                    tabData={tabs}
                    linkedProducts={linkedProducts}
                    packageContents={packageContents}
                    productData={productData}
                />
            </div>
        </div>
    )
}

export default Tabs
