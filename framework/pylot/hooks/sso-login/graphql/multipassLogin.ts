export const MULTIPASS_LOGIN = /* GraphQL */ `
    mutation multipassLogin($multipassToken: String!) {
        multipassLogin(multipassToken: $multipassToken) {
            accessToken
        }
    }
`
