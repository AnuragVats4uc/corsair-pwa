import { base } from './base'
import { preload } from './preload'
import { seo } from './seo'
import { staticRenderConfig } from './static'
import type { PylotFrontendConfig } from './config.d'

export const defaultConfig: Omit<PylotFrontendConfig, 'is_fallback'> = {
    base,
    preload,
    seo,
    static: staticRenderConfig
}
