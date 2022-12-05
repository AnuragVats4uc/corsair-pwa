import Image from '@corratech/corsair-image'
import cn from 'classnames'
import s from './DownloadComponents.module.scss'
import React, { VFC } from 'react'
import { getFormattedDate } from '@corratech/pylot-utils'
import { DownloadCardProps } from './algolia-download.interfaces'

export const DownloadCard: VFC<DownloadCardProps> = ({ content }) => {
    const {
        title,
        version,
        plataform,
        image_url,
        url,
        date,
        description
    } = content
    const downloadButtonLabel = 'Download'

    return (
        <div
            className={cn(
                s['download-card'],
                'items-center md-max:flex-col w-full'
            )}
        >
            <div className={cn(s['download-card-image'])}>
                {image_url && (
                    <Image
                        src={image_url}
                        alt={title}
                        layout="fill"
                        objectFit="contain"
                    />
                )}
            </div>
            <section className={cn(s['download-info'], 'md-max:w-full')}>
                <p
                    className={cn(
                        s['download-title'],
                        'text-white pb-3 md-max:pb-5 text-lg font-normal'
                    )}
                >
                    {title}
                </p>
                <p
                    className={cn(
                        s['download-description'],
                        'text-sm text-white font-normal'
                    )}
                >
                    {description || plataform}
                </p>
                <div>
                    <span
                        className={cn(
                            s['download-version'],
                            'text-xs text-white font-normal'
                        )}
                    >
                        {version} {date && '|'} {getFormattedDate(date!)}
                    </span>
                </div>
            </section>
            <section>
                <a
                    className={cn(
                        s['download-button'],
                        'bg-white flex items-center justify-center absolute'
                    )}
                    href={url}
                    download
                >
                    <span
                        className={cn(
                            'text-black md-max:hidden uppercase text-sm font-normal'
                        )}
                    >
                        {downloadButtonLabel}
                    </span>
                    <i className={cn(s['download-icon'])} />
                </a>
            </section>
        </div>
    )
}
