import React from 'react'

import s from './Heading.module.scss'

const c = /*tw*/ {
    leftRightTextHeading: `${s['left-right-text-heading']} text-white uppercase mb-10`
}

export interface HeadingProps {
    heading: string
    headingTag: string | undefined
    fontColor?: string | undefined
}

export const Heading = ({
    heading,
    headingTag,
    fontColor = 'white'
}: HeadingProps): JSX.Element | null => {
    if (!heading || !headingTag) return null

    return (
        <div className={c.leftRightTextHeading}>
            {React.createElement(
                headingTag,
                { style: { color: `${fontColor}` } },
                heading
            )}
        </div>
    )
}
