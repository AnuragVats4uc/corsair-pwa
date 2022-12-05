import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { CTAType } from '@pylot-data/hooks/contentful/use-content-json'

export type CTAProps = {
    cta: CTAType
    className?: string
    showDisplayText?: boolean
    rightIcon?: React.ReactElement
    rightIconClassName?: string
    isLearnMoreBtn?: boolean
}

const CTA: FC<CTAProps> = ({
    cta = {},
    className,
    children,
    showDisplayText = true,
    rightIcon,
    isLearnMoreBtn = false,
    rightIconClassName
}) => {
    const { t } = useTranslation(['common'])
    return (
        <div className="flex items-center">
            <a
                href={cta.url}
                target={cta.openInANewTab ? '_blank' : ''}
                rel="noreferrer"
                className={className}
            >
                {isLearnMoreBtn
                    ? t('Learn more')
                    : showDisplayText && cta.displayText}
                {children}
            </a>
            <span className={rightIconClassName}>{rightIcon}</span>
        </div>
    )
}

export default CTA
