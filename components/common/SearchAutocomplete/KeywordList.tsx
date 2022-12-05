import React, { ReactElement } from 'react'
import s from './SearchAutocomplete.module.scss'
import Link from 'next/link'
export type KeywordProp = {
    keywords: string[]
}

const KeywordList = ({ keywords }: KeywordProp): ReactElement | null => {
    return (
        <div className={s['search-keyword']}>
            {keywords?.map((keyword, ind) => {
                return (
                    <div key={ind}>
                        <Link href={`/search?q=${keyword}`}>{keyword}</Link>
                    </div>
                )
            })}
        </div>
    )
}
export default KeywordList
