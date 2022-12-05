import React, { VFC } from 'react'
import { DocumentationCard } from '@components/common/Documentation/DocumentationComponents/DocumentationCard'
import { ConfigurableProduct, SimpleProduct } from '@pylot-data/pylotschema'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import { useStoreConfig } from '@config/index'
import cn from 'classnames'
import s from '../../DownloadComponents/DownloadComponents.module.scss'

const DownloadInfinityHits: VFC<{
    hits: Array<ConfigurableProduct | SimpleProduct>
}> = ({ hits }) => {
    const {
        base: {
            algolia: { apiKey, appId }
        }
    } = useStoreConfig()

    return (
        <>
            {hits.map((hit) => (
                <div className={cn(s['download-list'], 'mb-4')} key={hit?.id}>
                    <DocumentationCard
                        apiKey={apiKey}
                        appId={appId}
                        content={hit}
                        key={hit?.id}
                    />
                </div>
            ))}
        </>
    )
}

export default connectInfiniteHits(DownloadInfinityHits)
