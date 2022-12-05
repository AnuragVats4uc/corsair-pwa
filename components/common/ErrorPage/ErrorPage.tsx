import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export const ErrorPage = () => {
    const { t } = useTranslation(['common'])

    return (
        <div className="page-error-container">
            <h2>{t('Something went wrong!')}</h2>
            <p>
                {t('Please')}{' '}
                <Link href="/">{t('return to our homepage')}</Link>{' '}
                {t('to continue shopping.')}
            </p>
        </div>
    )
}
