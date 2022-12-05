import React, { useState, useEffect, cloneElement } from 'react'
import cn from 'classnames'
import s from './Accordion.module.scss'
import type { Maybe } from '@pylot-data/pylotschema'
import { ChevronDown, ChevronUp } from 'react-feather'

export type OnAccordionChange = (
    event: React.MouseEventHandler<HTMLButtonElement>,
    isExpanded: boolean
) => void
export interface IAccordion {
    children: JSX.Element
    title?: JSX.Element | Maybe<string>
    isOpen?: boolean
    iconOpen?: JSX.Element | null | false
    iconClose?: JSX.Element | null | false
    onChange?: OnAccordionChange
    className?: string
}

const Accordion = (props: IAccordion): JSX.Element => {
    const {
        children,
        isOpen = false,
        title,
        iconOpen = <ChevronUp />,
        iconClose = <ChevronDown />,
        className = '',
        onChange
    } = props

    const [opened, setOpened] = useState(isOpen)

    useEffect(() => {
        if (isOpen !== opened) {
            setOpened(isOpen)
        }
    }, [isOpen, opened])

    const handleChange = React.useCallback(
        (event) => {
            setOpened(!opened)

            if (onChange) {
                onChange(event, !opened)
            }
        },
        [opened, onChange]
    )

    return (
        <div className={cn(s['accordion-container'], className)}>
            <div
                className={cn(
                    s['accordion-wrapper'],
                    'accordion-wrapper',
                    opened && cn(s['active'], 'active')
                )}
            >
                <div
                    className={cn(s['header'], 'accordion-header')}
                    onClick={handleChange}
                    onKeyPress={handleChange}
                    role="button"
                    tabIndex={0}
                >
                    <h2 className={cn(s['title'], 'accordion-header-title')}>
                        {title}
                    </h2>
                    <div className={cn(s['icon'], 'accordion-icon')}>
                        {isOpen ? iconOpen : iconClose}
                    </div>
                </div>
                <div className={cn(s['accordion-body'], 'accordion-body')}>
                    <div
                        className={cn(
                            s['accordion-content'],
                            'accordion-content'
                        )}
                        aria-hidden={opened ? 'false' : 'true'}
                    >
                        {cloneElement(children, { setOpened })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion
