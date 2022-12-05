import React, { ReactElement } from 'react'

import s from './SearchAutocomplete.module.scss'
import Link from 'next/link'
import { Aggregation, Maybe } from '@pylot-data/pylotschema'
export type ProductItemProp = {
    aggregations?: Maybe<Array<Maybe<Aggregation>>>
    searchTerm: string
}

const CategoryList = ({
    aggregations,
    searchTerm
}: ProductItemProp): ReactElement | null => {
    if (!aggregations?.length) return null

    const result = aggregations.find((value: Maybe<Aggregation>) => {
        return value?.attribute_code == 'category_id'
    })

    return (
        <div className={s['autocomplete-category']}>
            <div className={s['search-category']}>
                {result?.options?.slice(0, 4).map((category, index) => (
                    <Link
                        key={index}
                        href={`/search/?q=${searchTerm}&category_id=${category?.value}`}
                    >{`${searchTerm} in ${category?.label}`}</Link>
                ))}
            </div>
        </div>
    )
}
export default CategoryList
