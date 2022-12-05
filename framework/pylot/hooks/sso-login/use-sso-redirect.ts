import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@corratech/pylot-auth-manager'
import { useMultipassToken } from './use-multipass-token'
import { useSsoLogin } from './use-sso-login'
import { canRedirectWithMultipass } from './utils/canRedirectWithMultipass'

export type UseSsoRedirectReturnType = {
    isRedirecting: boolean
}

export const tokenQueryParam = 'redirectKey'

export const useSsoRedirect = (): UseSsoRedirectReturnType => {
    const router = useRouter()
    const multipass = router?.query[tokenQueryParam]
    const { isSignedIn } = useUser()
    const { isLoading, getSsoRedirectionUrl } = useMultipassToken()
    const { ssoLoginWithMultipass } = useSsoLogin()

    useEffect(() => {
        //check if the application has SSO login
        if (multipass) ssoLoginWithMultipass(multipass as string)

        //global event to intercept the anchor click before redirection
        if (typeof document !== 'undefined') {
            document.addEventListener('click', ssoUrlRedirectionResolver)
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.removeEventListener('click', ssoUrlRedirectionResolver)
            }
        }
    }, [isSignedIn, multipass])

    //decide on redirection
    const ssoUrlRedirectionResolver = async (e: MouseEvent) => {
        const origin = (e.target as Element)?.closest('a')

        if (!isSignedIn || !origin || !origin?.href) return

        const url = origin.href

        if (canRedirectWithMultipass(url) && typeof window !== 'undefined') {
            e.preventDefault()
            //need to open the window immediately to prevent the browser showing popup block
            const win = window.open('about:blank', '_blank')

            //fetch the url async
            const redirectUrl = await getSsoRedirectionUrl(url, tokenQueryParam)

            //set the redirection url after the window popup is opened
            win!.location.href = redirectUrl
        }
    }

    //loading indicator while multipass token generates
    return {
        isRedirecting: isLoading
    }
}
