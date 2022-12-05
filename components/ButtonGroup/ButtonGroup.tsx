import { Button } from '@corratech/pylot-ui'
import React, { Children, FC, useState } from 'react'
import cn from 'classnames'
import s from './ButtonGroup.module.scss'

type ButtonGroupProps = {
    buttonHeadings: string[]
    preselectIndex: number
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
    children,
    buttonHeadings,
    preselectIndex = 0
}) => {
    const [selectedIdx, setSelectedIdx] = useState(preselectIndex)
    const childrenCount = Children.count(children)

    if (childrenCount <= 1)
        throw new Error(
            'There should be more than 1 child component to use `ButtonGroup`'
        )

    if (childrenCount !== buttonHeadings.length)
        throw new Error(
            'There should be the same number of button headings as children'
        )

    return (
        <div>
            <div className={s['button-group']}>
                {buttonHeadings.map((heading, idx) => (
                    <Button
                        key={heading}
                        onClick={() => setSelectedIdx(idx)}
                        className={cn(
                            idx === selectedIdx
                                ? s['enable-button']
                                : s['fade-button']
                        )}
                    >
                        {heading}
                    </Button>
                ))}
            </div>
            <div className={s['group-options']}>
                {(children as React.ReactNode[])[selectedIdx]}
            </div>
        </div>
    )
}
