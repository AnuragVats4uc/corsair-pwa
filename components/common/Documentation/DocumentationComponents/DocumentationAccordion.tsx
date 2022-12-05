/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { DownloadFields } from '@components/common/DownloadComponents/algolia-download.interfaces'
import { DownloadDocumentationIcon } from '@components/icons/DownloadDocumentation'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import s from '../../DownloadComponents/DownloadComponents.module.scss'

export const DocumentationItemLinks = function ({
    hits
}: {
    hits: DownloadFields[]
}) {
    const { t } = useTranslation('common')

    if (!hits?.length) {
        return (
            <span className="text-white flex items-start justify-start text-left w-full md:pl-6 md-max:px-8 mb-4 text-xs">
                {t('No Documents found')}
            </span>
        )
    }

    const items = hits.map((item) => (
        <div
            key={item.title}
            className="flex items-start justify-start text-left w-full md:pl-6 md-max:px-4 mb-4"
        >
            <span className="mr-2 h-3 w-3 block">
                <DownloadDocumentationIcon />
            </span>
            <span className="md:text-sm text-white">
                <a
                    target="_blank"
                    className="text-white"
                    href={item.url}
                    rel="noreferrer"
                >
                    {item.title}
                </a>
            </span>
        </div>
    ))

    return (
        <div
            className={cn(
                s['documentation-item-link'],
                'flex flex-col items-center justify-center'
            )}
        >
            {items}
        </div>
    )
}

export const DocumentationAccordion = ({
    hits,
    isLoading,
    isOpen
}: {
    hits: DownloadFields[]
    isOpen: boolean
    isLoading: boolean
}) => {
    if (!isOpen) {
        return <div />
    }

    const loadingTerm = ''

    return (
        <div
            className={cn(
                s['documentation-accordion'],
                'text-left bg-white w-full pb-2 pt-4 md:pl-48'
            )}
        >
            {!isLoading ? (
                <DocumentationItemLinks hits={hits} />
            ) : (
                <span className="text-transparent flex items-start justify-start text-left w-full md-max:px-8 mb-4 text-xs text-white">
                    {loadingTerm}
                </span>
            )}
        </div>
    )
}
