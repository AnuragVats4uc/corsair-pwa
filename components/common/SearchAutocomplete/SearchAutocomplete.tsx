import React, { FC } from 'react'
import { useSearchSuggestion } from '@pylot-data/hooks/search/use-search-suggestion'
import s from './SearchAutocomplete.module.scss'
import ProductItemTiny from './ProductItemTiny'
import KeywordList from './KeywordList'
import { useTranslation } from 'next-i18next'

type autoCompleteType = {
    searchTerm: string
    searchPageURL: string
}

const SearchAutocomplete: FC<autoCompleteType> = ({ searchTerm }) => {
    const { products, keywords } = useSearchSuggestion(searchTerm, {
        revalidateOnFocus: false
    })
    const { t } = useTranslation('common')
    return (
        <div
            className={`${s.autocomplete} flex flex-col md:items-center justify-center md:justify-start md:flex-row flex-wrap md:mt-0 h-auto absolute md:text-center`}
        >
            {products?.items && products.items.length > 0 ? (
                <>
                    <div className={`${s['autocomplete-keywords']} w-full`}>
                        <KeywordList keywords={keywords?.keywords} />
                    </div>
                    <div
                        className={`${s['autocomplete-list']} md:grid md:grid-cols-2 md:gap-4 items-start`}
                    >
                        {products.items.slice(0, 4).map((product, index) => {
                            return (
                                <ProductItemTiny
                                    product={product}
                                    queryID={products.queryID as string}
                                    position={index + 1}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                </>
            ) : (
                <i className={s['no-results']}>{t('No results found')}</i>
            )}
        </div>
    )
}

export default SearchAutocomplete
