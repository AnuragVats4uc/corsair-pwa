import s from '@pagestyles/Downloads.module.scss'
import algoliasearch from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-dom'
import { DownloadHeader } from '@components/common/DownloadComponents/DownloadHeader'
import DownloadsInfinityHits from '@components/common/DownloadComponents/DownloadsInfinityHits'
import DownloadSideBanner from '@components/common/SideBanner/SideBanner'
import { useStoreConfig } from '@config/index'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { IMeta } from '../types'
import { useState } from 'react'

const DOWNLOADS_ALGOLIA_INDEX_NAME = 'downloads'
export interface DownloadPageContent {
    content: {
        banners: BannerContent[]
        title: string
        backgroundImage: ImageType
        categories: DownloadCategory[]
        drivers: DriverCategory[]
        documentations: DocumentationCategory[]
    }
}

export interface DownloadCategory {
    title: string
    url: string
}

export interface DocumentationCategory {
    documentId: string
    documentTitle: string
    link: string
    slug: string
    meta: IMeta<'downloadDocumentation'>
    plataform: string
    size: string
    title: string
    version: string
}

export interface DriverCategory {
    date: string
    description: string
    driverId: string
    driverImage: ImageType
    driverMainSort: number
    driverTitle: string
    link: string
    slug: string
    meta: IMeta<'driver'>
    title: string
    version: string
}

export interface BannerContent {
    heading?: string
    logo?: ImageType
    desktopImageOrVideo?: ImageType
    shortDescription?: string
    ctaButton: { url?: string; displayText?: string }
}

export default function Downloads({
    content
}: DownloadPageContent): JSX.Element {
    const [isSortedByCategory, setSortedByCategory] = useState<boolean>(false)

    const {
        base: {
            algolia: { apiKey, appId }
        }
    } = useStoreConfig()

    const {
        backgroundImage,
        banners,
        categories,
        title,
        drivers,
        documentations
    } = content

    const searchClient = algoliasearch(appId, apiKey)

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={DOWNLOADS_ALGOLIA_INDEX_NAME}
        >
            <div className="h-full" id="download-page">
                <DownloadHeader
                    title={title}
                    backgroundImage={backgroundImage}
                    categories={categories}
                    setSortedByCategory={setSortedByCategory}
                    drivers={drivers}
                    documentations={documentations}
                />
                <div
                    className={`${s['downloads-container']} flex justify-center mx-auto pt-28`}
                >
                    <div className="w-full xl:w-3/4 xl:pr-7 text-center">
                        <DownloadsInfinityHits
                            documentations={documentations}
                            drivers={drivers}
                            isSortedByCategory={isSortedByCategory}
                        />
                    </div>
                    <div className="hidden xl:w-1/4 xl:block">
                        {(banners ?? []).map((banner, index) => (
                            <DownloadSideBanner key={index} content={banner} />
                        ))}
                    </div>
                </div>
            </div>
        </InstantSearch>
    )
}
