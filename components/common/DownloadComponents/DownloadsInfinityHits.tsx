import { useTranslation } from 'next-i18next'
import React, { VFC } from 'react'
import s from './DownloadComponents.module.scss'
import { connectInfiniteHits, connectStats } from 'react-instantsearch-dom'
import { DownloadFields } from './algolia-download.interfaces'
import cn from 'classnames'
import { DownloadCard } from './DownloadCard'
import { DocumentationCategory, DriverCategory } from '../Downloads/Downloads'
interface DownloadInfinityHitsProps {
    hits: DownloadFields[]
    hasMore: boolean
    refineNext: () => void
    drivers: DriverCategory[]
    documentations: DocumentationCategory[]
    isSortedByCategory: boolean
}

interface ResultsLabelProps {
    nbHits: number
}

const ResultsSizeLabel: VFC<ResultsLabelProps> = ({ nbHits }) => {
    const { t } = useTranslation(['common'])
    return (
        <p
            className={cn(
                s['results-info'],
                'text-white pt-6 md-max:pb-5 text-lg font-normal'
            )}
        >
            {t('Your search returned')} {`${nbHits}`} {t('result(s)')}
        </p>
    )
}

const findDownloadBlock = (array: Array<{ slug: string }>, slug: string) =>
    array.find((item) => item.slug === slug)

const DownloadInfinityHits: VFC<DownloadInfinityHitsProps> = ({
    hasMore,
    hits,
    documentations,
    drivers,
    refineNext,
    isSortedByCategory
}) => {
    const { t } = useTranslation(['common'])

    const ResultsLabel = connectStats(ResultsSizeLabel)

    const filteredHits = hits
        .filter((hit) => {
            let show = false

            if (hit.type === 'downloadDocumentation') {
                const downloadBlockItem = findDownloadBlock(
                    documentations,
                    hit.slug
                )

                if (downloadBlockItem) {
                    show = true
                }
            } else {
                const downloadBlockItem = findDownloadBlock(drivers, hit.slug)

                if (downloadBlockItem) {
                    show = true
                }
            }

            return show
        })
        .sort((a, b) => {
            if (isSortedByCategory) {
                return b.category_sort - a.category_sort
            }

            return b.main_sort - a.main_sort
        })

    return (
        <div>
            {filteredHits.map((hit) => (
                <div className="pb-4" key={hit?.id}>
                    <DownloadCard content={hit} key={hit?.id} />
                </div>
            ))}
            <ResultsLabel />
            {hasMore && (
                <button
                    className={`${s['load-more-button']}`}
                    onClick={() => refineNext()}
                >
                    {t('LOAD MORE')}
                </button>
            )}
        </div>
    )
}

export default connectInfiniteHits(DownloadInfinityHits)
