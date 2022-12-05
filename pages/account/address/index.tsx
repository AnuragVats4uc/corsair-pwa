import AccountLayout from '@components/common/AccountLayout'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { Address as AddressPage } from '@corratech/corsair-address-book'

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

export default function Address(): JSX.Element {
    return <AddressPage />
}

Address.Protected = true
Address.Layout = AccountLayout
