import { LANGUAGE_CODES_MAP, REGION_CODES_MAP } from 'localesConfig'

import { LocalePicker } from '../LocalePicker/LocalePicker'
import { Newsletter } from '../Newsletter'
import React from 'react'
import Image from 'next/image'
import s from '@commonStyles/footer/Footer.module.scss'
import { useTranslation } from 'react-i18next'
import {
    ImageLinkType,
    CTAType,
    useContentJson
} from '@pylot-data/hooks/contentful/use-content-json'
import Link from 'next/link'
import cn from 'classnames'

const CONTENT_IDENTIFIER = ['footer']
const CONTENT_TYPE = 'footer'

interface ColumnType {
    heading: string
    items: CTAType[]
    type: string
}

interface NewsletterType {
    title: string
    description: CTAType[]
}

interface FooterData {
    columns: ColumnType[]
    copyrightLinks: CTAType[]
    copyrightText: string
    indentifier: string
    newsletter: NewsletterType
    showCookieSettings: boolean
    sociallinks: ImageLinkType[]
    textFirstColumn: string
    title: string
}

const Footer = (): JSX.Element | null => {
    const { t } = useTranslation()

    const { data } = useContentJson<FooterData>(
        {
            identifier: CONTENT_IDENTIFIER,
            contentType: CONTENT_TYPE,
            options: {
                level: 2
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true
        }
    )

    if (!data) {
        return null
    }

    const {
        columns,
        copyrightLinks,
        copyrightText,
        showCookieSettings,
        sociallinks,
        textFirstColumn
    } = data[0].parsedEntries

    const SocialLinks = (): JSX.Element => (
        <div className={s['social']}>
            {sociallinks?.length > 0 &&
                sociallinks.map((logo: ImageLinkType) => {
                    return (
                        <a
                            key={logo.title}
                            title={logo.title}
                            href={logo.url}
                            target={logo.newTab ? '_blank' : '_self'}
                            rel="noreferrer"
                        >
                            <Image
                                src={logo.image.file.url}
                                alt={logo.title}
                                height={22}
                                width={22}
                                className={s['logo']}
                            />
                        </a>
                    )
                })}
        </div>
    )

    const Columns = (): JSX.Element => (
        <div className={s['links-cols']}>
            {columns?.length &&
                columns.map((column: ColumnType) => {
                    return (
                        column.type === 'Footer Column' && (
                            <div className={s['column']} key={column.heading}>
                                <h3>{column.heading}</h3>
                                {column.items.map((urlData: CTAType) => {
                                    return (
                                        <a
                                            key={urlData.displayText}
                                            href={urlData.url}
                                            title={urlData.displayText}
                                        >
                                            {urlData.displayText}
                                        </a>
                                    )
                                })}
                            </div>
                        )
                    )
                })}
        </div>
    )

    const CopyrightAndLinks = (): JSX.Element => (
        <div className={s['links']}>
            {copyrightText}
            <div>
                {copyrightLinks &&
                    copyrightLinks.map((urlData: CTAType) => {
                        return (
                            <Link key={urlData.displayText} href={urlData.url}>
                                {urlData.displayText}
                            </Link>
                        )
                    })}
                {showCookieSettings && (
                    <span className="ot-sdk-show-settings">
                        {t('Cookie Settings')}
                    </span>
                )}
            </div>
        </div>
    )

    return (
        <footer className={s.footer}>
            <div>
                <div className={s['footer-container']}>
                    <div className={s['grid-rows']}>
                        <Columns />
                        <div className={s['news-social-container']}>
                            <Newsletter />
                            <SocialLinks />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    s['footer-copyright-block-wrapper'],
                    'absolute w-full bg-black left-0'
                )}
            >
                <div className={cn(s['footer-copyright-block'])}>
                    <div className={s['location']}>
                        <LocalePicker
                            langMap={LANGUAGE_CODES_MAP}
                            regionMap={REGION_CODES_MAP}
                        />
                    </div>

                    <div className={s['copyright']}>
                        <CopyrightAndLinks />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
