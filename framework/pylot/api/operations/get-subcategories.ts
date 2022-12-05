import type { CategoryTree } from '@pylot-data/pylotschema'
import { graphqlFetch } from '@pylot-data/graphqlFetch'

export const getSubcategories = async ({
    pageSize,
    currentPage,
    rootCategory,
    locale = ''
}: {
    pageSize: number
    currentPage: number
    rootCategory: string
    locale?: string
}): Promise<CategoryTree[]> => {
    const categories: CategoryTree[] = []

    const getCategory = async (url_path?: string): Promise<void> => {
        // url_key for the root category, url_path for the rest
        const filter = url_path
            ? `url_path: {eq: "${url_path}"}`
            : `url_key: {eq: "${rootCategory}"}`
        const fetchedCategories = await graphqlFetch<
            Record<string, never>,
            { categories: { items: [CategoryTree] } }
        >({
            query: /* GraphQL */ `
                {
                    categories(filters:{${filter}}, pageSize: ${pageSize}, currentPage: ${currentPage}){
                        items{
                            name
                            children_count
                            url_path
                            children{
                                url_path
                                children_count
                            }
                        }
                    }
                }
            `,
            locale
        })
        const items = fetchedCategories.data?.categories?.items
        if (!Array.isArray(items) || !items[0]) {
            return
        }
        if (items[0].children) {
            // Recursively fetch children categories and their children, await all results
            await Promise.all(
                items[0].children.map((child) => {
                    if (!child || !child.url_path) {
                        return
                    }
                    categories.push(child)
                    if (Number(child.children_count) > 0) {
                        return getCategory(child.url_path)
                    }
                })
            )
        }
    }
    await getCategory()
    return categories
}
