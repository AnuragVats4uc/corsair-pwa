import { FC, useEffect } from 'react'
import s from './SignInOptions.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { User } from '@components/icons'
import { Button } from '@corratech/pylot-ui'
import { useAccount, useAuthUI } from '@corratech/pylot-auth-manager'
import { useGigyaLogin } from '@pylot-data/hooks/sso-login/use-gigya-login'
import { useTranslation } from 'react-i18next'
import { useLogout } from '@corratech/pylot-auth-manager'

interface Props {
    className?: string
}

export interface GigyaAccount {
    UID: string
    profile: GigyaProfile
}

interface GigyaProfile {
    email: string
}

const SignInOptions: FC<Props> = ({ className }) => {
    const { t } = useTranslation()
    const { gigyaLogin, removeGigyaUID } = useGigyaLogin()
    const { displayModal } = useAuthUI()
    const { data } = useAccount()
    const { logout } = useLogout()

    const isSignedIn = !!data?.data?.customer

    const initializeGigya = (screen: string) => {
        return gigya?.accounts?.showScreenSet({
            screenSet: 'Default-RegistrationLogin',
            startScreen: `gigya-${screen}-screen`,
            onFieldChanged: handleCheckbox
        })
    }

    const handleCheckbox = (event: GigyaEventObjects) => {
        if (event.field === 'remember' && typeof window !== undefined) {
            localStorage.setItem('checkbox-value', JSON.stringify(event.value))
        }
    }

    const addGigyaEventHandlers = () => {
        return gigya?.accounts?.addEventHandlers({
            onLogin: async (account: GigyaAccount) => {
                const { UID: uid, profile } = account
                const { email } = profile

                const user = { uid, email }

                await gigyaLogin(user)
            },
            onError: (error: string) => {
                console.error({ error })
            }
        })
    }

    const handleGigyaClick = (screen: string) => {
        const gigyaScriptTag = document.getElementById('gigya')

        if (!gigyaScriptTag) return

        initializeGigya(screen)
        addGigyaEventHandlers()

        if (
            !isSignedIn &&
            localStorage.getItem('checkbox-value') &&
            typeof window !== undefined
        ) {
            localStorage.removeItem('checkbox-value')
        }
    }

    /**
     * Used for when a user goes to /account and is not authorized
     * useEffect will handle setting the Gigya screenset to the login form
     */
    useEffect(() => {
        if (!displayModal || isSignedIn) return

        initializeGigya('login')
        addGigyaEventHandlers()
    }, [displayModal])

    useEffect(() => {
        const userPersist = () => {
            const getCheckboxValue = localStorage.getItem(
                'checkbox-value'
            ) as string
            const parsedCheckboxValue = JSON.parse(getCheckboxValue)
            if (parsedCheckboxValue === false || !getCheckboxValue) {
                if (isSignedIn) {
                    logout()
                    removeGigyaUID()
                    localStorage.removeItem('checkbox-value')
                }
            }
        }
        if (typeof window !== undefined) {
            window.addEventListener('beforeunload', userPersist)
        }

        return () => {
            if (typeof window !== undefined) {
                window.removeEventListener('beforeunload', userPersist)
            }
        }
    })

    return (
        <nav className={cn(s.root, className)}>
            <ul className={s.list}>
                {isSignedIn ? (
                    <li className={cn(s.item, s['auth-links'])}>
                        <User width={20} height={20} />
                        <Link href="/account">{t('auth|My Account')}</Link>
                    </li>
                ) : (
                    <>
                        <li className={cn(s.item, s['auth-links'])}>
                            <Button
                                onClick={() => handleGigyaClick('login')}
                                variant="link"
                            >
                                {t('auth|Sign In')}
                            </Button>
                        </li>
                        <li className={cn(s.item, s['auth-links'])}>
                            <Button
                                onClick={() => handleGigyaClick('register')}
                                variant="link"
                            >
                                {t('auth|Join Us')}
                            </Button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default SignInOptions
