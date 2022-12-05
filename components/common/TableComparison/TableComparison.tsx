import React, { VFC, useMemo, CSSProperties, useState } from 'react'
import {
    comparisonTableStyleType,
    ComparisonTableType,
    TableComparisonProps
} from './TableComparison.interfaces'
import { replaceWithRegex } from './TableCompatibilityUtil'
import { tableIcons } from './TableComparisionIcons'
import TableCompatibility from './TableCompatibility'

import s from './TableComparison.module.scss'
import cn from 'classnames'

const htmlReplaces: Array<{ regex: any; value: string }> = [
    {
        regex: /checkicon/gi,
        value: tableIcons.check
    },
    {
        regex: /NONE/gi,
        value: ''
    },
    {
        regex: /none/gi,
        value: ''
    },
    {
        regex: /check_rounded/gi,
        value: tableIcons.checkRounded
    },
    {
        regex: /closeicon_rounded/gi,
        value: tableIcons.closeIconRounded
    },
    {
        regex: /breakline/gi,
        value: '<br />'
    },
    {
        regex: /<td>\s*blank\s*<\/td>/gi,
        value: `<td class="${s['blank']}"><span></span></td>`
    }
]

const replaceHtmlTable = (table: string): string => {
    table = replaceWithRegex(table)

    const t = htmlReplaces.reduce((acc, current) => {
        table = table?.replace(current.regex, current.value)
        acc = table

        return acc
    }, '')

    return t
}

const TableComparison: VFC<TableComparisonProps> = ({ content }) => {
    const {
        headerTitle,
        table,
        type,
        backgroundColor,
        backgroundImage,
        mobileTable
    } = content

    const contentTable = useMemo(() => replaceHtmlTable(table.tableContent), [
        table.tableContent
    ])

    const [tableIndex, setTableIndex] = useState<number>(0)

    const className = type.replace(/\s/g, '-').toLowerCase()
    const wrapperColor = backgroundColor ?? 'transparent'
    const wrapperBackgroundImage = backgroundImage
        ? backgroundImage.file.url
        : null

    const wrapperStyle: CSSProperties = {
        backgroundSize: '42px 68px',
        background:
            wrapperColor === 'transparent' &&
            content?.useImageAsBackground &&
            wrapperBackgroundImage
                ? `url("${wrapperBackgroundImage}") 100% 100% repeat fixed`
                : wrapperColor
    }

    const transparentBG =
        wrapperColor === 'transparent' ? 'transparentBackGround' : ''
    const selectItems = mobileTable?.map((mobileTable, index) => (
        <option key={index} value={index} selected={index === tableIndex}>
            {mobileTable.heading}
        </option>
    ))

    const getTableTheme = (theme: comparisonTableStyleType) => {
        const themes = {
            [comparisonTableStyleType.DARK]: 'dark',
            [comparisonTableStyleType.LIGHT]: 'light'
        }
        return themes[theme]
    }

    if (type === ComparisonTableType.COMPATIBILITY) {
        return (
            <TableCompatibility
                content={content}
                className={className}
                contentTable={contentTable}
                getTableTheme={getTableTheme}
                setTableIndex={setTableIndex}
                replaceHtmlTable={replaceHtmlTable}
            />
        )
    }

    return (
        <div
            style={wrapperStyle}
            className={cn(
                s[`comparison-table-theme-${getTableTheme(table.styles)}`],
                s[transparentBG]
            )}
        >
            <div
                className={cn(
                    content?.useImageAsBackground &&
                        backgroundImage &&
                        s['gradial-background']
                )}
            >
                <div
                    className={cn(
                        s[`comparison-table-${className}`],
                        'text-white md:relative mb-0 z-20 lg:max-w-screen-xl lg:px-16 xl:px-20 xl-1440:px-20 w-full mx-auto px-4 pb-20 pt-8'
                    )}
                >
                    <h2 className="font-bebasNeueExtraBold block mb-4">
                        {headerTitle}
                    </h2>
                    <div
                        className={cn(
                            s['comparison-table-wrapper'],
                            {
                                hidden: type === ComparisonTableType.TRANSPARENT
                            },
                            'text-white lg:flex justify-center'
                        )}
                        dangerouslySetInnerHTML={{ __html: contentTable }}
                    />
                    {mobileTable && mobileTable.length && (
                        <div
                            className={cn(
                                s['comparison-table-mobile'],
                                'md:hidden flex flex-col'
                            )}
                        >
                            <select
                                onBlur={() => null}
                                className="text-center bg-transparent pr-10"
                                onChange={(event) =>
                                    setTableIndex(
                                        Number(event.target.value || '0')
                                    )
                                }
                            >
                                {selectItems}
                            </select>
                            <div
                                className={cn(
                                    s['comparison-table-wrapper-mobile'],
                                    'text-white'
                                )}
                                dangerouslySetInnerHTML={{
                                    __html: replaceHtmlTable(
                                        mobileTable[tableIndex].tableContent
                                    )
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const TableComparisonWrapper: VFC<TableComparisonProps> = ({ content }) =>
    content ? <TableComparison content={content} /> : <span />

export default TableComparisonWrapper
