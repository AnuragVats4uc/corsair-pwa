import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import React, { useState } from 'react'
import { IMeta } from '../types'
import FullPanelCard, { FullPanelCardInterface } from './FullPanelCard'
import s from './FullPanelCards.module.scss'

export interface FullPanelCardsType {
    backgroundImage: ImageType
    backgroundPosition: string
    cards?: FullPanelCardInterface[]
    meta: IMeta<'fullPanelCards'>
    mobileBackgroundImage: ImageType
    title?: string
}
export interface FullPanelCardsProps {
    content: FullPanelCardsType
}

interface BackgroundInterface {
    title?: string
    url: string
    visibility: string
    alt: string
}

const c = {
    background: `${s?.background} bg-cover absolute opacity-75 h-full top-0 left-0 w-full h-auto`,
    backgroundDesktop: `${s?.backgroundDesktop}`,
    backgroundMobile: `${s?.backgroundMobile}`,
    fullPanelCards: `${s?.fullPanelCards} relative`,
    list: `${s?.list}`
}

const FullPanelCards = ({
    content
}: FullPanelCardsProps): JSX.Element | null => {
    const [activePanel, setActivePanel] = useState<string>('')

    const handleActivePanelClick = (panel: FullPanelCardInterface) => {
        const { title: panelTitle } = panel
        setActivePanel(panelTitle === activePanel ? '' : panelTitle)
    }

    if (!content) return null

    const {
        backgroundImage: desktopBackgroundImage,
        backgroundPosition,
        cards,
        mobileBackgroundImage
    } = content

    /**
     * Background Image Component
     * @param param0 BackgroundInterface
     * @returns Background Image JSX || null
     */
    const BackgroundImage = ({
        url,
        visibility
    }: BackgroundInterface): JSX.Element | null => {
        return (
            <li
                className={`${c?.background} ${visibility}`}
                style={{
                    backgroundImage: `url(${url})`,
                    backgroundPosition: `${backgroundPosition[0]?.toLowerCase()}`,
                    opacity: activePanel !== '' ? 0 : 1,
                    visibility: activePanel !== '' ? 'hidden' : 'visible'
                }}
            />
        )
    }

    /**
     * Panel Background Image
     * @param param0 BackgroundInterface
     * @returns Panel Background Image JSX || null
     */
    const PanelBackgroundImage = ({
        title,
        url,
        visibility
    }: BackgroundInterface): JSX.Element | null => {
        return (
            <li
                className={`${c?.background} ${visibility}`}
                style={{
                    backgroundImage: url ? `url(${url})` : 'none',
                    opacity: title === activePanel ? 1 : 0,
                    visibility: title === activePanel ? 'visible' : 'hidden'
                }}
            />
        )
    }

    const backgroundDesktop = 'backgroundDesktop'
    const backgroundMobile = 'backgroundMobile'

    return (
        <section className={`${c?.fullPanelCards}`}>
            <ul>
                <BackgroundImage
                    url={desktopBackgroundImage?.file?.url}
                    visibility={`${backgroundDesktop}`}
                    alt={desktopBackgroundImage?.description || ''}
                />
                <BackgroundImage
                    url={mobileBackgroundImage?.file?.url}
                    visibility={`${backgroundMobile}`}
                    alt={mobileBackgroundImage?.description || ''}
                />
                {cards &&
                    cards?.map((element: FullPanelCardInterface) => (
                        <>
                            <PanelBackgroundImage
                                key={`${element?.title}-backgroundDesktop`}
                                title={element?.title}
                                url={element?.backgroundImage?.file?.url}
                                visibility={`${backgroundDesktop}`}
                                alt={
                                    element?.backgroundImage?.description || ''
                                }
                            />

                            <PanelBackgroundImage
                                key={`${element.title}-backgroundMobile`}
                                title={element.title}
                                url={
                                    element.mobileBackgroundImage
                                        ? element.mobileBackgroundImage.file.url
                                        : element.backgroundImage.file.url
                                }
                                visibility={`${backgroundMobile}`}
                                alt={
                                    element.mobileBackgroundImage
                                        ?.description || ''
                                }
                            />
                        </>
                    ))}
            </ul>
            <ul className={c.list}>
                {cards &&
                    cards.map((element: FullPanelCardInterface) => (
                        <FullPanelCard
                            key={element.title}
                            activePanel={activePanel}
                            content={element}
                            handleActivePanelClick={handleActivePanelClick}
                        />
                    ))}
            </ul>
        </section>
    )
}

export default FullPanelCards
