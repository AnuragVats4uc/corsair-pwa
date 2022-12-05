export const getContentJsonQuery = /* GraphQL */ `
    query contentJson(
        $identifier: [String]
        $contentType: String
        $options: ContentJsonOptionsInput
    ) {
        contentJson(
            identifiers: $identifier
            contentType: $contentType
            options: $options
        ) {
            identifier
            entries
        }
    }
`
export default getContentJsonQuery
