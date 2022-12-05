import React, { FC, Fragment, useMemo } from 'react'
import Link from 'next/link'
import { LogOut } from 'react-feather'
import { useTranslation } from 'next-i18next'
import { Button } from '@corratech/pylot-ui'
import cn from 'classnames'
import s from '@pagestyles/Account.module.scss'
import { useRouter } from 'next/router'
import { useStoreConfig } from '@config/hooks/useStoreConfig'
import { useLogout } from '@corratech/pylot-auth-manager'

export const AccountSidebar: FC = () => {
    const { t } = useTranslation(['account'])
    const router = useRouter()
    const config = useStoreConfig()
    const { logout } = useLogout()
    const sideBarConfig = [
        {
            name: t('account||sidebar|Account DashBoard'),
            path: '/account',
            enable: true
        },
        {
            name: t('account||sidebar|Account Information'),
            path: '/account/account-information',
            enable: true
        },
        {
            name: t('account||sidebar|Address Book'),
            path: '/account/address',
            enable: config.base.wishlist.enabled
        },
        {
            name: t('account||sidebar|Payment Details'),
            path: '/account/payment-details',
            enable: false
        },
        {
            name: t('account||sidebar|My Orders'),
            path: '/account/orders',
            enable: true
        },
        {
            name: t('account||sidebar|XP Care'),
            path: '/account/xp-care',
            enable: false
        },
        {
            name: t('account||sidebar|Support Tickets'),
            path: '/account/support-tickets',
            enable: false
        },
        {
            name: t('account||sidebar|Gift Card'),
            path: '/account/gift-card',
            enable: false
        },
        {
            name: t('account||sidebar|My Returns'),
            path: '/account/my-returns',
            enable: true
        }
    ]

    //logic to strip account from the url to avoid selection of /account/ page
    const getActiveLinks = (link: string): boolean => {
        const hrefLink = link.replace('/account/', '')
        const routePath = router.pathname.replace('/account/', '')
        return routePath.indexOf(hrefLink) !== -1
    }

    /**
     * Handle logout click
     * @description first we log out of Shopify,
     * @description then we redirect back to the PWA and
     * @description continue to log out of Gigya and the PWA
     * @description view Layout.tsx for PWA and Gigya logout
     */
    const handleLogoutClick = async () => {
        logout()
        router.push(config.base.shopifyUrl)
        if (
            typeof window !== undefined &&
            localStorage.getItem('checkbox-value')
        ) {
            localStorage.removeItem('checkbox-value')
        }
    }

    const sidebarLink = useMemo(() => {
        return sideBarConfig.map((value, index) => (
            <Fragment key={index}>
                {value?.enable && (
                    <li
                        className={cn({
                            [s.active]: getActiveLinks(value.path)
                        })}
                    >
                        <Link href={value.path}>
                            <Button
                                variant="link"
                                className={s['sidebar-links']}
                            >
                                <span className={s['item-name']}>
                                    {value.name}
                                </span>
                            </Button>
                        </Link>
                    </li>
                )}
            </Fragment>
        ))
    }, [getActiveLinks, sideBarConfig])

    return (
        <>
            <h2 className={s['sidebar-title']}>{t('account|My Account')}</h2>
            <div className={cn(s.sidebar)}>
                <div className={s['sidebar-inner']}>
                    <ul>
                        {sidebarLink}
                        <li className={s['signout-list-item']}>
                            <Button
                                variant="link"
                                className={s['signout-link']}
                                onClick={handleLogoutClick}
                            >
                                <LogOut size={22} />
                                {t('account|Sign Out')}
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
