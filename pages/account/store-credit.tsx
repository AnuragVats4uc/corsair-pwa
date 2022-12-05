import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import AccountLayout from '@components/common/AccountLayout'
import { StoreCredit as StoreCreditPage } from '@corratech/pylot-store-credit'

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

export default function StoreCredit(): JSX.Element {
    return <StoreCreditPage />
}

StoreCredit.Protected = true
StoreCredit.Layout = AccountLayout
