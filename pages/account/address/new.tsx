import AccountLayout from '@components/common/AccountLayout'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { NewAddress as NewAddressPage } from '@corratech/corsair-address-book'

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

export default function NewAddress(): JSX.Element {
    return <NewAddressPage />
}

NewAddress.Protected = true
NewAddress.Layout = AccountLayout
