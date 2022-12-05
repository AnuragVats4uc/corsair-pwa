import type { RequestInit } from '@vercel/fetch'
import { logFetchQueryAsCurl, logGqlErrors } from './logGraphqlFetchErrors'
import { getRequestHeaders } from './getRequestHeaders'
import { canRunBuildTimeQuery } from './canRunBuildTimeQuery'

export interface GraphQLError {
    message: string
    extensions: {
        category: string
    }
    locations: Array<{
        line: number
        column: number
    }>
    debugMessage: string
}

// This will remove all space from queries except absolute minimum spaces
const getShortQueryString = (query: string): string => {
    return query
        .replace(/#.*\n/g, '')
        .replace(/[\s|,]*\n+[\s|,]*/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/,\s/g, ',')
        .replace(/\)\s\{/g, '){')
        .replace(/\}\s/g, '}')
        .replace(/\{\s/g, '{')
        .replace(/\s\}/g, '}')
        .replace(/\s\{/g, '{')
        .replace(/\)\s/g, ')')
        .replace(/\(\s/g, '(')
        .replace(/\s\)/g, ')')
        .replace(/\s\(/g, '(')
        .replace(/=\s/g, '=')
        .replace(/\s=/g, '=')
        .replace(/@\s/g, '@')
        .replace(/\s@/g, '@')
        .replace(/\s\$/g, '$')
        .replace(/\s\./g, '.')
        .trim()
}

enum QueryType {
    query = 'query',
    mutation = 'mutation',
    subscription = 'subscription'
}

type GetQueryParamsResult = {
    operationType: QueryType
    operationNickname: string
    firstQueryName: string
}

/**
 * Extracts query parameters from shortened graphql query
 * @param query short query string (processed with `getShortQueryString`)
 * @returns query parameters necessary for custom headers and request body
 */
const getQueryParams = (query: string): GetQueryParamsResult => {
    const operationMethods = Object.keys(operationToMethod).join('|')
    const queryParamExtractionRegExp = new RegExp(
        `^(?:(${operationMethods}) ?)?(?:(\\w+)(?:\\(.+?\\))?)?\\{(?:\\w+:)?(\\w+)`
    )

    const params = queryParamExtractionRegExp.exec(query) || []

    if (!params) {
        const errorMessage = `Unable to get query parameters, i.e. 'type', 'operationNickname', 'firstQueryName', from the following query: "${query}"`

        console.error(errorMessage)
        throw new Error(errorMessage)
    }

    const firstQueryName = params[3]
    const [, operationType = QueryType.query, operationNickname] = params

    return {
        operationType: operationType as QueryType,
        operationNickname,
        firstQueryName
    }
}

const operationToMethod: Record<QueryType, 'GET' | 'POST'> = {
    [QueryType.query]: 'GET',
    [QueryType.mutation]: 'POST',
    [QueryType.subscription]: 'POST'
}

export type GraphqlFetchOutput<OutputInterface> = {
    data: OutputInterface
    errors: GraphQLError[]
}

export type GraphqlFetchOutputPromise<OutputInterface> = Promise<
    GraphqlFetchOutput<OutputInterface>
>

export type GraphqlFetchParameters<VariablesInterface> = {
    query: string
    variables?: VariablesInterface
    locale?: string
    fetchOptions?: RequestInit
    isPreview?: boolean
    previewDate?: number
}

const getLocaleParam = (operation: string, locale = 'en-US'): string => {
    const localeParts = locale.split('-')
    const localeValue =
        operation === 'translation' && localeParts.length === 2
            ? localeParts[0]
            : locale
    return `&locale=${localeValue}`
}

const getPreviewParam = (): string =>
    typeof window !== 'undefined' &&
    window.localStorage.getItem('isPreview') === 'true'
        ? '&preview=true'
        : ''

export const graphqlFetch = async <VariablesInterface, OutputInterface>({
    query,
    variables,
    locale,
    fetchOptions,
    isPreview,
    previewDate
}: GraphqlFetchParameters<VariablesInterface>): GraphqlFetchOutputPromise<OutputInterface> => {
    const shortQuery = getShortQueryString(query)
    const { operationType, operationNickname, firstQueryName } = getQueryParams(
        shortQuery
    )

    if (!canRunBuildTimeQuery(firstQueryName, locale)) {
        // Return null instead of query data for skipped locales during build time
        return { data: null as any, errors: [] }
    }

    const operationNicknameFormatted = operationNickname
        ? `&operationName=${operationNickname}`
        : ''

    // get the URL ending for queries with parameters
    // leave it empty for mutations
    const urlEnding =
        operationType === QueryType.query
            ? `?query=${encodeURIComponent(
                  shortQuery
              )}${operationNicknameFormatted}&variables=${encodeURIComponent(
                  JSON.stringify(variables || {})
              )}${getLocaleParam(
                  operationNickname,
                  locale
              )}${getPreviewParam()}`
            : ''

    const headers = getRequestHeaders({
        fetchOptions,
        locale,
        queryName: firstQueryName,
        requestMethod: operationToMethod[operationType],
        isPreview: !!isPreview,
        previewDate
    })

    // init the fetch config early so we can manipulate below
    const fetchConfig = {
        ...fetchOptions,
        method: operationToMethod[operationType],
        headers
    }

    // Add body ONLY IF not a query
    // Adding body to a query breaks the query
    if (operationType !== QueryType.query)
        fetchConfig.body = JSON.stringify({
            query,
            variables
        })

    //
    // You can add a conditional here w/ firstQueryName to test local services.
    // For example, if you're locally testing a service which replaces the `products` and `categories` endpoints:
    // //
    // const urlBeginning = ['products', 'categories'].includes(firstQueryName)
    //     ? 'http://localhost:4000/graphql'
    //     : process.env.NEXT_PUBLIC_API_GATEWAY_URL

    const urlBeginning = process.env.NEXT_PUBLIC_API_GATEWAY_URL

    const fetchUrl = urlBeginning + urlEnding
    let res
    try {
        res = await fetch(
            fetchUrl,
            // @ts-ignore for some reason, typescript insists that we need `body`,
            // which is only appropriate for POST requests
            fetchConfig
        )
    } catch (e: any) {
        // Log service connection errors
        logFetchQueryAsCurl(fetchUrl, fetchConfig)
        throw new Error(`Failed to connect to the service: ${e.message}`)
    }

    // We don't return 'await res.json()' right away in order to be able to log erroneous response text and headers
    const resText = await res.text()
    try {
        const resJson = JSON.parse(resText)
        if (resJson && (resJson['errors'] || resJson['error'])) {
            logGqlErrors(fetchUrl, fetchConfig, res, resJson)
        }
        return resJson
    } catch (e) {
        // Show the actual response text and error message
        console.error(e)
        logFetchQueryAsCurl(fetchUrl, fetchConfig)
        throw new Error(`Failed to process response as JSON data: ${resText}`)
    }
}
