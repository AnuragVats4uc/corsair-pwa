// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const bundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.BUNDLE_ANALYZE
})
const withNextOptimizedClassnames = require('next-optimized-classnames')
const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')

const rootPackageJson = require('./package.json')
const corratech_regex = /@corratech\/.+/
const getCorratechKeys = (obj) =>
    Object.keys(obj)
        .filter((pkgName) => pkgName.match(corratech_regex) !== null)
        .filter((pkgName) => pkgName !== '@corratech/eslint-config')
const corra_module_names = [
    ...getCorratechKeys(rootPackageJson.dependencies),
    ...getCorratechKeys(rootPackageJson.devDependencies)
]
const withTM = require('next-transpile-modules')(corra_module_names)
const withPreact = require('next-plugin-preact')

const { subpathsToHypensMap } = require('./localesConfig')

module.exports = withPreact(
    withPWA(
        bundleAnalyzer(
            withNextOptimizedClassnames(
                withTM({
                    eslint: {
                        ignoreDuringBuilds: true
                    },
                    // If you want to use a built-in loader like Cloudinary,
                    // remove the entire `webpack` section and then follow these steps:
                    // https://nextjs.org/docs/basic-features/image-optimization#loader
                    webpack: (config, { dev, isServer }) => {
                        if (!isServer) {
                            console.log(
                                `\n\n🛩  Pylot Storefront`,
                                `\n📡 Services URL: ${process.env.NEXT_PUBLIC_API_GATEWAY_URL}`,
                                `\n🛠  Backend Header: ${process.env.NEXT_PUBLIC_X_PYLOT_BACKEND}`,
                                `\n🛠  Environment: ${process.env.NEXT_PUBLIC_ENVIRONMENT}`,
                                `\n💾 Store Code: ${
                                    process.env.NEXT_PUBLIC_STORE_CODE ||
                                    'Empty - will not send Store header'
                                }`,
                                `\n`
                            )
                        }
                        const tsConfigPaths = Object.entries(
                            // get all of the TS config paths
                            require('./tsconfig.json').compilerOptions.paths
                        ).reduce((result, [pathName, paths]) => {
                            // result starts as an empty object
                            const lastIndex = pathName.length - 1
                            let mutablePathname = pathName
                            let mutablePath = paths[0]
                            // remove "/*"" from paths as needed
                            if (mutablePathname.charAt(lastIndex) === '*') {
                                mutablePathname = mutablePathname.substring(
                                    0,
                                    lastIndex - 1
                                )
                                mutablePath = mutablePath.substring(
                                    0,
                                    lastIndex - 1
                                )
                            }
                            // format as module path alias
                            result[mutablePathname] = path.resolve(
                                __dirname,
                                mutablePath
                            )
                            return result
                        }, {})

                        config.resolve = {
                            ...config.resolve,
                            alias: {
                                ...config.resolve.alias,
                                ...tsConfigPaths,
                                '@corratech/pylot-cart-manager':
                                    '@corratech/corsair-cart-manager',
                                '@corratech/pylot-variant-selector':
                                    '@corratech/corsair-variant-selector'
                            },
                            extensions: ['.ts', '.tsx', '.js', '.jsx']
                        }

                        return config
                    },
                    images: {
                        domains: [
                            'cdn.shopify.com',
                            'images.ctfassets.net',
                            'assets.ctfassets.net'
                        ]
                    },
                    i18n,
                    rewrites() {
                        return [
                            ...Object.entries(subpathsToHypensMap).map(
                                ([subpathForm, hyphenForm]) => ({
                                    source: `/${subpathForm}/:path*`,
                                    destination: `/${hyphenForm}/:path*`
                                })
                            )
                        ]
                    },
                    pwa: {
                        disable: process.env.NODE_ENV === 'development',
                        dest: 'public',
                        register: true,
                        skipWaiting: true
                    }
                })
            )
        )
    )
)
