import type {
    BaseConfig,
    UrlConfig,
    ModelUrlConfig,
    ModelUrlData,
    MenuConfig
} from '@preload/graphql/getConfig.d'

export enum SubmenuMode {
    BLOCK = 'cms_block',
    SUBCATEGORY = 'subcategory'
}

export enum ModelTypeEnum {
    CATEGORY = 'category',
    PRODUCT = 'product',
    CMS_PAGE = 'cmsPage'
}

export type ModelType = keyof Omit<ModelUrlConfig, '__typename'>

export type FrontendBaseConfig = BaseConfig & {
    url: UrlConfig & {
        baseUrl: string
        localHostBaseUrl: string
        model: {
            [key in ModelType]: ModelUrlData & {
                directory: string
            }
        }
    }
    menu: Required<Omit<MenuConfig, '__typename'>> & {
        submenu: SubmenuMode | string
    }
    wishlist: {
        enabled: boolean
        multiple_wishlists: boolean
    }
    yotpo: {
        enabled: boolean
        api_key: string
    }
    liveChat: {
        enabled: boolean
        key: string
        settings?: Record<string, unknown>
    }
    brands: string[]
    product: {
        default_max_quantity: number
    }
    shopifyUrl: string
    algolia: {
        appId: string
        apiKey: string
        index: string
        defaultUserToken: string
    }
}

export const base: FrontendBaseConfig = {
    url: {
        baseUrl: 'https://pylot.pwa.corralive.com/',
        localHostBaseUrl: 'http://localhost:3000/',
        model: {
            category: {
                directory: 'c'
            },
            product: {
                suffix: '.html',
                directory: 'p'
            },
            cmsPage: {
                directory: 's'
            }
        }
    },
    menu: {
        submenu: SubmenuMode.SUBCATEGORY,
        submenu_maxitems: 10
    },
    wishlist: {
        enabled: true,
        multiple_wishlists: false
    },
    yotpo: {
        enabled: false,
        api_key: ''
    },
    liveChat: {
        enabled: true,
        key: 'e672beee-1f86-4883-ba2f-fd126f5db17d',
        settings: {
            webWidget: {
                chat: {
                    departments: {
                        enabled: ['Pre-Sales', 'Question about existing order']
                    }
                }
            }
        }
    },
    brands: ['https://www.elgato.com/'],
    product: {
        default_max_quantity: 2
    },
    shopifyUrl: 'https://corsair-us.myshopify.com/',
    algolia: {
        appId: '',
        apiKey: '',
        index: '',
        defaultUserToken: ''
    }
}

export default base
