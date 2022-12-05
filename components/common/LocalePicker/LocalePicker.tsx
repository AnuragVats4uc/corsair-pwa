import { useRouter } from 'next/router'
import { useState } from 'react'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import s from './LocalePicker.module.scss'
import cn from 'classnames'

const LocaleSelectWrapper: React.FC = ({ children }) => {
    const [borderRadius, setBorderRadius] = useState(15)
    return (
        <div
            className="select-wrapper"
            onMouseEnter={() => setBorderRadius(6)}
            onMouseLeave={() => setBorderRadius(15)}
            style={{
                cursor: 'pointer',
                padding: '0 8px',
                transition: 'border-radius 500ms',
                display: 'inline-block',
                height: 32,
                marginRight: 10
            }}
        >
            {children}
        </div>
    )
}

const selectStyles: HTMLAttributes<HTMLSelectElement>['style'] = {
    background: '#1e1e1e',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    textTransform: 'uppercase',
    paddingTop: 6
}

const labelStyles: HTMLAttributes<HTMLLabelElement>['style'] = {
    display: 'inline-block',
    marginRight: 10
}

export const LocalePicker: React.FC<{
    langMap: Record<string, string>
    regionMap: Record<string, string>
}> = ({ langMap, regionMap }) => {
    const router = useRouter()
    const { pathname, query, locale } = router
    const { t } = useTranslation('common')

    const currentLangCode = locale?.substring(0, 2)
    const currentRegionCode = locale?.substring(3)
    const queryEntries = Object.entries(query)
    const textQuery =
        queryEntries.length === 0
            ? ''
            : `?${Object.entries(query)
                  .map(([paramName, paramVal]) => `${paramName}=${paramVal}`)
                  .join('&')}`

    const setRegion = (newRegionCode: string) =>
        router.push('/', undefined, {
            locale: `${newRegionCode.toLowerCase()}/${currentLangCode}`
        })
    const setLang = (newLangCode: string) =>
        router.push(`${pathname}${textQuery}`, undefined, {
            locale: `${currentRegionCode}/${newLangCode}`
        })

    return (
        <div className="w-full bottom-0 uppercase bg-black text-white">
            <div className="w-full flex flex-col md:items-center md:flex-row md:w-fit">
                <label htmlFor="Region" style={labelStyles}>
                    {t('LOCATION')}
                </label>
                {/* eslint-disable jsx-a11y/no-onchange */}
                <LocaleSelectWrapper>
                    <select
                        name="Region"
                        id="region"
                        onChange={(e) => setRegion(e.target.value)}
                        defaultValue={currentRegionCode}
                        style={selectStyles}
                    >
                        {Object.entries(regionMap).map(
                            ([regionName, regionCode]) => (
                                <option key={regionCode} value={regionCode}>
                                    {t(`regions|${regionName}`)}
                                </option>
                            )
                        )}
                    </select>
                </LocaleSelectWrapper>
            </div>
            <div
                className={cn(
                    'w-full flex flex-col md:items-center md:flex-row md:w-fit font-aktivGroteskBold font-bold',
                    s.language
                )}
            >
                <label htmlFor="Language" style={labelStyles}>
                    {t('LANGUAGE')}
                </label>
                {/* eslint-disable jsx-a11y/no-onchange */}
                <LocaleSelectWrapper>
                    <select
                        name="Language"
                        id="lang"
                        onChange={(e) => setLang(e.target.value)}
                        defaultValue={currentLangCode}
                        style={selectStyles}
                    >
                        {Object.entries(langMap).map(([langName, langCode]) => (
                            <option key={langCode} value={langCode}>
                                {t(`langs|${langName}`)}
                            </option>
                        ))}
                    </select>
                </LocaleSelectWrapper>
            </div>
        </div>
    )
}
