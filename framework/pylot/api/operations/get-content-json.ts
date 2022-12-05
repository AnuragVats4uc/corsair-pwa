import { graphqlFetch } from '@pylot-data/graphqlFetch'
import getContentJsonQuery from '@pylot-data/hooks/contentful/graphql/getContentJsonQuery'
import {
    ContentJson,
    QueryVariables
} from '@pylot-data/hooks/contentful/use-content-json'
import { GraphqlFetchOutput } from '@pylot-data/graphqlFetch'
import { RequestInit } from '@vercel/fetch'

async function getContentJson<T>({
    queryVariables,
    locale = '',
    fetchOptions,
    isPreview
}: {
    queryVariables?: QueryVariables
    locale?: string
    fetchOptions?: RequestInit
    isPreview?: boolean
}): Promise<GraphqlFetchOutput<ContentJson<T>>> {
    // NOTE: We don't parse the graphql fetch output into contentJson here because that will be handled by useContentJson
    return await graphqlFetch<QueryVariables, ContentJson<T>>({
        query: getContentJsonQuery,
        variables: queryVariables,
        locale,
        fetchOptions,
        isPreview: !!isPreview
    })
}

export default getContentJson
