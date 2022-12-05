import { GIGYA_LOGIN_MULTIPASS } from './graphql/gigyaLoginMultipass'
import { graphqlFetch } from '@pylot-data/graphqlFetch'
import { useRouter } from 'next/router'

export type UseGigyaLoginMultipassReturnType = {
    gigyaLoginMultipass: (user: GigyaLoginMultipassInterface) => Promise<any>
}

interface GigyaLoginMultipassInterface {
    uid: string
    email: string
    url?: string
}

export const useGigyaLoginMultipass = (): UseGigyaLoginMultipassReturnType => {
    const { locale } = useRouter()

    const gigyaLoginMultipass = async (user: GigyaLoginMultipassInterface) => {
        const response = await graphqlFetch({
            query: GIGYA_LOGIN_MULTIPASS,
            variables: {
                input: user
            },
            locale
        })

        if (response?.errors?.length) {
            throw new Error(`Error: ${response?.errors.join(',')}`)
        }

        return response
    }

    return {
        gigyaLoginMultipass
    }
}
