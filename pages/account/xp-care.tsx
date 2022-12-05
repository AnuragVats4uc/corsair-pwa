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

export default function XpCare(): JSX.Element {
    const { t } = useTranslation(['account'])
    return (
        <div>
            <AccountHeader title={t('account||xpCare|Xp Care')} />
        </div>
    )
}

XpCare.Protected = true
XpCare.Layout = AccountLayout
