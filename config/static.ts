import type {
    StaticRenderConfig,
    StaticCategoriesConfig,
    StaticProductsConfig
} from '@preload/graphql/getConfig.d'

export type FrontendStaticRenderConfig = StaticRenderConfig & {
    categories: StaticCategoriesConfig & {
        count: number
    }
    products: StaticProductsConfig & {
        count: number
    }
}

export const staticRenderConfig: FrontendStaticRenderConfig = {
    categories: {
        count: 100
    },
    products: {
        count: 100
    }
}
export default staticRenderConfig
