import React from 'react'
import s from './GridContentCards.module.scss'
import GridContentCard, { GridContentCardType } from './GridContentCard'

interface GridContentCardsProps {
    content?: any
}

const c = /*tw*/ {
    contentCardGrid: `${s.contentCardGrid} mx-auto my-0`
}

const GridContentCards = ({
    content
}: GridContentCardsProps): JSX.Element | null => {
    if (!content) return null

    const { contentCards } = content

    return (
        <ul
            className={`${c.contentCardGrid}`}
            style={{
                gridTemplateColumns: `repeat(${contentCards.length}, minmax(0, 1fr))`
            }}
        >
            {contentCards.map((element: GridContentCardType, key: number) => (
                <GridContentCard key={key} content={element} />
            ))}
        </ul>
    )
}

export default GridContentCards
