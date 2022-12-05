import React, { FC } from 'react'
import { AccordionWrapper } from './AccordionWrapper'
import type { HandleAccordionChange } from './AccordionWrapper'
import cn from 'classnames'
import s from './SupportTab.module.scss'
import type { ISKUData } from './SupportTabWrapper'

interface ISupportTabBundle {
    bundleData: ISKUData[]
    handleChange: HandleAccordionChange
    expand: string | boolean
}

export const SupportTabBundle: FC<ISupportTabBundle> = ({
    bundleData,
    handleChange,
    expand
}) => {
    return (
        <div>
            {bundleData.length &&
                bundleData.map((tabItem, indexItem: number) => {
                    const { skuName, supportTab } = tabItem

                    if (!supportTab) {
                        return null
                    }

                    const { content } = supportTab

                    return (
                        <>
                            <div
                                className={cn(
                                    s['bundle-sku-name'],
                                    'bundle-sku-name'
                                )}
                            >
                                {skuName}
                            </div>
                            {content &&
                                content.map((item, index: number) => {
                                    const panelId = `panel${indexItem}${index}`

                                    return (
                                        <AccordionWrapper
                                            key={index}
                                            tabItem={item}
                                            panelId={panelId}
                                            expand={expand}
                                            handleChange={handleChange}
                                        />
                                    )
                                })}
                        </>
                    )
                })}
        </div>
    )
}
