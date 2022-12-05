import React, { FC } from 'react'
import { SupportTabWrapper } from '@components/common/Tabs/SupportTab'
import type {
    IProductContentfulResponse,
    ITabItem
} from '@components/common/types'
import { OverviewTab } from './OverviewTab'
import DownloadsTab from './DownloadsTab/DownloadsTab'
import { PackageContentsTab } from './PackageContentsTab'
import { BlogsTab } from './BlogsTab'
import ProductOverviewTab from '../ProductOverviewTab/ProductOverviewTab'
import ProductOverviewSwitcherTab from '../ProductOverviewTab/SwitcherTab/SwitcherTab'
import { AccessoriesParts } from './AccessoriesParts'
import { ProductInterface } from '@pylot-data/fwrdschema'
import { TechSpecs } from './TechSpecsTab'
import { CompatibilityTab } from './CompatibilityTab/index'

export type TypeComponentsTab = keyof typeof componentsTab

interface IProductTabContentProp {
    tabData: ITabItem<TypeComponentsTab>[]
    linkedProducts?: IProductContentfulResponse<TypeComponentsTab>[]
    packageContents?: IProductContentfulResponse<string>
    productData?: ProductInterface
    selectedTab?: number | null
}

interface IDynamicComponentProps {
    content: ITabItem<TypeComponentsTab>
    linkedProducts?: IProductContentfulResponse<TypeComponentsTab>[]
    packageContents?: IProductContentfulResponse<string>
    productData?: ProductInterface
}

const PlaceholderTab: FC<IDynamicComponentProps> = ({
    content
}): JSX.Element => {
    return <div>{content?.tabName}</div>
}

const componentsTab = {
    overview: OverviewTab,
    'tech-specs': TechSpecs,
    compatibility: CompatibilityTab,
    downloads: DownloadsTab,
    accessories: PlaceholderTab,
    'accessories-parts': AccessoriesParts,
    support: SupportTabWrapper,
    'package-contents': PackageContentsTab,
    reviews: PlaceholderTab,
    'blog-articles': BlogsTab,
    overlayProductContent: ProductOverviewTab,
    productTypesSwitcher: ProductOverviewSwitcherTab
}

const ProductTabContent: FC<IProductTabContentProp> = ({
    tabData,
    linkedProducts,
    packageContents,
    productData,
    selectedTab
}): JSX.Element | null => {
    return (
        <>
            {tabData.map((element, index) => {
                const Component = componentsTab?.[
                    element?.type ?? element?.meta?.contentType
                ] as React.FC<IDynamicComponentProps>

                if (!Component) return null

                return (
                    <div
                        style={{
                            display: selectedTab === index ? 'block' : 'none'
                        }}
                        key={index}
                    >
                        <Component
                            content={element}
                            linkedProducts={linkedProducts}
                            packageContents={packageContents}
                            productData={productData}
                        />
                    </div>
                )
            })}
        </>
    )
}

export default ProductTabContent
