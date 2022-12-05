import { useQuery } from '../use-query'
import type { SWRConfiguration } from 'swr'
import { RequestInit } from '@vercel/fetch'
import { GraphQLError } from '@pylot-data/graphqlFetch'
import { getContentJsonQuery } from './graphql/getContentJsonQuery'
import { IMeta } from '@components/common/types'

export interface VideoFileType {
    url: string
    details: {
        size: number
    }
    fileName: string
    contentType: string
}

export interface VideoType {
    title: string
    description: string
    file: VideoFileType
}

export interface FileType {
    url: string
    details: {
        size: number
        image: {
            width: number
            height: number
        }
    }
    fileName: string
    contentType: string
}

export interface ImageType {
    title: string
    description: string
    file: FileType
}

export interface ImageLinkType {
    title: string
    heading?: string
    headingColor?: string
    image: ImageType
    width?: number
    height?: number
    url: string
    description?: string
    newTab: boolean
}

export interface ContentJsonItem<T> {
    parsedEntries: T & { meta: { contentType: string } }
    identifier: string
    entries: string
}

export interface ContentJson<T> {
    contentJson: ContentJsonItem<T>[]
}

export interface ContentJsonResponse<T> {
    data?: ContentJsonItem<T>[]
    isValidating?: boolean
    error?: GraphQLError
}

export interface ContentJsonOptionsInput {
    queryField?: string
    level?: number
}

export interface QueryVariables {
    identifier?: string[]
    contentType?: string
    options?: ContentJsonOptionsInput
}

export interface CTAType {
    displayText: string
    url: string
    image?: ImageType
    openInANewTab: boolean
    meta: IMeta<'componentCta'>
}

export interface IconType {
    title: string
    image: ImageType
    position: string
    color: IconType
}

export interface URLType {
    text: string
    url: string
    target: string
    color: string
    icon: IconType
    cta?: boolean
}

export interface EmbedVideoType {
    title: string
    url: string
}

export const useContentJson = <T>(
    queryVariables: QueryVariables,
    swrOptions?: SWRConfiguration,
    fetchOptions?: RequestInit
): ContentJsonResponse<T> => {
    const { data, error, isValidating } = useQuery<
        QueryVariables,
        ContentJson<T>
    >(getContentJsonQuery, queryVariables, swrOptions, fetchOptions)

    if (data?.data?.contentJson) {
        try {
            data.data.contentJson.forEach((content) => {
                if (typeof content.entries === 'string') {
                    content.parsedEntries = JSON.parse(content.entries)
                }
            })
        } catch (err) {
            console.log(
                `Error parsing content json for ${JSON.stringify(
                    queryVariables
                )}`
            )
            console.error(err)
        }
    }

    return {
        data: data?.data?.contentJson,
        isValidating,
        error
    }
}
