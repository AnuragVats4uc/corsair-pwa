import React from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import s from './FullPanelCard.module.scss'
import cn from 'classnames'

export interface FullPanelCardInterface {
    copy: string
    backgroundImage: ImageType
    footNote: string
    heading?: string
    meta: {
        contentType: string
    }
    mobileBackgroundImage: ImageType
    subHeading: string
    title: string
    visibility: string
}

interface FullPanelCardProps {
    content: FullPanelCardInterface
    activePanel: string
    handleActivePanelClick: (panel: FullPanelCardInterface) => void
}

const c = {
    close: `${s.close} focus:outline-none relative rounded-full border-2 border-solid border-white`,
    closeDesktop: `${s.closeDesktop} focus:outline-none hidden relative rounded-full border-2 border-solid border-white`,
    copy: `${s.copy} font-aktivGrotesk lg:text-left`,
    content: `${s.content} focus:outline-none text-left`,
    flex: `${s.flex} flex justify-between items-end w-full focus:outline-none`,
    footNote: `${s.footNote} font-aktivGrotesk absolute`,
    footNoteMobile: `${s.footNoteMobile}`,
    fullPanelCard: `${s.fullPanelCard} text-white lg:text-center`,
    header: `${s.header}`,
    heading: `${s.heading} font-normal uppercase text-center lg:text-left`,
    icon: `${s.icon} relative rounded-full border-2 border-solid border-white`,
    panel: `${s.panel}`,
    subTitle: `${s.subTitle} font-thin text-left text-white`,
    wrapper: `${s.wrapper}`
}

const FullPanelCard = ({
    content,
    activePanel,
    handleActivePanelClick
}: FullPanelCardProps): JSX.Element | null => {
    const { copy, subHeading, heading, title, footNote } = content

    const isExposed = activePanel === title
    const isDefaultState = Object.keys(activePanel).length === 0

    if (!content) return null

    return (
        <li
            className={cn(c.fullPanelCard, {
                [s.isExposed]: isExposed,
                [s.isPanelClosed]: isDefaultState,
                [s.isCollapsed]: !isExposed && !isDefaultState
            })}
        >
            <div className={`${c.wrapper}`}>
                {isExposed && (
                    <button
                        type="button"
                        onClick={() => handleActivePanelClick(content)}
                        className={`${c.close}`}
                    />
                )}
                <button
                    type="button"
                    onClick={() => handleActivePanelClick(content)}
                    className={`${c.content}`}
                >
                    {title && (
                        <div className={`${c.flex}`}>
                            <div className={`${c.header}`}>
                                {heading && (
                                    <h4
                                        className={`${
                                            !isDefaultState && !isExposed
                                                ? 'font-bebasNeue'
                                                : 'font-aktivGrotesk'
                                        } ${c.heading}`}
                                    >
                                        {heading}
                                    </h4>
                                )}
                                {subHeading && (
                                    <h5
                                        className={`${
                                            isExposed
                                                ? 'font-bebasNeue'
                                                : 'font-aktivGrotesk'
                                        } ${c.subTitle}`}
                                    >
                                        {subHeading}
                                    </h5>
                                )}
                            </div>
                            {!isExposed && <div className={`${c.icon}`} />}
                        </div>
                    )}

                    <div
                        className={`${c.panel}`}
                        style={{
                            height: isExposed ? 'auto' : 0,
                            opacity: isExposed ? '1' : '0',
                            visibility: isExposed ? 'visible' : 'hidden'
                        }}
                    >
                        {copy && (
                            <p
                                className={`${c.copy}`}
                                dangerouslySetInnerHTML={{ __html: copy }}
                            />
                        )}
                        {footNote && (
                            <p
                                className={`${c.footNote}`}
                                dangerouslySetInnerHTML={{ __html: footNote }}
                            />
                        )}
                    </div>
                </button>
                {isExposed && (
                    <button
                        type="button"
                        onClick={() => handleActivePanelClick(content)}
                        className={`${c.closeDesktop}`}
                    />
                )}
                {footNote && isExposed && (
                    <p
                        className={`${c.footNote} ${c.footNoteMobile}`}
                        dangerouslySetInnerHTML={{ __html: footNote }}
                    />
                )}
            </div>
        </li>
    )
}

export default FullPanelCard
