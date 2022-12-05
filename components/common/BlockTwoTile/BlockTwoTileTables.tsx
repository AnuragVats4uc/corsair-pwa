import React from 'react'
import { Content } from '../TableComparison/TableComparison.interfaces'
import ListsTable, { ListsTableInterface } from '../ListsTable/ListsTable'
import TableComparisonWrapper from '../TableComparison/TableComparison'

import s from './BlockTwoTile.module.scss'
import cn from 'classnames'

type Props = {
    content: Array<ListsTableInterface | Content>
}

export const BlockTwoTileTables = ({ content }: Props) => {
    const tables = content.map((data) => {
        switch (data.meta.contentType) {
            case 'listsTable': {
                return <ListsTable content={data as ListsTableInterface} />
            }
            case 'comparisonTable': {
                return (
                    <div className="lg:-mx-16">
                        <TableComparisonWrapper content={data as Content} />
                    </div>
                )
            }
            default: {
                return null
            }
        }
    })

    return (
        <div className={cn(s['block-table'], 'max-w-full w-full mb-7')}>
            {tables}
        </div>
    )
}
