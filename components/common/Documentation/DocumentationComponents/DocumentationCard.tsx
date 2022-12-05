import React, { useState, VFC } from 'react'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
import s from '../../DownloadComponents/DownloadComponents.module.scss'
import { ConfigurableProduct, SimpleProduct } from '@pylot-data/pylotschema'
import { DocumentationAccordion } from './DocumentationAccordion'
import { useTranslation } from 'next-i18next'

const DOCUMENTATION_INDEX = 'downloads'

export const DocumentationCard: VFC<{
    content: ConfigurableProduct | SimpleProduct
    apiKey: string
    appId: string
}> = ({ content, appId, apiKey }) => {
    const { name, image } = content
    const [openAccordion, setOpenAccordion] = useState<boolean>(false)
    const [isLoading, setLoading] = useState(false)
    const [hits, setHits] = useState([])

    const { t } = useTranslation('common')

    async function getHits() {
        setOpenAccordion(!openAccordion)

        if (hits.length) {
            return
        }

        setLoading(true)
        const response = await fetch(
            `https://${appId}-dsn.algolia.net/1/indexes/${DOCUMENTATION_INDEX}/query`,
            {
                method: 'POST',
                body: JSON.stringify({
                    params: `filters=products:${content.sku} AND asset_status:true AND type:downloadDocumentation`
                }),
                headers: {
                    'x-algolia-application-id': appId,
                    'x-algolia-api-key': apiKey
                }
            }
        )

        const data = await response.json()
        setHits(data.hits ?? [])
        setLoading(false)
    }

    const imageUrl = image?.url
        ? image.url
        : '/images/default-product-image.png?w=3840&q=75'

    return (
        <>
            <div
                className={cn(
                    s['download-card'],
                    'items-start md:flex-row flex-col'
                )}
                tabIndex={0}
                role="button"
                onKeyDown={getHits}
                onClick={getHits}
            >
                <div className={cn(s['download-card-image'], 'p-20')}>
                    <Image
                        src={imageUrl}
                        alt={name as string}
                        layout="fill"
                        objectFit="fill"
                    />
                </div>
                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-row items-center md-max:flex-col w-full">
                        <section
                            className={cn(
                                s['download-info'],
                                'md-max:w-full flex flex-col md-max:pb-2 p-7'
                            )}
                        >
                            <p
                                className={cn(
                                    s['download-title'],
                                    'text-white pb-3 md-max:pb-5 text-lg font-normal'
                                )}
                            >
                                {name}
                            </p>
                        </section>
                        <section className="md-max:w-full md:pb-6 pr-6 md-max:flex md-max:justify-end">
                            <a
                                className={cn(
                                    s['download-button'],
                                    'bg-white flex items-center justify-center absolute md-max:relative md-max:right-0 md-max:top-0 md-max:left-0 md-max:bottom-0'
                                )}
                            >
                                <span
                                    className={cn(
                                        'text-black md-max:hidden uppercase text-sm font-normal'
                                    )}
                                >
                                    {t('downloads|download')}
                                </span>
                                <i className={cn(s['download-icon'])} />
                            </a>
                        </section>
                    </div>
                </div>
            </div>
            <DocumentationAccordion
                isLoading={isLoading}
                isOpen={openAccordion}
                hits={hits}
            />
        </>
    )
}
