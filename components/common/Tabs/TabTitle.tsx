import React, { FC } from 'react'
import cn from 'classnames'
import { Button } from '@corratech/pylot-ui'
import s from './Tabs.module.scss'
import { useTranslation } from 'next-i18next'
import { ITabItem } from '@components/common/types'

type Props = {
    className?: string
    title: string
    tabType: string
    url: string | ITabItem<unknown>['type']
    index: number
    setSelectedTab: (index: number) => void
    selectedTab: number
}
type WithoutTabTypeProps = {
    className?: string
    title: string
    url: string
    index: number
    setSelectedTab: (index: number) => void
    selectedTab: number
}

const tabTitle = {
    overview: 'Overview',
    'tech-specs': 'Tech Specs',
    compatibility: 'Compatibility',
    downloads: 'Downloads',
    accessories: 'Accessories',
    'accessories-parts': 'Accessories | Parts',
    support: 'Support',
    'package-contents': 'Package Contents',
    reviews: 'Reviews',
    'blog-articles': 'Blog Articles'
}

const isTranslatableTabTitle = (url: string): url is keyof typeof tabTitle => {
    return Object.keys(tabTitle).includes(url)
}

const TabTitle: FC<Props> = ({
    className,
    title,
    tabType,
    url,
    setSelectedTab,
    index,
    selectedTab
}) => {
    const { t } = useTranslation(['pdp'])
    if (!title && isTranslatableTabTitle(tabType)) {
        title = t(`tab|${tabTitle[tabType]}`)
    }

    return (
        <li
            className={cn(
                s['tab-list-item'],
                selectedTab === index && `${s['active']} active`,
                {
                    [s.hidden]: !title
                },
                className
            )}
        >
            <a href={url}>
                <Button
                    variant="link"
                    onClick={() => setSelectedTab(index)}
                    onKeyUp={() => setSelectedTab(index)}
                >
                    {title}
                </Button>
            </a>
        </li>
    )
}
export default TabTitle

export const WithoutTabTypeTitle: FC<WithoutTabTypeProps> = ({
    className,
    title,
    url,
    setSelectedTab,
    index,
    selectedTab
}) => {
    return (
        <li
            className={cn(
                s['tab-list-item'],
                selectedTab === index && `${s['active']} active`,
                {
                    [s.hidden]: !title
                },
                className
            )}
        >
            <a href={url}>
                <Button
                    variant="link"
                    onClick={() => setSelectedTab(index)}
                    onKeyUp={() => setSelectedTab(index)}
                >
                    {title}
                </Button>
            </a>
        </li>
    )
}
