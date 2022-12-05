import React, { FC } from 'react'
import { IMeta } from '../types'
import cn from 'classnames'
import s from './Table.module.scss'

export interface TablePropTypes {
    heading: string
    key: string
    meta: IMeta<'table'>
    tableContent: string
    styles: string
    alignColumn: string
}

export interface TableStylesType {
    products: string
    lists: string
}

export interface TableInterface {
    content: TablePropTypes
    type: string
    tableWidth: number
}

const Table: FC<TableInterface> = ({ content, type, tableWidth }) => {
    const tableTypes: TableStylesType = {
        products: 'products-table',
        lists: 'products-table'
    }
    const tableStyle = tableTypes[type as keyof TableStylesType]
    const { heading, styles, alignColumn, tableContent } = content

    return (
        <div
            className={cn(
                s[tableStyle],
                'tableStyle',
                tableWidth === 1 && `${s['full-size']}`
            )}
        >
            {heading && (
                <header
                    className={cn(
                        s['centered-header'],
                        styles === 'Light background' &&
                            `${s['centered-header-light']}`,
                        styles === 'Transparent background' &&
                            `${s['centered-header-tranparent']}`
                    )}
                >
                    <p>{heading}</p>
                </header>
            )}
            <div
                className={cn(
                    s['table-wrapper'],
                    {
                        [s['table-wrapper-transparent']]:
                            styles === 'Transparent background',
                        [s['table-wrapper-light']]:
                            styles === 'Transparent background',
                        [s['multiple-headers-light']]:
                            styles === 'Transparent background' && !heading,

                        [s['table-wrapper-light']]:
                            styles === 'Light background',
                        [s['multiple-headers']]: !heading,
                        [s['multiple-headers']]:
                            styles === 'Light background' && !heading
                    },
                    alignColumn === 'Left' && 'text-left',
                    alignColumn === 'Center' && 'text-center',
                    alignColumn === 'Right' && 'text-right'
                )}
                dangerouslySetInnerHTML={{
                    __html: tableContent
                }}
            />
        </div>
    )
}

export default Table
