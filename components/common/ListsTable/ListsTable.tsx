import React, { FC } from 'react'
import Table, { TablePropTypes } from '../Table/Table'
import cn from 'classnames'
import s from './ListsTable.module.scss'
import { IMeta } from '../types'

export interface ListsTableInterface {
    backgroundColor: string
    heading: string
    tableTitleColor?: string
    meta: IMeta<'listsTable'>
    tables: TablePropTypes[]
}

export interface ListsTablePropType {
    content: ListsTableInterface
}

const ListsTable: FC<ListsTablePropType> = ({ content }) => {
    const { backgroundColor, heading, tables } = content
    const tablesQuantity = tables.length
    const textColor = content?.tableTitleColor
    const styles = {
        color: textColor
    }

    return (
        <div
            className={cn(s['lists-table-wrapper'], 'm-auto', {
                'bg-white': backgroundColor === 'Light',
                'bg-transparent': backgroundColor === 'Transparent'
            })}
        >
            <section className={cn(s['lists'], 'm-auto')}>
                <header
                    className={cn(
                        s['header-wrapper'],
                        'text-center uppercase pb-7 w-full'
                    )}
                >
                    <span
                        className={cn(
                            'font-normal text-black text-2xl',
                            !textColor && {
                                'text-white': backgroundColor === 'Dark'
                            }
                        )}
                        style={styles}
                    >
                        {heading}
                    </span>
                </header>
                <div
                    className={cn(
                        s['lists-tables'],
                        'lists-tables flex justify-center flex-wrap'
                    )}
                >
                    {tables.map((table: TablePropTypes) => (
                        <Table
                            key={table.heading}
                            content={table}
                            type="lists"
                            tableWidth={tablesQuantity}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ListsTable
