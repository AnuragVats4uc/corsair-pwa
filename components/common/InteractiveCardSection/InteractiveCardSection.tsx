import React, { VFC, useState } from 'react'
import type { IInteractiveCardsSection } from '@components/common/types'

import s from './InteractiveCardSection.module.scss'
import InteractiveCard from './InteractiveCard'
import SliderGallery from './SliderGallery'
import cn from 'classnames'

export type InteractiveCardSectionProps = {
    content: IInteractiveCardsSection
}

const c = /*tw*/ {
    interactiveCardSection: 'text-center flex flex-col items-center relative',
    interactiveCardSectionHeading: `${s['interactive-card-section-heading']} uppercase tracking-widest mb-2`,
    interactiveCardSectionBody: `${s['interactive-card-section-body']} tracking-wider leading-7`,
    interactiveCardSectionGrid:
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'
}

const InteractiveCardSection: VFC<InteractiveCardSectionProps> = ({
    content
}) => {
    const [galleryIndex, setGalleryIndex] = useState<number>(0)
    const [showGallery, setShowGallery] = useState(false)
    const toggleGallery = (position?: number) => () => {
        if (position !== undefined) {
            setGalleryIndex(position)
        }
        setShowGallery((prev) => !prev)
    }

    return (
        <div className="relative" style={{ zIndex: showGallery ? 999999 : 0 }}>
            <div className={c.interactiveCardSection}>
                <SliderGallery
                    items={content.interactiveCardItems}
                    show={showGallery}
                    onClose={toggleGallery()}
                    slideIndex={galleryIndex}
                />
                <p className={c.interactiveCardSectionHeading}>
                    {content.heading}
                </p>
                <p className={c.interactiveCardSectionBody}>{content.text}</p>
                <div
                    className={cn(c.interactiveCardSectionGrid, {
                        'opacity-25': showGallery
                    })}
                >
                    {content.interactiveCardItems.map((card, index) => (
                        <InteractiveCard
                            card={card}
                            key={card.title + index}
                            onClick={toggleGallery(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InteractiveCardSection
