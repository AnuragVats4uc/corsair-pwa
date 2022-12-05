import AccountLayout from '@components/common/AccountLayout'
import type {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths
} from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { OrderCancel } from '@corratech/corsair-orders/src/Cancels/OrderCancel'

export type orderDetailId = {
    id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: ['/account/orders/cancelform/id'],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({
    params,
    locale
}: GetStaticPropsContext) => {
    const ids = params?.id!
    const id = ids[ids.length - 1] //last param
    return {
        props: {
            id: id,
            ...(await serverSideTranslations(locale!, ['common', 'account']))
        },
        revalidate: 14400
    }
}

export default function OrderView({ id }: orderDetailId): JSX.Element {
    return <OrderCancel view={id} />
}

OrderView.Protected = true
OrderView.Layout = AccountLayout
