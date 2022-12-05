import { FC } from 'react'
import cn from 'classnames'
import { IMeta, ITabItem } from '@components/common/types'
import { TypeComponentsTab } from '../../Tabs/ProductTabContent'
import { Tabs } from '../../Tabs'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import s from './OverlayProductContentCards.module.scss'
import tabStyle from '@components/common/Tabs/Tabs.module.scss'

export interface OverlayProductContentCardsResponse {
    title: string
    identifier: string
    heading: string
    text: string
    tabs: ITabItem<TypeComponentsTab>[]
    backgroundImage: ImageType
    meta: IMeta<'overlayProductContentCards'>
}

export interface OverlayProductContentCardsProps {
    content: OverlayProductContentCardsResponse
}

export const OverlayProductContentCards: FC<OverlayProductContentCardsProps | null> = ({
    content
}) => {
    if (!content) {
        return null
    }

    const styles = {
        background: `url("${content?.backgroundImage?.file.url}") 100% 100% repeat fixed`,
        backgroundSize: '42px 68px'
    }

    const { heading, text, tabs } = content
    return (
        <div
            className={`${cn(s['container'])} text-white relative`}
            style={content?.backgroundImage && styles}
        >
            <div className={s['background-gradient']}>
                <section className={s['content-wrapper']}>
                    <header className={s['overlay-content-cards-header']}>
                        <section className={s['header-wrapper']}>
                            <h2 className="text-center md:text-left">
                                {heading}
                            </h2>
                            <p
                                dangerouslySetInnerHTML={{ __html: text }}
                                className="text-center md:text-left"
                            />
                        </section>
                    </header>
                    <Tabs
                        className={cn(
                            tabStyle['tab-list-wrapper'],
                            s['tab-list-wrapper-overlay']
                        )}
                        defaultTab={0}
                        tabs={tabs}
                    />
                </section>
            </div>
        </div>
    )
}

export default OverlayProductContentCards
