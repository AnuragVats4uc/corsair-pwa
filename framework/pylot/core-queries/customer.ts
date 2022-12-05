export const customerFields = /* GraphQL */ `
    __typename
    firstname
    lastname
    suffix
    email
    is_subscribed
    addresses {
        uid
        id
        firstname
        lastname
        street
        city
        region {
            region_id
            region_code
            region
        }
        postcode
        country_code
        telephone
        default_shipping
        default_billing
    }
`
