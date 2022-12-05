import { SEO } from '@corratech/corsair-seo'
import { useTranslation } from 'next-i18next'
import { Component404 } from './404'
import { socialDefaultContent } from '@config/seo/defaultContents'
import type { Interface404ParsedEntries } from 'pages/404'

export const NotFound = ({
    pageContent
}: Interface404ParsedEntries): JSX.Element | null => {
    const { t } = useTranslation(['common'])

    return (
        <>
            <SEO
                titleOverride={t('404|Page not found')}
                socialDefaultContent={socialDefaultContent}
            />
            <Component404 pageContent={pageContent} />
        </>
    )
}
