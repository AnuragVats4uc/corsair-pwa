import AccountLayout from '@components/common/AccountLayout'
import { useUser } from '@corratech/pylot-auth-manager'
import { useCountries } from '@corratech/pylot-utils'
import type {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
    AccountHeader,
    AccountSubHeader
} from '@corratech/pylot-account-header'
import { InformationCard } from '@corratech/pylot-account-information'
import { DefaultAddress } from '@corratech/corsair-address-book'
import { useUI } from '@corratech/pylot-ui/context'
import s from '@pagestyles/Account.module.scss'
import { WelcomeMessage } from '@components/WelcomeMessage'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import { CmsBlock } from '@pylot-data/pylotschema'
import { SEO } from '@corratech/corsair-seo'
import { socialDefaultContent } from '@config/seo/defaultContents'

const WELCOME_MESSAGE_IDENTIFIER = 'account-welcome-message'

export const getStaticProps: GetStaticProps = async ({
    locale
}: GetStaticPropsContext) => {
    try {
        const welcomeMessageData = await getContentJson<CmsBlock>({
            queryVariables: {
                identifier: [WELCOME_MESSAGE_IDENTIFIER],
                contentType: 'cmsBlock'
            },
            locale: locale
        })

        return {
            props: {
                welcomeMessageData,
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

export default function Account({
    welcomeMessageData
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    const { loading, customer, addresses, isSubscribed } = useUser()
    const { countryNameLocale } = useCountries()

    const { LoadingIndicator } = useUI()
    const { t } = useTranslation(['account'])

    if (loading) {
        return (
            <div className="mx-auto max-w-xs">
                <LoadingIndicator />
            </div>
        )
    }

    return (
        <>
            <SEO socialDefaultContent={socialDefaultContent} />
            <div className={s['account-container']}>
                <AccountHeader title={t('account|My Dashboard')} />
                <div className={s['account-block']}>
                    <AccountSubHeader
                        subHeading={t(
                            'account|Hello {{ firstName }} {{ lastName }},',
                            {
                                firstName: customer?.firstname,
                                lastName: customer?.lastname
                            }
                        )}
                    />
                    <WelcomeMessage
                        initialBlockData={welcomeMessageData}
                        blockIdentifier={WELCOME_MESSAGE_IDENTIFIER}
                    />
                </div>
                <div className={s['account-block']}>
                    <AccountSubHeader
                        subHeading={t('account|Account Information')}
                    />
                    <div className={s['account-block-grid']}>
                        <InformationCard
                            customer={customer!}
                            canEditInfo={false}
                        />
                    </div>
                </div>
                <div className={s['account-block']}>
                    <AccountSubHeader
                        link="/account/address"
                        linkText={t('account|Manage Address')}
                        subHeading={t('account|Address Book')}
                    />
                    <DefaultAddress
                        addresses={addresses}
                        countryNameLocale={countryNameLocale}
                    />
                </div>
            </div>
        </>
    )
}

Account.Protected = true
Account.Layout = AccountLayout
