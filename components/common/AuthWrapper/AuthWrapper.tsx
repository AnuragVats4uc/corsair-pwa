import { FC, useEffect } from 'react'
import { useUser, useAuthUI } from '@corratech/pylot-auth-manager'
import { useUI } from '@corratech/pylot-ui/context'
import { useRouter } from 'next/router'

type PropTypes = {
    authRequired: boolean
}

const AuthWrapper: FC<PropTypes> = ({ authRequired, children }) => {
    const { isSignedIn, loading } = useUser()
    const { LoadingIndicator } = useUI()
    const router = useRouter()
    const { openAuthModal } = useAuthUI()

    useEffect(() => {
        if (!loading && !isSignedIn && authRequired) {
            //open modal for guest user after redirection to home
            router.push('/').then(() => {
                openAuthModal()
            })
        }
    }, [loading, isSignedIn])

    //consider loading state for only protected routes
    if (loading && authRequired) {
        return (
            <div className="mx-auto max-w-xs">
                <LoadingIndicator />
            </div>
        )
    }

    //Authentication error handler
    if (!isSignedIn && authRequired) return null

    return <>{children}</>
}

export default AuthWrapper
