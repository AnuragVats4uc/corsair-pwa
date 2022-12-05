import React from 'react'
import type { VFC } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

import cn from 'classnames'
import s from './DownloadComponents.module.scss'
import DownloadSearchWrapper from './DownloadSearchWrapper'
import {
    DocumentationCategory,
    DownloadCategory,
    DriverCategory
} from '../Downloads/Downloads'
import { useTranslation } from 'next-i18next'

interface DownloadHeaderProps {
    backgroundImage: ImageType
    title: string
    categories: DownloadCategory[]
    setSortedByCategory: (param: boolean) => void
    drivers: DriverCategory[]
    documentations: DocumentationCategory[]
}

const generateSlugFilters = (array: Array<{ slug: string }>) => {
    const filters = array.map((item) => `slug:'${item.slug}'`).join(' OR ')
    return filters.length ? `${filters}` : ''
}

export const DownloadHeader: VFC<DownloadHeaderProps> = ({
    backgroundImage,
    categories,
    setSortedByCategory,
    drivers,
    documentations
}) => {
    const { t } = useTranslation()

    const slugs = generateSlugFilters([...drivers, ...documentations])

    return (
        <div
            className={cn(s['download-header'])}
            style={{
                background: `url(${backgroundImage.file.url})`
            }}
        >
            <div
                className={cn(
                    s['download-hero-header'],
                    'flex items-center justify-center w-full relative flex-col'
                )}
            >
                <div
                    className={cn(
                        s['download-hero-wrapper'],
                        'text-center block h-full relative z-1 p-0 text-white'
                    )}
                >
                    <h1
                        className="text-center color text-white py-20 uppercase md:text-7xl tracking-wider"
                        // eslint-disable-next-line i18next/no-literal-string
                    >
                        {t('downloads|DOWNLOADS')}
                    </h1>
                </div>
                <div className={cn(s['download-search-wrapper'])}>
                    <DownloadSearchWrapper
                        setSortedByCategory={setSortedByCategory}
                        categories={categories}
                        slugs={slugs}
                    />
                </div>
            </div>
        </div>
    )
}
