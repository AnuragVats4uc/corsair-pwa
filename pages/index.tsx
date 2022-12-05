import { Layout } from '@components/common'
import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
    InferGetStaticPropsType
} from 'next'
import s from '@pagestyles/index.module.scss'
import React, { ReactElement } from 'react'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import {
    ContentJson,
    useContentJson
} from '@pylot-data/hooks/contentful/use-content-json'
import { ContentPage } from '@components/common/ContentPage/ContentPage'
import { SEO } from '@corratech/corsair-seo'
import {
    SocialDefaultContent,
    socialDefaultContent
} from '@config/seo/defaultContents'

export async function getStaticProps({
    locale
}: GetStaticPropsContext): Promise<
    GetStaticPropsResult<{
        pageContent: ContentJson<ContentPage> | undefined | null
    }>
> {
    try {
        const { data } = await getContentJson<ContentPage>({
            queryVariables: {
                identifier: ['/'],
                contentType: 'content-page',
                options: {
                    level: 10
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
    } catch (e) {
        console.log('HOME GETSTATICPROPS ERROR')
        console.log(e)
        return {
            props: {
                pageContent: null,
                ...(await serverSideTranslations(locale!, ['common']))
            },
            revalidate: 30
        }
    }
}

export default function Home({
    pageContent
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement | null {
    const { data } = useContentJson<ContentPage>(
        {
            identifier: ['/'],
            contentType: 'content-page',
            options: {
                level: 10
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: { data: pageContent }
        }
    )

    if (!data?.length) return null

    const { socialDefaultImage } = data[0]?.parsedEntries
    const { seoImage } = socialDefaultContent

    const socialContent: SocialDefaultContent = {
        ...socialDefaultContent,
        seoImage: socialDefaultImage || seoImage
    }

    return (
        <>
            <SEO
                cmsPage={data[0]?.parsedEntries}
                socialDefaultContent={socialContent}
            />
            <div className={s.homepage}>
                <ContentPage pageContent={data[0]} />
            </div>
        </>
    )
}

Home.Layout = Layout
