import React, { FC } from 'react'
import { AccordionWrapper, HandleAccordionChange } from './AccordionWrapper'
import type { ISupportTab } from './SupportTabWrapper'
interface ISupportTabSimple {
    skuData: ISupportTab
    handleChange: HandleAccordionChange
    expand: string | boolean
}
export const SupportTabSimple: FC<ISupportTabSimple> = ({
    skuData,
    handleChange,
    expand
}) => {
    const { content } = skuData

    return (
        <div>
            {content
                ? content.map((tabItem, index: number) => {
                      const panelId = `panel${index}`

                      return (
                          <AccordionWrapper
                              key={index}
                              tabItem={tabItem}
                              panelId={panelId}
                              expand={expand}
                              handleChange={handleChange}
                          />
                      )
                  })
                : null}
        </div>
    )
}
