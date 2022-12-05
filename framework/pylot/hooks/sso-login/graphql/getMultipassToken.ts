export const GET_MULTIPASS_TOKEN = /* GraphQL */ `
    mutation getMultipassToken($input: GetMultipassTokenInput) {
        getMultipassToken(input: $input) {
            token
        }
    }
`
