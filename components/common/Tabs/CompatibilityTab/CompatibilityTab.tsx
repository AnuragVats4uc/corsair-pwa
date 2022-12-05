import { LeftRightTextResponse } from '@components/common/LeftRightText/LeftRightText'
import { ListsTableInterface } from '@components/common/ListsTable/ListsTable'
import { Content } from '@components/common/TableComparison/TableComparison.interfaces'
import { ITabItem } from '@components/common/types'
import dynamic from 'next/dynamic'
import React, { useMemo, VFC } from 'react'

const LeftRightText = dynamic(
    () => import('@components/common/LeftRightText/index')
)
const ListsTable = dynamic(
    () => import('@components/common/ListsTable/ListsTable')
)

const TableComparisonWrapper = dynamic(
    () => import('@components/common/TableComparison/TableComparison')
)

export type CompatabilityTabProps = {
    content: ITabItem<
        'compatibility',
        LeftRightTextResponse | ListsTableInterface | Content
    >
}

const CompatabilityTab: VFC<CompatabilityTabProps> = ({
    content: { content }
}) => {
    const CompatabilityTabItems = useMemo(() => {
        if (!content) {
            return []
        }
        return content.map((compatibility) => {
            switch (compatibility.meta.contentType) {
                case 'leftRightText': {
                    return (
                        <LeftRightText
                            content={compatibility as LeftRightTextResponse}
                        />
                    )
                }
                case 'listsTable': {
                    return (
                        <ListsTable
                            content={compatibility as ListsTableInterface}
                        />
                    )
                }
                case 'comparisonTable': {
                    return (
                        <TableComparisonWrapper
                            content={compatibility as Content}
                        />
                    )
                }
                default: {
                    return null
                }
            }
        })
    }, [content])
    return <div>{CompatabilityTabItems}</div>
}

export default CompatabilityTab
