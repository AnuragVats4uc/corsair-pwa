import AccountLayout from '@components/common/AccountLayout'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { useEffect } from 'react'

export const getStaticProps: GetStaticProps = async ({
    locale
}: GetStaticPropsContext) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'account']))
        },
        revalidate: 14400
    }
}

export default function AccountInformation(): JSX.Element {
    useEffect(() => {
        gigya?.accounts?.showScreenSet({
            screenSet: 'Default-ProfileUpdate',
            startScreen: 'gigya-update-profile-screen',
            containerID: 'gigyaAccountWrapper'
        })
    })

    return <div id="gigyaAccountWrapper" />
}

AccountInformation.Protected = true
AccountInformation.Layout = AccountLayout
