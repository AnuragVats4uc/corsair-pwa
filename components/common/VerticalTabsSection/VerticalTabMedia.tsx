import s from './VerticalTabsSection.module.scss'
import cn from 'classnames'
import { IconWithImages } from './VerticalTabsSection'
import { VerticalTabsImageOrVideo } from './VerticalTabsImageOrVideo'

type VerticalTabMediaProps = {
    iconMedia: IconWithImages[]
    iconSelectedTab: number
}

export const VerticalTabMedia: React.FC<VerticalTabMediaProps> = ({
    iconMedia,
    iconSelectedTab
}) => {
    const getMedia = () => {
        if (!iconMedia) {
            return null
        }

        if (iconMedia.length === 1) {
            return (
                iconMedia[0]?.imagevideo && (
                    <VerticalTabsImageOrVideo data={iconMedia[0]?.imagevideo} />
                )
            )
        }
        return (
            iconMedia[iconSelectedTab]?.imagevideo && (
                <VerticalTabsImageOrVideo
                    data={iconMedia[iconSelectedTab]?.imagevideo}
                />
            )
        )
    }

    return (
        <div className={cn(`${s['Tab-Body']} Vertical-Tab-Boby flex`)}>
            {getMedia()}
        </div>
    )
}
