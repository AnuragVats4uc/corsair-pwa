import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.scss'
import React, { FC, useRef, useEffect, useState } from 'react'
import { useUI } from '@corratech/pylot-ui/context'
import { useSsoRedirect } from '@pylot-data/hooks/sso-login/use-sso-redirect'
import { Navbar } from '@components/common'
import { useTranslation } from 'next-i18next'
import { AuthWrapper } from '@components/common/AuthWrapper'
import BrandLinkWrapper from '../BrandLinkWrapper'
import Ribbon from '../Ribbon'
import SignInOptions from '../SignInOptions'
import { useRouter } from 'next/router'
import { useLogout } from '@corratech/pylot-auth-manager'
import { useGigyaLogin } from '@pylot-data/hooks/sso-login/use-gigya-login'
import { usePreviewMode } from 'framework/pylot/hooks/contentful/use-preview-mode'
import { PreviewButton } from '@components/common/PreviewMode/PreviewMode'

const Footer = dynamic(() => import('@components/common/Footer'), {
    ssr: false
})

const Sidebar = dynamic(
    () => import('@corratech/corsair-cart/src/SidebarRootView')
)

const CartSidebarView = dynamic(
    () =>
        import(
            '@corratech/corsair-cart/src/CartSidebarView/components/CartSidebarView'
        )
)

interface Props {
    authRequired: boolean
    pageProps: any
}

const Layout: FC<Props> = ({ children, authRequired }) => {
    useSsoRedirect() //set sso login
    const router = useRouter()
    const { displaySidebar, openSidebar } = useUI()
    const { t } = useTranslation()
    const { logout } = useLogout()
    const headerRef = useRef<HTMLDivElement>(null)
    const headerWrapperRef = useRef<HTMLElement>(null)
    const ribbonRef = useRef<HTMLDivElement>(null)
    const { previewMode } = usePreviewMode()
    const [isPreviewMode, setPreviewMode] = useState<boolean>(previewMode())

    const { removeGigyaUID } = useGigyaLogin()

    useEffect(() => {
        if (router.query.logout) {
            removeGigyaUID()
            logout()
            router.replace('/')
        }
    }, [router])

    useEffect(() => {
        const { current: $header } = headerWrapperRef
        const { current: $ribbon } = ribbonRef

        if (!$header) return

        const threshold = 0
        let lastScrollY = window.scrollY
        let isHeaderUpdateQueued = false

        /**
         * Handle on scroll
         * @returns isHeaderUpdateQueued set to true
         */
        const handleOnScroll = () => {
            if (window.innerWidth > 768) {
                if (isHeaderUpdateQueued) return
                window.requestAnimationFrame(updateHeaderTransform)
                isHeaderUpdateQueued = true
            } else {
                $header.style.transform = 'translate3d(0, 0, 0)'
                if (!$ribbon) return

                if (scrollY < 99) {
                    $ribbon.style.position = 'static'
                    $ribbon.style.transform = 'translate3d(0, 0, 0)'
                } else {
                    $ribbon.style.transform = 'translate3d(0, -100%, 0)'
                    $ribbon.style.position = 'absolute'
                }

                lastScrollY = scrollY
            }
        }

        /**
         * Update header transform
         * @returns sets scroll direction state
         */
        const updateHeaderTransform = () => {
            const { scrollY } = window

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                isHeaderUpdateQueued = false
                return
            }

            isHeaderUpdateQueued = false
            if (scrollY < 0) {
                lastScrollY = 0
                return
            }
            if (scrollY > lastScrollY) {
                $header.style.transform = 'translate3d(0, -100%, 0)'
            } else {
                $header.style.transform = 'translate3d(0, 0, 0)'
                if ($ribbon) $ribbon.style.position = 'static'
            }

            lastScrollY = scrollY
        }

        window.addEventListener('scroll', handleOnScroll)

        return () => {
            window.removeEventListener('scroll', handleOnScroll)
        }
    }, [])

    /**
     * Setting the padding-top dynamically based on clientHeight of header
     */
    useEffect(() => {
        const $contentArea = document.getElementById('contentarea')
        const headerClientHeight = headerWrapperRef?.current?.clientHeight

        if (!$contentArea) return

        const handleResize = () => {
            if (window.innerWidth > 767 && headerClientHeight) {
                $contentArea.style.paddingTop = `${headerClientHeight}px`
            } else {
                $contentArea.style.paddingTop = '0'
            }
        }

        window.addEventListener('resize', handleResize)

        if (!headerClientHeight || window.innerWidth < 768) return

        $contentArea.style.paddingTop = `${headerClientHeight}px`

        return () => window.removeEventListener('resize', handleResize)
    }, [headerWrapperRef?.current?.clientHeight])

    useEffect(() => {
        if (
            router?.query?.['mini-cart-open'] ||
            router?.asPath?.includes('mini-cart-open')
        ) {
            openSidebar()
        }
    }, [])

    return (
        <div className={cn(s.root)} id="contentarea">
            <header id="header" className={s.header} ref={headerWrapperRef}>
                <div className={s.ribbon} ref={ribbonRef}>
                    <Ribbon />
                </div>
                <a className={s['skip-to-content']} href="#contentarea">
                    {t('Skip to Content')}
                </a>
                <div className={s['top-bar']}>
                    <div>
                        <BrandLinkWrapper />
                        <SignInOptions className={s['signin-options']} />
                    </div>
                </div>

                <div ref={headerRef} className={s['cart-sidebar-container']}>
                    {isPreviewMode && (
                        <div className="flex h-full w-full">
                            <PreviewButton />
                        </div>
                    )}
                    <Navbar />
                    {displaySidebar && (
                        <div className="md:block hidden">
                            <Sidebar
                                open={displaySidebar}
                                headerRef={headerRef}
                            >
                                <CartSidebarView />
                            </Sidebar>
                        </div>
                    )}
                </div>
            </header>

            {displaySidebar && (
                <div className="md:hidden block">
                    <Sidebar open={displaySidebar} headerRef={headerRef}>
                        <CartSidebarView />
                    </Sidebar>
                </div>
            )}

            <main className={s.main}>
                <AuthWrapper authRequired={authRequired}>
                    {children}
                </AuthWrapper>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
