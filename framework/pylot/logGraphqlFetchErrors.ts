import { RequestInit } from '@vercel/fetch'
import { GraphqlFetchOutput } from '@pylot-data/graphqlFetch'

// Log service code (identifier) if we are getting a response with errors (works only during build time)
export const logGqlErrors = (
    url: string,
    fetchConfig: RequestInit,
    res: Response,
    resJson: GraphqlFetchOutput<unknown> & { error?: string }
): void => {
    if (typeof window !== 'undefined') {
        return
    }
    // NOTE: response headers are accessible only during build time
    const backend = res.headers.get('x-pylot-origin')
    let errorMsg = backend
        ? `A GraphQL error received from ${backend} service:`
        : `A GraphQL error received from an undefined service (response header 'x-pylot-origin' is not set):`
    // Collect all the error messages
    if (resJson['errors']) {
        resJson.errors.forEach((error) => (errorMsg += `\n${error.message}`))
    } else if (resJson['error']) {
        // In special cases response is a JSON, but not a GraphqlFetchOutput: it has one 'error' message
        errorMsg += ` ${resJson['error']}`
    }
    console.log(errorMsg)
    logFetchQueryAsCurl(url, fetchConfig)
}

// Log fetch url and settings as a CURL request string (can be used for debugging)
export const logFetchQueryAsCurl = (
    url: string,
    fetchConfig: RequestInit,
    skipInBrowser = true
): void => {
    if (typeof window !== 'undefined' && skipInBrowser) {
        return
    }
    let curl = `curl $'${url}' -X ${fetchConfig.method}`
    if (fetchConfig.headers) {
        Object.entries(fetchConfig.headers).forEach(
            ([name, val]) =>
                (curl += ` -H '${name}: ${String(val).replace(
                    /([\\"])/g,
                    '\\$1'
                )}'`)
        )
    }
    if (fetchConfig.body) {
        curl += ` --data-binary '${fetchConfig.body}'`
    }
    console.log(`The query was: \n${curl}`)
}
