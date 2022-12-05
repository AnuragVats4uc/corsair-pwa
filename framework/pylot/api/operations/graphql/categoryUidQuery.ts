// TODO: once support for UIDs is added, start utilising categoryUidQuery
export const oldCategoryIdQuery = /* GraphQL */ `
    query categoryList($categoryFilter: CategoryFilterInput) {
        categories(filters: $categoryFilter) {
            items {
                uid
            }
        }
    }
`

export const categoryUidQuery = /* GraphQL */ `
    query categories($categoryFilter: CategoryFilterInput) {
        categories(filters: $categoryFilter) {
            items {
                uid
            }
        }
    }
`
