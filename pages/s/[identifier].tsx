import { Layout } from '@components/common'
import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
    InferGetStaticPropsType
} from 'next'
import s from '@pagestyles/Cms.module.scss'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import {
    ContentJson,
    useContentJson
} from '@pylot-data/hooks/contentful/use-content-json'
import { ContentPage } from '@components/common/ContentPage/ContentPage'
import React, { ReactElement } from 'react'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { GetStaticPaths } from 'next'
import { NotFound } from '@components/404'
import {
    SocialDefaultContent,
    socialDefaultContent
} from '@config/seo/defaultContents'
import { SEO } from '@corratech/corsair-seo'

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // TODO: Make this dynamic
        paths: [],
        fallback: true
    }
}

export async function getStaticProps({
    locale,
    params
}: GetStaticPropsContext): Promise<
    GetStaticPropsResult<{
        pageContent: ContentJson<ContentPage> | undefined
        identifier: string
    }>
> {
    const identifier = params!.identifier as string
    const { data } = await getContentJson<ContentPage>({
        queryVariables: {
            identifier: [identifier],
            contentType: 'content-page',
            options: {
                level: 10
            }
        },
        locale: locale
    })

    // data can exist but simultaneously be empty, so we use 2 conditions to check if the page should be notFound
    if (!data || data.contentJson.length === 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            pageContent: data,
            identifier,
            ...(await serverSideTranslations(locale!, ['common', 'cms']))
        },
        revalidate: 600
    }
}
export default function CMSPage({
    pageContent,
    identifier
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement | null {
    const { data, error } = useContentJson<ContentPage>(
        {
            identifier: [identifier],
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

    //avoid page flashing
    if (!data?.length) return null
    //Show 404 only if there is no data as well as the page don't exists in contentful (error case)
    if (!data && error) return <NotFound />

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
            <div className={s['cms-page']}>
                <ContentPage pageContent={data[0]} />
            </div>
        </>
    )
}

CMSPage.Layout = Layout
