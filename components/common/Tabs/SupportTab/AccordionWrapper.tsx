import React, { FC } from 'react'
import { Accordion } from '@components/common/Accordion'
import s from './SupportTab.module.scss'
import { SupportContentPage } from './SupportContentPage'
import type { OnAccordionChange } from '@components/common/Accordion/Accordion'
import type { ISupportTabItems } from './SupportTabWrapper'

export type HandleAccordionChange = (panel: string) => OnAccordionChange

interface IAccordionWrapper {
    tabItem: ISupportTabItems
    panelId: string
    expand: string | boolean
    handleChange: HandleAccordionChange
}

export const AccordionWrapper: FC<IAccordionWrapper> = ({
    tabItem,
    panelId,
    expand,
    handleChange
}) => {
    const { items, heading: accordionTitle, type } = tabItem
    if (type !== 'Tab Item entry') return null

    return (
        <Accordion
            key={panelId}
            className={s['accordion-container']}
            isOpen={expand === panelId}
            title={accordionTitle}
            onChange={handleChange(panelId)}
        >
            <SupportContentPage data={items} />
        </Accordion>
    )
}
