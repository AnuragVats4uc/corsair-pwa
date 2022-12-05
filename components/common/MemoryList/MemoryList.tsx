import React, { Fragment, useMemo } from 'react'
import cn from 'classnames'
import chunk from 'lodash/chunk'
import { getKeyString } from '@corratech/pylot-utils'
import { ProductInterface, Maybe } from '@pylot-data/pylotschema'
import { ProductListItemProps } from './ProductListItem/ProductListItem'

import { useContentJson } from '@pylot-data/hooks/contentful/use-content-json'

import s from './MemoryList.module.scss'

type MemoryListPropTypes<P> = {
    products: P[]
    ProductTile: React.ComponentType<ProductListItemProps>
    pageSize?: number
    isLoading?: boolean
    LoadingTile: React.ComponentType
    hideMarketingBlock?: boolean
    showMarketingBlockOnLessProducts?: boolean
    className?: string
}

type MemoryListPagePropTypes<T> = {
    items: T[]
    ProductTile: React.ComponentType<ProductListItemProps>
    startingIndex: number
}

type MemoryListContentData = {
    alignColumn: string
    columnNames: string[]
    heading: string
    identifier: string
    styles: string
}

const MEMORY_LIST_CONTENT_TYPE = 'table'
const MEMORY_LIST_IDENTIFIER = 'memoryListTable'

const defaultColumnNames = ['Name', 'Size', 'Speed', 'Timing', 'Price']

const c = /*tw*/ {
    header: `${s.header} hidden md:block text-lightgrey font-aktivGrotesk text-xs`,
    inner: `${s.inner} flex`
}

const ListPage = (props: MemoryListPagePropTypes<Maybe<ProductInterface>>) => {
    const { items, ProductTile, startingIndex } = props

    const keyString = useMemo(() => getKeyString(items), [items])
    const itemElements = useMemo(
        () =>
            items.map((item, idx) => (
                // This must be a fragment, not a div
                <Fragment key={idx}>
                    <ProductTile product={item as ProductInterface} />
                </Fragment>
            )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [keyString, startingIndex, items]
    )
    return <>{itemElements}</>
}

const MemoryList = (
    props: MemoryListPropTypes<Maybe<ProductInterface>>
): JSX.Element => {
    const {
        className,
        isLoading,
        LoadingTile,
        products,
        pageSize,
        ProductTile
    } = props

    const { data: memoryListData } = useContentJson<MemoryListContentData>(
        {
            identifier: [MEMORY_LIST_IDENTIFIER],
            contentType: MEMORY_LIST_CONTENT_TYPE,
            options: {
                level: 5
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true
        }
    )

    if (isLoading)
        return (
            <div className={className}>
                <LoadingTile />
            </div>
        )

    const memoryListColumnNames = memoryListData
        ? memoryListData[0].parsedEntries.columnNames
        : defaultColumnNames

    return (
        <div className={className}>
            <div className={c.header}>
                <div className={c.inner}>
                    {memoryListColumnNames.map(
                        (name: string, index: number) => {
                            const notFirstOrLast =
                                index !== 0 &&
                                index + 1 !== memoryListColumnNames.length

                            return (
                                <div
                                    key={name}
                                    className={cn({ 'flex-1': notFirstOrLast })}
                                >
                                    <span>{name}</span>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>

            {chunk(products, pageSize ?? products.length).map((items, key) => (
                <ListPage
                    key={key}
                    ProductTile={ProductTile}
                    items={items}
                    startingIndex={pageSize ? key * pageSize : 0}
                />
            ))}
        </div>
    )
}

export default MemoryList
