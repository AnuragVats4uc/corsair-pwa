import AccountLayout from '@components/common/AccountLayout'
import type {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths
} from 'next'
import { OrderView as OrderViewPage } from '@corratech/corsair-orders/src/OrderView'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'

export type orderDetailId = {
    view: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: ['/account/orders/view'],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({
    params,
    locale
}: GetStaticPropsContext) => {
    const views = params?.view!
    const view = views[views.length - 1] //last param
    return {
        props: {
            view: view,
            ...(await serverSideTranslations(locale!, ['common', 'account']))
        },
        revalidate: 14400
    }
}

export default function OrderView({ view }: orderDetailId): JSX.Element {
    return <OrderViewPage view={view} />
}

OrderView.Protected = true
OrderView.Layout = AccountLayout
