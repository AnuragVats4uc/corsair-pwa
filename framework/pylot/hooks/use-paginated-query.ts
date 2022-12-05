import type { RequestInit } from '@vercel/fetch'
import { GraphQLError, graphqlFetch } from '@pylot-data/graphqlFetch'
import {
    SWRInfiniteConfiguration,
    SWRInfiniteResponse,
    useSWRInfinite
} from 'swr'
import { useRouter } from 'next/router'

export type SwrUsePaginatedQueryOutput<OutputInterface> = SWRInfiniteResponse<
    OutputInterface,
    GraphQLError
>

export const usePaginatedQuery = <
    VariablesInterface,
    OutputInterface,
    OutputError = GraphQLError
>(
    query: string | undefined | null,
    variablesRaw?: VariablesInterface | null,
    sizeVariableName?: keyof VariablesInterface | null,
    swrOptions?: SWRInfiniteConfiguration,
    fetchOptions?: RequestInit
): SWRInfiniteResponse<OutputInterface, OutputError> => {
    const { locale } = useRouter()

    if (variablesRaw) {
        if (!sizeVariableName) {
            throw new Error(
                'UsePaginatedQuery: Variable name for size value is not indicated'
            )
        }
        if (!(sizeVariableName in variablesRaw)) {
            throw new Error(
                `UsePaginatedQuery: Property '${sizeVariableName}' is not defined inside the object with variables`
            )
        }
    }

    function getVars() {
        if (!query) return null

        const variables: VariablesInterface = { ...variablesRaw! }

        if (!variablesRaw) return [query]

        const sortedVariables = Object.entries(variables).sort(
            ([key1], [key2]) => {
                if (key1 < key2) return -1
                else if (key1 > key2) return 1
                else return 0
            }
        )

        const queryKey = [
            query,
            ...sortedVariables!.map((variableEntry) =>
                JSON.stringify(variableEntry[1])
            )
        ]

        return queryKey ?? null
    }

    return useSWRInfinite(
        getVars,
        (query, ...variableValues) => {
            const sortedVariables = variablesRaw
                ? Object.entries(variablesRaw).sort(([key1], [key2]) => {
                      if (key1 < key2) return -1
                      else if (key1 > key2) return 1
                      else return 0
                  })
                : null
            const res = graphqlFetch<VariablesInterface, OutputInterface>({
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
    )
}
