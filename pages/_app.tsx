import '@styles/main.css'
import '@styles/chrome-bug.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../node_modules/swiper/swiper-bundle.css'

import { FC, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from 'next-i18next.config.js'
import { ManagedUIContext } from '@corratech/pylot-ui/context'
import { ManagedAuthContext } from '@corratech/pylot-auth-manager'
import { Head } from '@components/common'
import { useCreateCart } from '@corratech/pylot-cart-manager'
import { Toast } from '@corratech/pylot-ui'
import { TagContextInit } from '@corratech/pylot-tag-manager'
import { useGTM } from '@corratech/pylot-gtm'
import { LoadingIndicator } from '@components/LoadingIndicator'
import { LiveChat } from '@components/common/LiveChat'
import { CartContextView } from '@corratech/corsair-cart/src/CartContext'
import { useAlgoliaEvents } from '@components/Algolia/useAlgoliaEvents'

require('polyfill-object.fromentries')

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
    const Layout = (Component as any).Layout || Noop
    const authRequired = (Component as any).Protected || false

    useEffect(() => {
        document.body.classList?.remove('loading')
    }, [])

    useCreateCart()
    const { gtmHandler, gtmInitScript } = useGTM()
    const { algoliaHandler } = useAlgoliaEvents()

    return (
        <>
            <Head />
            <LiveChat />
            <TagContextInit
                handlers={[gtmHandler, algoliaHandler]}
                scripts={[gtmInitScript]}
            >
                <ManagedUIContext LoadingIndicator={LoadingIndicator}>
                    <ManagedAuthContext>
                        <CartContextView>
                            <Layout
                                pageProps={pageProps}
                                authRequired={authRequired}
                            >
                                <Toast />
                                <Component {...pageProps} />
                            </Layout>
                        </CartContextView>
                    </ManagedAuthContext>
                </ManagedUIContext>
            </TagContextInit>
        </>
    )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
