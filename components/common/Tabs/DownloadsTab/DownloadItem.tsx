import { DocumentIcon } from '@components/icons/Document'
import { DowloadIcon } from '@components/icons/Dowload'
import cn from 'classnames'
import React, { VFC } from 'react'
import s from './DownloadsTab.module.scss'

export enum DownloadIconType {
    DRIVER = 'driver',
    DOCUMENTATION = 'documentation'
}

export interface DownloadItemProps {
    url: string
    label: string
    icon: DownloadIconType
}

export const DownloadItem: VFC<DownloadItemProps> = ({ url, label, icon }) => {
    return (
        <div className={cn(s['download-tab--item'], 'flex items-center')}>
            {icon === DownloadIconType.DOCUMENTATION ? (
                <DocumentIcon />
            ) : (
                <DowloadIcon />
            )}
            <a
                download
                href={url}
                className="font-aktivGrotesk block font-normal ml-3 mt-1"
            >
                {label}
            </a>
        </div>
    )
}
