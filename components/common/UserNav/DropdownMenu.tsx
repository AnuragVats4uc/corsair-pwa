import React, { FC, useRef, useState, useEffect } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import s from './DropdownMenu.module.css'
import { User, Moon, Sun } from '@components/icons'
import { useUI } from '@corratech/pylot-ui/context'
import { ClickOutside } from '@corratech/pylot-utils'
import { useTranslation } from 'next-i18next'
import { useUser, useLogout } from '@corratech/pylot-auth-manager'
import { useStoreConfig } from '@config/hooks/useStoreConfig'

import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock'

interface DropdownMenuProps {
    open?: boolean
}

const DropdownMenu: FC<DropdownMenuProps> = () => {
    const { t } = useTranslation('common')
    const { logout } = useLogout()
    const { pathname } = useRouter()
    const { theme, setTheme } = useTheme()
    const [display, setDisplay] = useState(false)
    const { closeSidebarIfPresent } = useUI()
    const ref = useRef() as React.MutableRefObject<HTMLUListElement>
    const { customer } = useUser()
    const config = useStoreConfig()
    const LINKS = [
        {
            name: 'My Account',
            href: '/account',
            enable: true
        },
        {
            name: 'My Orders',
            href: '/account/orders',
            enable: true
        },
        {
            name: 'Store Credit',
            href: '/account/store-credit',
            enable: true
        }
    ]

    useEffect(() => {
        if (ref.current) {
            if (display) {
                disableBodyScroll(ref.current)
            } else {
                enableBodyScroll(ref.current)
            }
        }
        return () => {
            clearAllBodyScrollLocks()
        }
    }, [display])

    return (
        <ClickOutside active={display} onClick={() => setDisplay(false)}>
            <div className="flex">
                <button
                    className={s.avatarButton}
                    onClick={() => setDisplay(!display)}
                    aria-label={t('auth|Menu')}
                >
                    <User />
                </button>
                {display && (
                    <ul
                        className={cn(s['dropdownMenu'], 'animate-fade-in-up')}
                        ref={ref}
                    >
                        <li className={s['welcome-message']}>
                            {`${t('Welcome back')} ${customer?.firstname}!`}
                        </li>
                        {LINKS.map(({ name, href, enable }) => (
                            <>
                                {enable && (
                                    <li key={name + href}>
                                        <div>
                                            <Link href={href}>
                                                <span
                                                    className={cn(s.link, {
                                                        [s.active]:
                                                            pathname === href
                                                    })}
                                                    onClick={() => {
                                                        setDisplay(false)
                                                        closeSidebarIfPresent()
                                                    }}
                                                    aria-hidden="true"
                                                >
                                                    {name}
                                                </span>
                                            </Link>
                                        </div>
                                    </li>
                                )}
                            </>
                        ))}
                        <li>
                            <div
                                className={cn(s.link, 'justify-between')}
                                onClick={() => {
                                    setTheme(
                                        theme === 'dark' ? 'light' : 'dark'
                                    )
                                    setDisplay(false)
                                }}
                                aria-hidden="true"
                            >
                                <div>
                                    {t('auth|Theme')}: <strong>{theme}</strong>{' '}
                                </div>
                                <div className="ml-3">
                                    {theme == 'dark' ? (
                                        <Moon width={20} height={20} />
                                    ) : (
                                        <Sun width="20" height={20} />
                                    )}
                                </div>
                            </div>
                        </li>
                        <li>
                            <span
                                className={cn(
                                    s.link,
                                    'border-t border-accents-2'
                                )}
                                onClick={() => logout()}
                                aria-hidden="true"
                            >
                                {t('auth|Logout')}
                            </span>
                        </li>
                    </ul>
                )}
            </div>
        </ClickOutside>
    )
}

export default DropdownMenu
