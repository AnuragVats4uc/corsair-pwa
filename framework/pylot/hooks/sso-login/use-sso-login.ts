import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import { useUI, ToastType } from '@corratech/pylot-ui/context'
import { useAuthUI, useAccount } from '@corratech/pylot-auth-manager'
import { useCart, mergeCarts } from '@corratech/pylot-cart-manager'
import { MULTIPASS_LOGIN } from './graphql/multipassLogin'
import { tokenQueryParam } from './use-sso-redirect'
import { useGigyaLoginMultipass } from './use-gigya-login-multipass'
import createHash from 'create-hash'
import { useStoreConfig } from '@config/hooks/useStoreConfig'

export type UseSsoLoginReturnType = {
    isLoading: boolean
    generateCustomerToken: (multipass: string) => Promise<string>
    ssoLoginWithMultipass: (multipass: string) => Promise<void>
}

export type MultipassLoginInputArgs = {
    multipassToken: string
}

export type MultipassLoginOutput = {
    multipassLogin: {
        accessToken: string
    }
}

export const useSsoLogin = (): UseSsoLoginReturnType => {
    const { t } = useTranslation()
    const { locale, ...router } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: fetchAccountInfo, data } = useAccount()
    const { mutate: updateCart } = useCart()
    const { gigyaLoginMultipass } = useGigyaLoginMultipass()
    const { loginCallbacks, clearAuthCallback } = useAuthUI()
    const { openToast } = useUI()
    const config = useStoreConfig()

    const setCid = (): void => {
        // This sets CID to local storage to be used by getRequestHeaders
        if (typeof window !== 'undefined') {
            if (data) {
                const cid = window.localStorage.getItem('cid') ?? null
                const email = data.data.customer?.email
                if (!cid && email) {
                    const hash = createHash('sha256')
                    hash.update(email)
                    const result = hash.digest('base64')
                    window.localStorage.setItem('cid', result)
                }
            }
        }
    }

    useEffect(() => {
        setCid()
    }, [data])

    /**
     * Generate the customer access token using multipass
     * @param multipass string
     * @returns
     */
    const generateCustomerToken = async (multipass: string) => {
        const response = await graphqlFetch<
            MultipassLoginInputArgs,
            MultipassLoginOutput
        >({
            query: MULTIPASS_LOGIN,
            variables: {
                multipassToken: multipass
            },
            locale
        })

        if (response?.errors?.length) {
            throw new Error(`Error: ${response?.errors.join(',')}`)
        }

        return response?.data?.multipassLogin?.accessToken
    }

    /**
     * Login the customer using multipass
     * @param multipass string
     * @returns void
     */
    const ssoLoginWithMultipass = async (multipass: string) => {
        setIsLoading(true) //set loading state
        try {
            const token = await generateCustomerToken(multipass)

            if (!token) {
                setIsLoading(false)
                throw new Error(`Failed to login`)
            }
            //set the token on localStorage
            localStorage.setItem('pylot_token', token)

            await Promise.all([
                fetchAccountInfo(),
                mergeCarts({
                    guestCartId: localStorage.getItem('cart_id')!,
                    locale
                }).then((res) => updateCart(res, false))
            ])
            setIsLoading(false)
            //Login callback
            if (loginCallbacks.length) {
                loginCallbacks.forEach((callback) => {
                    if (typeof callback === 'function') {
                        callback()
                    }
                })
                clearAuthCallback('LOGIN_VIEW')
            }
        } catch (e) {
            openToast(
                t('auth|Failed to login. Please try again.'),
                ToastType.Danger
            )
            setIsLoading(false)
        }

        resetMultipassQueryParams()
    }

    /**
     * Remove the multipass query token from the url after login / failure
     * Object destructuring with rest syntax
     */
    const resetMultipassQueryParams = async () => {
        const query = router?.query

        if (query[tokenQueryParam]) {
            const { [tokenQueryParam]: removedProperty, ...queryReset } = query
            const { redirectsToCheckout } = query

            router.push(
                {
                    href: router.pathname,
                    query: queryReset
                },
                undefined,
                { shallow: true }
            )

            if (redirectsToCheckout) {
                const { email, uid, checkoutPathname } = query

                if (typeof uid !== 'string' || typeof email !== 'string') return

                const shopifyUrl = config.base.shopifyUrl

                const productionCheckoutUrl = `${shopifyUrl}${checkoutPathname}`

                const response = await gigyaLoginMultipass({
                    uid,
                    email,
                    url: productionCheckoutUrl
                })

                const { token } = response?.data?.gigyaLoginMultipass

                if (token) {
                    const productionSignInUrl = `${shopifyUrl}/account/login/multipass/${token}`

                    window.location.href = productionSignInUrl
                }
            }
        }
    }
    return {
        isLoading,
        generateCustomerToken,
        ssoLoginWithMultipass
    }
}
