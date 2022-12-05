import React from 'react'
import type { VFC } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

import cn from 'classnames'
import s from '../../DownloadComponents/DownloadComponents.module.scss'

import { DownloadCategory } from '@components/common/Downloads/Downloads'
import DocumentaionSearchWrapper from './DocumentaionSearchWrapper'

interface DownloadHeaderProps {
    backgroundImage: ImageType
    title: string
    categories: DownloadCategory[]
}

export const DocumentationHeroHeader: VFC<DownloadHeaderProps> = ({
    backgroundImage,
    categories,
    title
}) => {
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
                    <h1 className="text-center color text-white py-20 uppercase md:text-7xl tracking-wider">
                        {title}
                    </h1>
                </div>
                <div className={cn(s['download-search-wrapper'])}>
                    <DocumentaionSearchWrapper categories={categories} />
                </div>
            </div>
        </div>
    )
}
