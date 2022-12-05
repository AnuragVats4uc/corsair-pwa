import { createCart } from '@corratech/pylot-cart-manager'
import { ToastType, useUI } from '@corratech/pylot-ui/context'
import type { RequestInit } from '@vercel/fetch'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { SWRConfiguration, SWRResponse } from 'swr'
import useSWR, { cache } from 'swr'
import type { GraphQLError } from '../graphqlFetch'
import { graphqlFetch } from '../graphqlFetch'

export type SwrUseQueryOutput<OutputInterface> = SWRResponse<
    { data: OutputInterface; errors?: GraphQLError[] },
    // `any` is the default type for useSWR errors - see node_modules/swr/dist/use-swr.d.ts
    any
>

export type UseQueryOptions = {
    overrideFetcher: typeof graphqlFetch
}

// type declaration uses generics so that user can specific input, output, and error types
// on a per-query basis (ideally in wrapper hooks)

const useQueryBase = <VariablesInterface, OutputInterface>(
    query: string | undefined | null,
    variables?: VariablesInterface,
    swrOptions?: SWRConfiguration,
    fetchOptions?: RequestInit,
    useQueryOptions?: UseQueryOptions
): SwrUseQueryOutput<OutputInterface> => {
    const { locale } = useRouter()
    /*
        IMPORTANT:
        In order for useSWR caching to work, the query key should include
        ONLY the VALUES of variables, because the variable-object is not stable.
        ("not stable" meaning it is re-created on each render and useSWR would
        think each render has a different query)

        To work around this, in each run of this hook, we sort all of the variables
        to ensure a consistent order, and then we separate `variables` object into keys and values.
        The variable values are spread into `queryKey`.

        When we run the fetch, we re-combine the keys and values, which is required for
        our graphql fetcher to function correctly.
     */

    const sortedVariables = variables
        ? Object.entries(variables).sort(([key1], [key2]) => {
              if (key1 < key2) return -1
              else if (key1 > key2) return 1
              else return 0
          })
        : null

    const queryKey = sortedVariables
        ? [
              query,
              ...sortedVariables!.map((variableEntry) =>
                  JSON.stringify(variableEntry[1])
              )
          ]
        : [query]

    // in some cases we don't want to use the SWR key as the fetch args
    // example: in cart, we need to use the same SWR key across `cart` and `customerCart` queries
    const fetcher = useQueryOptions?.overrideFetcher || graphqlFetch

    const swrResult = useSWR(
        query ? queryKey : null,
        (query, ...variableValues) => {
            const res = fetcher<VariablesInterface, OutputInterface>({
                query: query!,
                variables: variableValues
                    ? variableValues.reduce((obj, val, i) => {
                          obj[sortedVariables![i][0]!] = JSON.parse(val)
                          return obj
                      }, {})
                    : {},
                fetchOptions,
                locale
            })
            return res
        },
        swrOptions
    ) as SwrUseQueryOutput<OutputInterface>

    return swrResult
}

const useQueryWithErrorHandling = <VariablesInterface, OutputInterface>(
    query: string | undefined | null,
    variables?: VariablesInterface,
    swrOptions?: SWRConfiguration,
    fetchOptions?: RequestInit,
    useQueryOptions?: UseQueryOptions
): SwrUseQueryOutput<OutputInterface> => {
    const { t } = useTranslation('common')
    const { openToast } = useUI()
    const router = useRouter()

    const queryResult = useQueryBase<VariablesInterface, OutputInterface>(
        query,
        variables,
        swrOptions,
        fetchOptions,
        useQueryOptions
    )

    useEffect(() => {
        // In some cases, isValidating value appears as "" (empty string), so we need a strict condition
        if (queryResult.data?.errors && queryResult.isValidating === false) {
            // If there are errors in a fresh (not from SWR cache) response,
            if (
                typeof window !== 'undefined' &&
                // check if any of the errors are 'graphql-authorization' errors
                queryResult.data.errors.filter(
                    (error) =>
                        error.extensions?.category === 'graphql-authorization'
                ).length >= 1 &&
                // check if we have a token
                window.localStorage.getItem('pylot_token') &&
                (window.localStorage.getItem('pylot_token') as string).length >
                    0
            ) {
                // If we are here, that means we sent a token and got a graphql-authorization error anyway, so *token must be expired*
                localStorage.removeItem('pylot_token')
                localStorage.removeItem('cart_id')
                router.push('/')
                cache.clear()
                createCart({ locale: router.locale })
                openToast(
                    t('Your session expired. Please sign in again.'),
                    ToastType.Warning
                )
            }
        }
    }, [queryResult]) // eslint-disable-line

    return queryResult
}

export { useQueryWithErrorHandling as useQuery, useQueryBase }
