import React, { VFC } from 'react'
import { IStandardCard } from '../types'
import Image from '@corratech/corsair-image'

import s from './StandardCard.module.scss'
import { getThemeFromContent } from '@lib/getThemeFromContent'
import cn from 'classnames'
import { RichContent } from '@corratech/pylot-rich-content'

export type StandardCardProps = {
    card: IStandardCard
}

const c = /*tw*/ {
    standardCard: `${s['standard-card']} mx-auto`,
    standardCardImage: `${s['standard-card-image']} relative`,
    standardCardText: `${s['standard-card-text']}`,
    standardCardHeading: `${s['standard-card-heading']} uppercase font-bebasNeue`
}

const StandardCard: VFC<StandardCardProps> = ({ card }) => {
    const theme = card?.theme && getThemeFromContent(card.theme)
    const themeFromCard = card?.theme && card?.theme?.theme
    return (
        <div
            className={`standard-card-item ${cn([
                c.standardCard,
                s[`standard-card-${themeFromCard}`]
            ])}`}
            style={{
                ...theme
            }}
        >
            <div className="flex items-end w-full justify-between">
                <p
                    className={cn([
                        c.standardCardHeading,
                        s[`standard-card-heading-${themeFromCard}`]
                    ])}
                >
                    {card.heading}
                </p>
                {card?.image && (
                    <div className={c.standardCardImage}>
                        <Image
                            src={card.image.image.file.url}
                            width={
                                card?.image?.width
                                    ? card.image.width
                                    : card?.image?.image.file?.details?.image
                                          ?.width
                            }
                            height={
                                card?.image?.height
                                    ? card.image.height
                                    : card?.image?.image.file?.details?.image
                                          ?.height
                            }
                        />
                    </div>
                )}
            </div>
            <div className={c.standardCardText}>
                <RichContent html={card.text} />
            </div>
        </div>
    )
}

export default StandardCard
