import { useState } from 'react'
import { useRouter } from 'next/router'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import { GET_MULTIPASS_TOKEN } from './graphql/getMultipassToken'

export type UseMultipassTokenReturnType = {
    isLoading: boolean
    generateMultipassToken: (url: string) => Promise<string>
    getSsoRedirectionUrl: (url: string, queryParam: string) => Promise<string>
}

export type MultipassTokenInputArgs = {
    input: {
        url: string
    }
}

export type MultipassTokenOutput = {
    getMultipassToken: {
        token: string
    }
}

export const useMultipassToken = (): UseMultipassTokenReturnType => {
    const { locale } = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Generate the multiPass token based on the domain
     * @param url string
     * @returns string
     */
    const generateMultipassToken = async (url: string) => {
        setIsLoading(true)

        const response = await graphqlFetch<
            MultipassTokenInputArgs,
            MultipassTokenOutput
        >({
            query: GET_MULTIPASS_TOKEN,
            variables: {
                input: { url }
            },
            locale
        })

        if (response?.errors?.length) {
            setIsLoading(false)
            throw new Error(`Error: ${response.errors.join(',')}`)
        }

        setIsLoading(false)
        return response?.data?.getMultipassToken?.token
    }

    /**
     * Generate the redirection url
     * @param url string
     * @param queryParam string
     * @returns string
     */
    const getSsoRedirectionUrl = async (url: string, queryParam: string) => {
        try {
            const token = await generateMultipassToken(url)
            const hasPrams = !!url.match(/\?./)
            const criteria = hasPrams ? '&' : '?'

            return `${url}${criteria}${queryParam}=${token}`
        } catch (e) {
            return url
        }
    }

    return {
        isLoading,
        generateMultipassToken,
        getSsoRedirectionUrl
    }
}
