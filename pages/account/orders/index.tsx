import type {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import AccountLayout from '@components/common/AccountLayout'
import { Orders as OrdersPage } from '@corratech/corsair-orders'
import { useTranslation } from 'next-i18next'
import { AccountHeader } from '@corratech/pylot-account-header'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import { CmsBlock } from '@pylot-data/pylotschema'

const ACCOUNT_ORDER_NOTE = 'account-order-list-note'

export const getStaticProps: GetStaticProps = async ({
    locale
}: GetStaticPropsContext) => {
    try {
        const orderNoteData = await getContentJson<CmsBlock>({
            queryVariables: {
                identifier: [ACCOUNT_ORDER_NOTE],
                contentType: 'cmsBlock'
            },
            locale: locale
        })
        return {
            props: {
                orderNoteData,
                ...(await serverSideTranslations(locale!, [
                    'common',
                    'account'
                ]))
            },
            revalidate: 14400
        }
    } catch (e) {
        console.log(`Error: Generating welcome message ${e}`)
        return {
            props: {
                ...(await serverSideTranslations(locale!, [
                    'common',
                    'account'
                ]))
            },
            revalidate: 14400
        }
    }
}

export default function Orders({
    orderNoteData
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    const { t } = useTranslation(['account'])

    return (
        <>
            <AccountHeader title={t('account||account|Order History')} />
            <OrdersPage
                initialBlockData={orderNoteData}
                orderListNoteIdentifier={ACCOUNT_ORDER_NOTE}
            />
        </>
    )
}

Orders.Protected = true
Orders.Layout = AccountLayout
