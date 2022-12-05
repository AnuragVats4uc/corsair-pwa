import { GIGYA_LOGIN } from './graphql/gigyaLogin'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import { useAccount, useAuthUI } from '@corratech/pylot-auth-manager'
import { useCart, mergeCarts } from '@corratech/pylot-cart-manager'
import { useRouter } from 'next/router'
import { useState } from 'react'

export type UseGigyaLoginReturnType = {
    isLoading: boolean
    gigyaLogin: (user: GigyaLoginInterface) => Promise<any>
    removeGigyaUID: () => void
}

export type GigyaLoginInputArgs = {
    input: GigyaLoginInterface
}

export type GigyaLoginOutput = {
    gigyaLogin: {
        accessToken: string
    }
}

interface GigyaLoginInterface {
    uid: string
    email: string
}

export const useGigyaLogin = (): UseGigyaLoginReturnType => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { locale } = useRouter()
    const { loginCallbacks, clearAuthCallback } = useAuthUI()
    const { mutate: fetchAccountInfo } = useAccount()
    const { mutate: updateCart } = useCart()

    const gigyaLogin = async (user: GigyaLoginInterface) => {
        setIsLoading(true)

        const response = await graphqlFetch<
            GigyaLoginInputArgs,
            GigyaLoginOutput
        >({
            query: GIGYA_LOGIN,
            variables: {
                input: user
            },
            locale
        })

        if (response?.errors?.length) {
            throw new Error(`Error: ${response?.errors.join(',')}`)
        }

        localStorage.setItem(
            'pylot_token',
            response?.data?.gigyaLogin?.accessToken
        )

        localStorage.setItem('gigya_uid', user.uid)

        const result = await Promise.all([
            fetchAccountInfo(),
            mergeCarts({
                guestCartId: localStorage.getItem('cart_id')!,
                locale
            }).then((res) => updateCart(res, false))
        ])

        setIsLoading(false)

        if (loginCallbacks.length) {
            loginCallbacks.forEach((callback: () => void) => {
                if (typeof callback === 'function') {
                    callback()
                }
            })
            clearAuthCallback('LOGIN_VIEW')
        }

        return result
    }

    const removeGigyaUID = () => {
        const params = { UID: localStorage.getItem('gigya_uid') }

        gigya?.accounts?.logout(params)
        localStorage.removeItem('gigya_uid')
    }

    return {
        isLoading,
        gigyaLogin,
        removeGigyaUID
    }
}
