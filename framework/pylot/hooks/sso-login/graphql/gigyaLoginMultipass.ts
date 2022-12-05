export const GIGYA_LOGIN_MULTIPASS = /* GraphQL */ `
    mutation gigyaLoginMultipass($input: GigyaLoginMultipassInput!) {
        gigyaLoginMultipass(input: $input) {
            token
        }
    }
`
