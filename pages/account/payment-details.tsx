import AccountLayout from '@components/common/AccountLayout'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { AccountHeader } from '@corratech/pylot-account-header'
import { useTranslation } from 'next-i18next'

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

export default function PaymentDetails(): JSX.Element {
    const { t } = useTranslation(['account'])
    return (
        <div>
            <AccountHeader
                title={t('account||paymentDetails|Payment Details')}
            />
        </div>
    )
}

PaymentDetails.Protected = true
PaymentDetails.Layout = AccountLayout
