import Image from '@corratech/corsair-image'
import React, { useMemo, VFC } from 'react'
import { CTA } from '@components/common/CTA'
import type { IInteractiveCard } from '../types'
import s from './InteractiveCard.module.scss'
import cn from 'classnames'
import ChevronRight from '@components/icons/ChevronRight'

export type InteractiveCardProps = {
    card: IInteractiveCard
    onClick?: (card: IInteractiveCard) => void
}

const c = /*tw*/ {
    interactiveCard: `${s['interactive-card']} overflow-hidden relative`,
    interactiveCardOverlay: `${s['interactive-card-overlay']} absolute flex flex-col items-start justify-end lg:flex-row lg:justify-between lg:items-end px-5 py-5 h-full w-full`,
    interactiveCardOverlayCTA: `${s['interactive-card-overlay-cta']} font-aktivGrotesk uppercase leading-4`,
    interactiveCardSubheading:
        'font-bebasNeue text-xl text-white uppercase pb-3 lg:pb-0'
}

const CHEVRON_COLOR = '#ECE81A'
const CARD_MOBILE_SIZE = '50vw'

const InteractiveCard: VFC<InteractiveCardProps> = ({
    card,
    onClick = () => {
        // this is intentional
    }
}) => {
    const ctaContent = useMemo(() => {
        if (card.displayAsCta === 'cta') {
            return (
                <CTA
                    cta={card.cta}
                    className={c.interactiveCardOverlayCTA}
                    rightIcon={
                        <ChevronRight
                            width="6"
                            height="11"
                            color={CHEVRON_COLOR}
                        />
                    }
                    rightIconClassName={s['interactive-card-arrow']}
                />
            )
        }

        return (
            <div className="flex pointer-events-auto">
                {card.socialIcons.map((socialIcon) => (
                    <CTA
                        cta={{
                            displayText: '',
                            openInANewTab: socialIcon.newTab,
                            meta: { contentType: 'componentCta' },
                            url: socialIcon.url
                        }}
                        showDisplayText={false}
                        className="relative w-8 h-8 bg-white rounded-full flex justify-center items-center ml-1"
                        key={socialIcon.title}
                    >
                        <Image
                            layout="fill"
                            sizes={CARD_MOBILE_SIZE}
                            src={socialIcon.image.file.url}
                            alt={socialIcon.image?.description || ''}
                        />
                    </CTA>
                ))}
            </div>
        )
    }, [card])

    const handleClick = () => {
        onClick(card)
    }
    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Space') {
            onClick(card)
        }
    }

    return (
        <div
            className={c.interactiveCard}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKey}
        >
            <Image
                src={card.thumbnailImage?.file.url}
                alt={card.thumbnailImage?.description || ''}
                layout="fill"
            />
            <div className={c.interactiveCardOverlay}>
                <p
                    className={cn(c.interactiveCardSubheading, {
                        [s['interactive-card-subheading-top']]:
                            card.subheadingPlacement === 'top'
                    })}
                >
                    {card.subheading}
                </p>
                {ctaContent}
            </div>
        </div>
    )
}

export default InteractiveCard
