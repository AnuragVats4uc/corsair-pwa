import { FrontendConfig } from '@preload/graphql/getConfig.d'
import { FrontendBaseConfig } from '@config/base'
import { FrontendPreloadConfig } from '@config/preload'
import { FrontendSeoConfig } from '@config/seo'
import { FrontendStaticRenderConfig } from '@config/static'

export type PylotFrontendConfig = FrontendConfig & {
    base: FrontendBaseConfig
    preload: FrontendPreloadConfig
    seo: FrontendSeoConfig
    static: FrontendStaticRenderConfig
}
