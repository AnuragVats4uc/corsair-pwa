import React from 'react'
import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
    InferGetStaticPropsType
} from 'next'
import { Layout } from '@components/common'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import {
    ContentJson,
    ImageType,
    useContentJson
} from '@pylot-data/hooks/contentful/use-content-json'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import { NotFound } from '@components/404'

interface Interface404Response {
    entries: string
    identifier: string
    parsedEntries: Interface404ParsedEntries
}
export interface Interface404ParsedEntries {
    pageContent?: {
        copy?: string
        ctaText?: string
        ctaUrl?: string
        desktopBackgroundImage?: ImageType
        heading?: string
        logoImage?: ImageType
        meta?: {
            contentType: string
        }
        mobileBackgroundImage?: ImageType
        title?: string
    }
}

const CONTENT_TYPE = '404'

export async function getStaticProps({
    locale
}: GetStaticPropsContext): Promise<
    GetStaticPropsResult<{
        pageContent: ContentJson<Interface404Response> | undefined
    }>
> {
    const { data } = await getContentJson<Interface404Response>({
        queryVariables: {
            contentType: CONTENT_TYPE,
            options: {
                level: 5
            }
        },
        locale: locale
    })

    return {
        props: {
            pageContent: data,
            ...(await serverSideTranslations(locale!, ['common']))
        },
        revalidate: 30
    }
}

export default function Custom404({
    pageContent
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element | null {
    const { data } = useContentJson<Interface404Response>(
        {
            contentType: CONTENT_TYPE,
            options: {
                level: 5
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: { data: pageContent }
        }
    )

    if (!data?.length) return null

    return <NotFound pageContent={data[0].parsedEntries} />
}

Custom404.Layout = Layout
