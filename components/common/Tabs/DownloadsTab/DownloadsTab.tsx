import { VFC } from 'react'
import { DownloadIconType, DownloadItem } from './DownloadItem'
import {
    Documentation,
    DownloadContent,
    Driver
} from './DownloadsTab.interfaces'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'
import s from './DownloadsTab.module.scss'

interface DownloadWrapperContainerProps {
    title: string
    downloads: JSX.Element[]
    id: string
    className: string
}

const DownloadWrapperContainer: VFC<DownloadWrapperContainerProps> = ({
    title,
    downloads,
    id,
    className
}) => {
    if (!downloads.length) return <span />

    return (
        <div id={id} className={cn('w-full', className)}>
            <h3 className="font-aktivGroteskBold uppercase text-lg">{title}</h3>
            {downloads}
        </div>
    )
}

const filterDownloadContent = (download: Driver | Documentation) =>
    download.assetStatus

const DownloadsTab: VFC<DownloadContent> = ({ content: { content } }) => {
    const { t } = useTranslation(['pdp'])
    const download = content?.[0] || { drivers: [], documentations: [] }
    const drivers = download.drivers
        .filter(filterDownloadContent)
        .map((item) => (
            <DownloadItem
                key={item.driverId}
                label={item.driverTitle}
                url={item.link}
                icon={DownloadIconType.DRIVER}
            />
        ))

    const documentations = download.documentations
        .filter(filterDownloadContent)
        .map((item) => (
            <DownloadItem
                key={item.documentTitle}
                label={item.documentTitle}
                url={item.link}
                icon={DownloadIconType.DOCUMENTATION}
            />
        ))

    return (
        <div
            className={cn(
                s['download-tab-content'],
                'md:px-10 px-6 flex items-start justify-start md:gap-0 md:flex-row flex-col'
            )}
        >
            <DownloadWrapperContainer
                downloads={drivers}
                title={t('Drivers')}
                id="drivers"
                className=""
            />
            <DownloadWrapperContainer
                downloads={documentations}
                title={t('Documentation')}
                id="documentation"
                className=""
            />
        </div>
    )
}

export default DownloadsTab
