export const translationQuery = /* GraphQL */ `
    query translation($identifiers: [String]) {
        translation(identifiers: $identifiers) {
            entries
            identifier
        }
    }
`
