import AccountLayout from '@components/common/AccountLayout'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { AccountNewsletter as NewsletterPage } from '@corratech/pylot-account-newsletter'

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

export default function Newsletter(): JSX.Element {
    return <NewsletterPage />
}

Newsletter.Protected = true
Newsletter.Layout = AccountLayout
