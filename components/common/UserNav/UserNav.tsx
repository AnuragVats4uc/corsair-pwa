import { FC, useEffect } from 'react'
import s from './UserNav.module.scss'
import cn from 'classnames'
import { Button } from '@corratech/pylot-ui'
import { SimpleCartItem } from '@pylot-data/pylotschema'
import { useAccount, useAuthUI } from '@corratech/pylot-auth-manager'
import { useCart } from '@corratech/pylot-cart-manager'
import { useGigyaLogin } from '@pylot-data/hooks/sso-login/use-gigya-login'
import { useTranslation } from 'react-i18next'
import { useUI } from '@corratech/pylot-ui/context'
import { EmptyCart, FullCart, FullCartLight, EmptyCartLight } from '../../icons'
interface Props {
    handleSearchToggle?: (flag: boolean) => void
    className?: string
}

export interface GigyaAccount {
    UID: string
    profile: GigyaProfile
}

interface GigyaProfile {
    email: string
}

const BagIcon = ({
    displaySidebar,
    isCartEmpty
}: {
    displaySidebar: boolean
    isCartEmpty: boolean
}) => {
    if (displaySidebar)
        return isCartEmpty ? <EmptyCartLight /> : <FullCartLight />
    return isCartEmpty ? <EmptyCart /> : <FullCart />
}

const UserNav: FC<Props> = ({ className }) => {
    const { t } = useTranslation()
    const { data: cartData } = useCart()
    const { toggleSidebar, displaySidebar } = useUI()
    const { gigyaLogin } = useGigyaLogin()
    const { displayModal } = useAuthUI()
    const { data } = useAccount()
    const cartItemCountStyle = `${s['cart-count']} ${
        displaySidebar ? '@apply text-black' : '@apply text-white'
    }`
    const bagIconStyle = `${s['bag-btn']} ${
        displaySidebar ? s['bag-btn-light'] : ''
    }`

    const isSignedIn = !!data?.data?.customer

    const cartItemsCount = cartData?.data?.cart?.items?.reduce(
        (itemCount, item) => {
            if (item) {
                return itemCount + (item as SimpleCartItem)?.quantity
            }
            //return 0 to make the itemCount unchanged and prevent NAN return type
            return 0
        },
        0
    )

    const initializeGigya = (screen: string) => {
        return gigya?.accounts?.showScreenSet({
            screenSet: 'Default-RegistrationLogin',
            startScreen: `gigya-${screen}-screen`
        })
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

    /**
     * Used for when a user goes to /account and is not authorized
     * useEffect will handle setting the Gigya screenset to the login form
     */
    useEffect(() => {
        if (!displayModal || isSignedIn) return

        initializeGigya('login')
        addGigyaEventHandlers()
    }, [displayModal])

    const getCartItemsCount = () => {
        if (!cartItemsCount) return null
        return cartItemsCount > 9 ? '9+' : cartItemsCount
    }

    return (
        <nav className={cn(s.root, className)}>
            <ul className={s.list}>
                <li className={`${s.item} ${s['bag-btn-container']}`}>
                    <Button
                        className={bagIconStyle}
                        variant="link"
                        onClick={toggleSidebar}
                        disabled={!cartItemsCount}
                        aria-label={t('Bag')}
                    >
                        <BagIcon
                            displaySidebar={displaySidebar}
                            isCartEmpty={cartItemsCount === 0}
                        />
                        <span className={cartItemCountStyle}>
                            {getCartItemsCount()}
                        </span>
                    </Button>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav
