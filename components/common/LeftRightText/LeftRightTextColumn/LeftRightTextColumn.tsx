import { useEffect, useState } from 'react'
import type { LeftRightTextColumnType } from '../LeftRightText'
import { Subheading } from '../Subheading'
import { Heading } from '../Heading'
import { CopyText } from '../CopyText'
import { Logo } from '../Logo'
import { CTA } from '@components/common/CTA'

import s from './LeftRightTextColumn.module.scss'
import cn from 'classnames'

const c = /*tw*/ {
    leftRightTextColumn: `${s['left-right-text-column']} left-right-text-column block relative`,
    leftRightTextColumnCopyBlock: `left-right-text-column-copy-block mt-8 mb-16`,
    leftRightTextColumnCTA: `${s['left-right-text-column-cta']} left-right-text-column-cta font-medium leading-4 uppercase mb-8 sm:font-semibold`
}

export interface LeftRightTextColumnProps {
    column: LeftRightTextColumnType
    className: string
    fontColor?: string | undefined
}

export const LeftRightTextColumn = ({
    column,
    className,
    fontColor
}: LeftRightTextColumnProps): JSX.Element | null => {
    const [ctaAlignment, setCtaAlignment] = useState<string | undefined>(
        'center'
    )
    const [logoAlignment, setLogoAlignment] = useState<string | undefined>(
        'left'
    )
    const [logoVerticalAlignment, setLogoVerticalAlignment] = useState<
        string | undefined
    >('top')
    const isMobile = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px)').matches

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isMobile()) {
                setCtaAlignment('center')
                setLogoAlignment('center')
            } else {
                setCtaAlignment(
                    column?.ctaAlignment ? column?.ctaAlignment : 'center'
                )
                setLogoAlignment(
                    column?.logoAlignment ? column?.logoAlignment : 'left'
                )
            }
            setLogoVerticalAlignment(
                column?.logoVerticalAlignment
                    ? column?.logoVerticalAlignment
                    : 'top'
            )
        }
    }, [column])

    if (!column) return null

    return (
        <div
            className={cn(c.leftRightTextColumn, s[className])}
            style={{
                alignSelf:
                    logoVerticalAlignment === 'top' ? 'flex-start' : 'flex-end'
            }}
        >
            {column?.logo && logoVerticalAlignment === 'top' && (
                <Logo logo={column?.logo} logoAlignment={logoAlignment} />
            )}
            {(column?.heading || column?.subheading || column?.copyText) && (
                <div className={c.leftRightTextColumnCopyBlock}>
                    {column?.subheading && (
                        <Subheading subheading={column?.subheading} />
                    )}
                    {column?.heading && (
                        <Heading
                            heading={column?.heading}
                            headingTag={column?.headingTag}
                            fontColor={fontColor}
                        />
                    )}
                    {column?.copyText && (
                        <CopyText
                            copyText={column?.copyText}
                            fontColor={fontColor}
                        />
                    )}
                </div>
            )}
            {column?.logo && logoVerticalAlignment === 'bottom' && (
                <Logo logo={column?.logo} logoAlignment={logoAlignment} />
            )}
            {column?.cta && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: `${ctaAlignment}`
                    }}
                    className={s[column?.ctaType || 'primary']}
                >
                    <CTA
                        cta={column?.cta}
                        className={c.leftRightTextColumnCTA}
                    />
                </div>
            )}
        </div>
    )
}
