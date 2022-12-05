import type {
    SeoConfig,
    DefaultSeoConfig,
    OrganizationSeoConfig,
    OrganizationContentSeo,
    OrganizationAddressSeo,
    OrganizationContactPointSeo,
    ProductSeoConfig,
    ProductAttributesSeoConfig,
    ProductImageSeoConfig,
    TagManagerConfig,
    Maybe,
    AvailableLanguage
} from '@preload/graphql/getConfig.d'
import type { CustomPages } from './seo/customPages'
import { customPages } from './seo/customPages'
import type { CheckoutSteps } from './seo/checkoutSteps'
import { checkoutSteps } from './seo/checkoutSteps'

export enum ItemCondition {
    NEW = 'https://schema.org/NewCondition',
    USED = 'https://schema.org/UsedCondition',
    DAMAGED = 'https://schema.org/DamagedCondition',
    REFURBISHED = 'https://schema.org/RefurbishedCondition'
}

export type TContactPoint = Maybe<
    OrganizationContactPointSeo & {
        '@type'?: string
        availableLanguage?: Maybe<AvailableLanguage & { '@type'?: string }>
    }
>

export type FrontendSeoConfig = SeoConfig & {
    default: DefaultSeoConfig & {
        title: string
    }
    product: ProductSeoConfig & {
        attributes: ProductAttributesSeoConfig
        image: ProductImageSeoConfig & {
            count: number
            width: number
        }
    }
    organization?: OrganizationSeoConfig & {
        content: OrganizationContentSeo & {
            address?: OrganizationAddressSeo & {
                '@type': string
            }
            contactPoint?: Array<TContactPoint>
        }
    }
    customPages: CustomPages
    checkoutSteps: CheckoutSteps
    tagManager: TagManagerConfig
}

export const seo: FrontendSeoConfig = {
    default: {
        title: ''
    },
    product: {
        attributes: {},
        image: {
            count: 1,
            width: 620
        }
    },
    organization: {
        content: {
            type: 'Corporation',
            legalName: 'Corsair Gaming Inc.',
            tickerSymbol: 'NYSE:CRSR',
            address: {
                '@type': 'PostalAddress'
            }
        }
    },
    customPages,
    checkoutSteps,
    tagManager: {}
}

export default seo
