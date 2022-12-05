export const GIGYA_LOGIN = /* GraphQL */ `
    mutation gigyaLogin($input: GigyaLoginInput!) {
        gigyaLogin(input: $input) {
            accessToken
        }
    }
`
