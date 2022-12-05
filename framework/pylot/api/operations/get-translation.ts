import type { RequestInit } from '@vercel/fetch'
import { graphqlFetch } from '../../graphqlFetch'
import { translationQuery } from './graphql/translationQuery'

export type OutputInterface = {
    translation: [
        {
            entries: string
            identifier: string
        }
    ]
}

export const getTranslation = async (
    identifiers: string[],
    locale: string,
    fetchOptions?: RequestInit
) => {
    return graphqlFetch<{ identifiers: string[] }, OutputInterface>({
        query: translationQuery,
        variables: { identifiers },
        fetchOptions,
        locale
    })
}

export default getTranslation
