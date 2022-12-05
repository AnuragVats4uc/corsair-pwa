import { FC } from 'react'
import s from './VerticalTabsSection.module.scss'
import cn from 'classnames'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import type { TopTextLayoutType } from '@components/common/TopTextLayout'
import TopTextLayout from '@components/common/TopTextLayout'
import type { Dispatch, SetStateAction } from 'react'
import GeneralTabs from './Tabs/GeneralTabs'

export const TopAlign = 'Top'

export interface IconWithImages {
    iconLabel?: string
    iconImage?: ImageType
    imagevideo: ImageType | VideoType
}

export interface Itabs {
    imagevideo: ImageType
    tabTitle: string
    tabDescription?: string
    iconAndImage: IconWithImages[]
    setSelectedTab: Dispatch<SetStateAction<number>>
}

export interface VerticalTabsSectionResponse {
    tabs: Itabs[]
    textAlignment?: string
    textContain?: TopTextLayoutType
    backgroundImage?: ImageType
    backgroundColor?: string
    useImageAsBackground: boolean
    fontColor?: string | undefined
}

interface VerticalTabsSectionProps {
    content: VerticalTabsSectionResponse
}

export const isMobile = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches

const c = /*tw*/ {
    VerticalTabsWrapper: `${s['verticalTabsWrapper']}`,
    VerticalTabsBackground: `${s['VerticalTabsBackground']},'relative'`,
    contentWrapper: `${s['contentWrapper']} relative flex md:mr-auto md:ml-auto`
}

const VerticalTabsSection: FC<VerticalTabsSectionProps> = ({ content }) => {
    if (!content) {
        return null
    }

    const bgImage = content?.backgroundImage
    const styles = {
        background: `url("${bgImage?.file.url}") 100% 100% repeat fixed`,
        backgroundSize: 'cover'
    }

    const getTopLayout = () => {
        if (TopAlign === content?.textAlignment && content?.textContain) {
            return (
                <TopTextLayout
                    data={content.textContain}
                    fontColor={content?.fontColor}
                />
            )
        }

        return null
    }

    return (
        <div
            className={cn(c.VerticalTabsWrapper)}
            style={
                content?.useImageAsBackground
                    ? styles
                    : { background: content?.backgroundColor }
            }
        >
            <div
                className={cn(
                    c.VerticalTabsBackground,
                    !content?.useImageAsBackground
                        ? s['Background-Gradient']
                        : ''
                )}
            >
                <div
                    className={cn(
                        c.contentWrapper,
                        content?.textAlignment &&
                            s['contentWrapper_' + content?.textAlignment]
                    )}
                >
                    {getTopLayout()}
                    {content?.tabs && (
                        <GeneralTabs
                            data={content.tabs}
                            alignment={content.textAlignment}
                            textContain={content.textContain}
                            fontColor={content?.fontColor}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default VerticalTabsSection
