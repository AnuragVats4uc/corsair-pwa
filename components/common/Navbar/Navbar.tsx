import { FC, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import s from './Navbar.module.scss'
import { Container } from '@corratech/pylot-ui'
import { Button } from '@corratech/pylot-ui'
import { Logo } from '@components/common/Logo'
import { UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import { useTranslation } from 'next-i18next'
import { useUI } from '@corratech/pylot-ui/context'
import BrandLinkWrapper from '../BrandLinkWrapper'
import { MegaMenu } from '@corratech/corsair-mega-menu'
import useOutsideRef from '@lib/hooks/useOutsideRef'
import AppBarSearch from '@components/icons/AppBarSearch'
import Searchbar from '../Searchbar'
import { useRouter } from 'next/router'
import { isTransactionalView } from 'helpers'
/**
 * Is used to query element by id and get navbar's height as an offset
 * when scrolling to the target element.
 */
export const NAVBAR_ID = 'navbar'
const CONTENT_TYPE = 'navigation'

const Navbar: FC = () => {
    const [hasScrolled, setHasScrolled] = useState(false)
    const [windowWidth, setWindowWidth] = useState<boolean>()
    const { t } = useTranslation('common')
    const searchBarRef = useRef<HTMLDivElement>(null)
    useOutsideRef(searchBarRef)
    const { displaySearch, toggleSearch } = useUI()

    const router = useRouter()
    const { locale } = router

    useEffect(() => {
        const getWindowWidth = () => {
            setWindowWidth(window.innerWidth < 960)
        }

        const handleScroll = throttle(() => {
            const offset = 0
            const { scrollTop } = document.documentElement
            const scrolled = scrollTop > offset
            setHasScrolled(scrolled)
        }, 200)

        document.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', getWindowWidth, { passive: true })
        return () => {
            window.removeEventListener('resize', getWindowWidth)
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const GoHome = () => (
        <div className={`${s['nav-section']} ${displaySearch && 'pr-4'}`}>
            <Link href="/">
                <span className={s.logo} aria-label={t('back to homepage')}>
                    <Logo />
                </span>
            </Link>
        </div>
    )

    return (
        <header className={s['header']}>
            <div
                className={cn(
                    s.root,
                    hasScrolled && s['shadow-magical'],
                    hasScrolled && 'nav-sticky'
                )}
            >
                <Container id={NAVBAR_ID} clean className={s['nav-container']}>
                    <div className={s['nav-container-inner']}>
                        {windowWidth ? (
                            !displaySearch && <GoHome />
                        ) : (
                            <GoHome />
                        )}
                        {displaySearch && <Searchbar />}

                        {!displaySearch && (
                            <>
                                <div
                                    className={s['nav-right-section']}
                                    style={{ zIndex: displaySearch ? 100 : 50 }}
                                >
                                    <div
                                        className={s['search-section']}
                                        ref={searchBarRef}
                                    >
                                        <Searchbar />
                                        <div
                                            className={cn(
                                                s['icon-container'],
                                                displaySearch && 'sm:bg-white'
                                            )}
                                        >
                                            <Button
                                                variant="link"
                                                onClick={toggleSearch}
                                            >
                                                <AppBarSearch
                                                    className={s['search-icon']}
                                                    height="36.94px"
                                                    fill={
                                                        displaySearch
                                                            ? '#000'
                                                            : '#fff'
                                                    }
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    {isTransactionalView('cart', locale) && (
                                        <UserNav />
                                    )}
                                </div>
                                <MegaMenu
                                    queryVariables={{
                                        identifier: ['mega-menu'],
                                        contentType: CONTENT_TYPE,
                                        options: { level: 4 }
                                    }}
                                    secondaryContent={<BrandLinkWrapper />}
                                />
                            </>
                        )}
                    </div>
                </Container>
            </div>
        </header>
    )
}

export default Navbar
