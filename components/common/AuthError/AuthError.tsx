import { useTranslation } from 'next-i18next'

export const AuthError = () => {
    const { t } = useTranslation(['common'])

    return (
        <div className="text-center mt-5">
            <h2>{t('Please sign in to access the page')}</h2>
        </div>
    )
}
