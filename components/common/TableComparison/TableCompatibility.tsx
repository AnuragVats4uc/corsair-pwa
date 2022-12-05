import React, { VFC } from 'react'
import {
    TableCompatibilityProps,
    ComparisonTableType
} from './TableComparison.interfaces'

import s from './TableComparison.module.scss'
import cn from 'classnames'

const TableCompatibility: VFC<TableCompatibilityProps> = ({
    content,
    className,
    contentTable,
    getTableTheme,
    replaceHtmlTable
}) => {
    const { table, headerTitle, type, backgroundImage, mobileTable } = content

    return (
        <div
            className={cn(
                s[
                    `compatibility-table-desktop-theme-${getTableTheme(
                        table.styles
                    )}`
                ],
                s[
                    `compatibility-table-mobile-theme-${getTableTheme(
                        mobileTable[0]?.styles
                    )}`
                ]
            )}
        >
            <div
                className={cn(
                    content?.useImageAsBackground &&
                        backgroundImage &&
                        s['gradial-background'],
                    s['compatibility-table-container']
                )}
            >
                <div
                    className={cn(
                        s[`compatibility-table-${className}`],
                        'text-white md:relative mb-0 lg:max-w-screen-xl lg:px-16 xl:px-20 xl-1440:px-20 w-full mx-auto px-4 pb-20 pt-8 z-0'
                    )}
                >
                    <h2
                        className={`${cn(
                            s[`desktop-${getTableTheme(table.styles)}`],
                            s[`mobile-${getTableTheme(mobileTable[0]?.styles)}`]
                        )} font-bebasNeueExtraBold block mb-8 text-center text-2xl uppercase`}
                    >
                        {headerTitle}
                    </h2>
                    <div
                        className={cn(
                            s['compatibility-table-wrapper'],
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
                                s['compatibility-table-wrapper-mobile'],
                                'text-white'
                            )}
                            dangerouslySetInnerHTML={{
                                __html: replaceHtmlTable(
                                    mobileTable[0].tableContent
                                )
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TableCompatibility
