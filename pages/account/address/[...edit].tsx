import AccountLayout from '@components/common/AccountLayout'
import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext
} from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { EditAddress as EditAddressPage } from '@corratech/corsair-address-book'

export type EditAddressPageType = {
    id: number
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: ['/account/address/edit'],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({
    params,
    locale
}: GetStaticPropsContext) => {
    const ids = params?.edit!
    const id = ids[ids.length - 1] //last param
    return {
        props: {
            id: Number(id),
            ...(await serverSideTranslations(locale!, ['common', 'account']))
        },
        revalidate: 14400
    }
}

export default function EditAddress({ id }: EditAddressPageType): JSX.Element {
    return <EditAddressPage id={id} />
}

EditAddress.Protected = true
EditAddress.Layout = AccountLayout
