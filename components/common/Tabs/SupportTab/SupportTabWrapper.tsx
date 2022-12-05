import { FC, useState } from 'react'
import { SupportTabBundle } from './SupportTabBundle'
import { SupportTabSimple } from './SupportTabSimple'
import cn from 'classnames'
import s from './SupportTab.module.scss'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import type {
    IMeta,
    IProductContentfulResponse
} from '@components/common/types'
import { TypeComponentsTab } from '../ProductTabContent'

export interface ITabContent {
    content: ISupportTab
    linkedProducts?: IProductContentfulResponse<TypeComponentsTab>[]
}

export enum MetaContentTypeEnum {
    cmsBlock = 'cmsBlock',
    logoimage = 'logoimage',
    video = 'video'
}
export interface IMetaSupportTab {
    contentType: MetaContentTypeEnum
}
export interface IImageContent {
    title: string
    image: ImageType
    meta: IMetaSupportTab
}

export interface ITextContent {
    title: string
    icon?: ImageType
    content: string
    meta: IMetaSupportTab
}

export interface IVideoContent {
    title: string
    meta: IMetaSupportTab
    url: string
}

export type IPageContentEntries = IImageContent | ITextContent | IVideoContent

export interface ISupportTabItems {
    title: string
    heading: string
    items?: IPageContentEntries[]
    type?: string
    meta: IMeta<TypeComponentsTab>
}
export interface ISupportTab {
    title: string
    tabName: string
    url: string
    content: ISupportTabItems[]
    meta: IMeta<TypeComponentsTab>
}

export interface ISKUData {
    skuName: string
    supportTab: ISupportTab | null
}

const getBundleTabs = (
    linkedProducts?: IProductContentfulResponse<TypeComponentsTab>[]
): ISKUData[] | undefined => {
    return linkedProducts?.map((product) => {
        const { tabs: productTabs, name } = product
        const supportTab = productTabs.filter((tab) => tab.type === 'support')
        return {
            skuName: name,
            supportTab:
                supportTab && supportTab.length
                    ? (supportTab[0] as ISupportTab)
                    : null
        }
    })
}

export const SupportTabWrapper: FC<ITabContent> = ({
    content,
    linkedProducts
}): JSX.Element | null => {
    const [expand, setExpand] = useState<boolean | string>(true)

    const handleChange = (panel: string) => (
        event: React.MouseEventHandler<HTMLButtonElement>,
        isExpanded: boolean
    ) => {
        setExpand(isExpanded ? panel : false)
    }

    const bundleData = getBundleTabs(linkedProducts)

    return (
        <div className={cn(s['support-tab-wrapper'], 'support-tab-wrapper')}>
            {bundleData && bundleData.length ? (
                <SupportTabBundle
                    bundleData={bundleData}
                    handleChange={handleChange}
                    expand={expand}
                />
            ) : (
                <SupportTabSimple
                    skuData={content}
                    handleChange={handleChange}
                    expand={expand}
                />
            )}
        </div>
    )
}
