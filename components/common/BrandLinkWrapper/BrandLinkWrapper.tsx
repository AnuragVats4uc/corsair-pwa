import React from 'react'
import Image from 'next/image'
import s from './BrandLinkWrapper.module.scss'
import {
    ImageLinkType,
    useContentJson
} from '@pylot-data/hooks/contentful/use-content-json'
import Skeleton from 'react-loading-skeleton'

const CONTENT_IDENTIFIER = ['header-brand-list']
const CONTENT_TYPE = 'container'

interface BrandLinks {
    title: string
    indentifier: string
    items?: ImageLinkType[]
    type: string
}

const BrandLinkWrapper = (): JSX.Element | null => {
    const { data } = useContentJson<BrandLinks>(
        {
            identifier: CONTENT_IDENTIFIER,
            contentType: CONTENT_TYPE
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true
        }
    )

    if (!data || !data.length) {
        return <Skeleton height={44} />
    }

    const { items: logos, type } = data[0].parsedEntries
    if (type !== 'Header') return null

    return (
        <div className={s['brands-container']}>
            {logos?.map((logo: ImageLinkType, index: number) => {
                return (
                    <div key={index}>
                        <a
                            href={logo.url}
                            target={logo.newTab ? '_blank' : '_self'}
                            rel="noreferrer"
                            style={{
                                width: logo.image.file.details.image.width,
                                height: logo.image.file.details.image.height
                            }}
                        >
                            <Image
                                src={logo.image.file.url}
                                alt={logo.title}
                                width={logo.image.file.details.image.width}
                                height={logo.image.file.details.image.height}
                            />
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default BrandLinkWrapper
