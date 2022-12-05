import { VFC } from 'react'
import { IProductCalloutItem } from '@components/common/types'
import { Accordion } from '../../Accordion'
import { IconClose, IconOpen } from '@components/common/ProductCallouts'
import s from '../ProductCallouts.module.scss'
import { HandleAccordionChange } from '@components/common/Tabs/SupportTab/AccordionWrapper'

type ItemsListProp = {
    calloutItems: IProductCalloutItem[]
    handleChange: HandleAccordionChange
    expand: string
}

export const ItemsList: VFC<ItemsListProp> = ({
    calloutItems,
    handleChange,
    expand
}) => {
    return (
        <div
            className={`${s['callout-list']} m-auto my-12 md:m-0 grid grid-cols-1`}
        >
            {calloutItems.map((calloutItem) => {
                const { heading, text, title } = calloutItem
                return (
                    <Accordion
                        key={title}
                        className={s['accordion']}
                        isOpen={expand === title}
                        title={heading}
                        onChange={handleChange(title)}
                        iconOpen={<IconOpen />}
                        iconClose={<IconClose />}
                    >
                        <p>{text}</p>
                    </Accordion>
                )
            })}
        </div>
    )
}
