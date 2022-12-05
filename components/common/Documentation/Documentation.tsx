import React from 'preact/compat'
import algoliasearch from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-dom'
import { useStoreConfig } from '@config/index'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import DocumentationInfinityHits from './DocumentationComponents/DocumentationInfinityHits'
import { DocumentationHeroHeader } from './DocumentationComponents/DocumentaionHeader'
import s from '../DownloadComponents/DownloadComponents.module.scss'
import { useBaseUrl } from '@config/hooks/useBaseUrl'
import { useMemo } from 'react'
import { BannerContent, DownloadCategory } from '../Downloads/Downloads'
import DownloadSideBanner from '@components/common/SideBanner/SideBanner'
export interface DownloadPageContent {
    content: {
        title: string
        backgroundImage: ImageType
        categories: DownloadCategory[]
        banners: BannerContent[]
    }
}

export default function Documentaion({
    content
}: DownloadPageContent): JSX.Element {
    const { language } = useBaseUrl(
        typeof window !== 'undefined' ? window.location.href : ''
    )

    const productIndex = useMemo(() => {
        const PRODUCT_INDEX_NAME = `products_${language}`

        return PRODUCT_INDEX_NAME
    }, [language])

    const {
        base: {
            algolia: { apiKey, appId }
        }
    } = useStoreConfig()

    const { backgroundImage, categories, title } = content

    const searchClient = algoliasearch(appId, apiKey)

    return (
        <InstantSearch searchClient={searchClient} indexName={productIndex}>
            <div className="h-full" id="download-page">
                <DocumentationHeroHeader
                    title={title}
                    backgroundImage={backgroundImage}
                    categories={categories}
                />
                <div
                    className={`${s['downloads-container']} flex lg:flex-row flex-col justify-center mx-auto md:pt-28 pt-12 min-h-full max-w-screen-xl md:p-4`}
                >
                    <div className="w-full xl:w-3/4 xl:pr-7 text-center md-max:p-6 md:mr-6">
                        <DocumentationInfinityHits />
                    </div>
                    <div className="xl:w-1/4 xl:block">
                        {(content.banners ?? []).map((banner) => (
                            <DownloadSideBanner
                                key={banner.heading}
                                content={banner}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </InstantSearch>
    )
}
