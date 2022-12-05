import type { PreloadConfig } from '@preload/graphql/getConfig.d'

export type FrontendPreloadConfig = PreloadConfig &
    {
        [K in keyof Omit<PreloadConfig, '__typename'>]?: PreloadConfig[K] & {
            queryPath?: string
            fetchConfig?: Record<string, unknown>
        }
    }

export const preload: FrontendPreloadConfig = {
    menu: {
        variables: {
            identifier: ['mega-menu'],
            contentType: 'navigation',
            options: {
                level: 1 // Load only one level during the build time
            }
        },
        queryPath:
            'framework/pylot/hooks/contentful/graphql/getContentJsonQuery.ts'
    },
    header: {}
}

export default preload
