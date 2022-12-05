import AccountLayout from '@components/common/AccountLayout'
import { GiftCardAccountPage } from '@corratech/pylot-giftcard-account'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'

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

export default function GiftCard(): JSX.Element {
    return <GiftCardAccountPage />
}

GiftCard.Protected = true
GiftCard.Layout = AccountLayout
