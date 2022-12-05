import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react'
import type { VFC } from 'react'

import s from '@components/common/DownloadComponents/DownloadComponents.module.scss'
import cn from 'classnames'
import { useRef } from 'preact/hooks'
import { Configure } from 'react-instantsearch-dom'
import { useTranslation } from 'next-i18next'
import { DownloadCategory } from '@components/common/Downloads/Downloads'
import { filterCategories } from '@components/common/DownloadComponents/DownloadSearchWrapper'

interface DownloadSearchWrapperProps {
    categories: DownloadCategory[]
}

export const DocumentaionSearchWrapper: VFC<DownloadSearchWrapperProps> = ({
    categories
}) => {
    const { t } = useTranslation('common')
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const [searchCategory, setSearchCategory] = useState<string>('')
    const [categorySelected, setCategorySelected] = useState<string>('')
    const [index, setIndex] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const [bodyClicked, setBodyClicked] = useState<boolean>(false)

    useEffect(() => {
        if (openDropDown) {
            inputRef?.current?.focus()
        }
    }, [openDropDown])

    const handleSumit = (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
    }

    useEffect(() => {
        const categoriesWithPlaceholder = [
            { title: t('downloads|SELECT CATEGORY') },
            ...categories
        ]

        const handlerClick = () => {
            setOpenDropDown(false)
            setBodyClicked(true)
        }

        if (openDropDown) {
            if (typeof window !== 'undefined') {
                const categoriesLength = categoriesWithPlaceholder.filter(
                    (category) => filterCategories(category, searchCategory)
                )

                const handleIndex = (event: KeyboardEvent) => {
                    if (event.code === 'ArrowDown') {
                        setOpenDropDown(true)

                        if (index !== categoriesLength.length) {
                            setIndex(index + 1)
                        }
                    }

                    if (event.code === 'ArrowUp') {
                        if (index - 1 === 0) {
                            setOpenDropDown(false)
                        }

                        if (index <= categoriesLength.length && index > 1) {
                            setIndex(index - 1)
                        }
                    }

                    if (event.code === 'Enter') {
                        if (index === 1) {
                            setSearchCategory('')
                        } else {
                            setCategorySelected(
                                categoriesWithPlaceholder[index - 1].title
                            )
                        }
                        setOpenDropDown(false)
                    }
                    setBodyClicked(false)
                }

                window.addEventListener('keydown', handleIndex as () => void)
                window.addEventListener('click', handlerClick)

                return () => {
                    window.removeEventListener('click', handlerClick)
                    window.removeEventListener(
                        'keydown',
                        handleIndex as () => void
                    )
                }
            }
        }

        const handlerDropDown = (event: KeyboardEvent) => {
            if (event.code === 'ArrowUp') {
                if (index - 1 === 0 && !bodyClicked) {
                    setOpenDropDown(!openDropDown)
                }
            }

            if (event.code === 'ArrowDown') {
                if (index - 1 === 0 && !bodyClicked) {
                    setOpenDropDown(true)
                }
            }
        }

        window.addEventListener('keydown', handlerDropDown as () => void)

        return () => {
            window.removeEventListener('keydown', handlerDropDown as () => void)
            window.removeEventListener('click', handlerClick as () => void)
        }
    }, [openDropDown, index, searchCategory, categories, t, bodyClicked])

    const categoriesWithPlaceholder = [
        { title: t('downloads|SELECT CATEGORY') },
        ...categories
    ]

    const selectedCategory = useMemo(() => {
        return categories.find(
            (category) => category.title === categorySelected
        )?.url
    }, [categories, categorySelected])

    const categoryOptions = categoriesWithPlaceholder
        .filter((item) => filterCategories(item, searchCategory))
        .map((category, itemIndex) => (
            <li
                key={category.title}
                value={category.title}
                title={category.title}
                className={cn({
                    [s['active']]: index === itemIndex + 1
                })}
            >
                <button
                    type="submit"
                    onKeyDown={() => null}
                    className="uppercase p-2 w-full text-left outline-none"
                    onClick={() => {
                        if (index) {
                            setCategorySelected(
                                categoriesWithPlaceholder[index - 1].title
                            )
                        } else {
                            if (
                                category.title ===
                                t('downloads|SELECT CATEGORY')
                            ) {
                                setCategorySelected('')
                            } else {
                                setCategorySelected(category.title)
                            }
                        }

                        setOpenDropDown(false)
                    }}
                >
                    <span>{category.title}</span>
                </button>
            </li>
        ))

    return (
        <form
            role="search"
            onSubmit={handleSumit}
            className={cn(
                s['download-form-wrapper'],
                'flex items-center justify-between relative w-full md:flex-row flex-col'
            )}
        >
            <Configure
                filters={`categories.p:${selectedCategory} AND enabled:true AND is_visible:true AND show_variants:true AND not_sellable:false`}
                hitsPerPage={1000}
            />
            <div
                className={cn(
                    s['download-custom-dropdown'],
                    s['documentation-custom-dropdown'],
                    'relative bg-white m-2 bg-no-repeat'
                )}
            >
                <div
                    tabIndex={0}
                    role="button"
                    className="pt-4 pr-14 pb-3 md:pl-6 pl-4"
                    onKeyPress={() => null}
                    id="custom-drop-down-downloads"
                    onClick={() => {
                        setOpenDropDown(!openDropDown)
                        setIndex(0)
                    }}
                >
                    <span className="uppercase overflow-hidden mr-0 whitespace-no-wrap">
                        {categorySelected
                            ? categorySelected
                            : t('downloads|SELECT CATEGORY')}
                    </span>
                </div>

                <div
                    style={{
                        display: openDropDown ? 'flex' : 'none'
                    }}
                    className={cn(
                        s['dowload-dropdown-wrapper'],
                        'absolute top-0 left-0 w-full bg-white z-50'
                    )}
                >
                    <input
                        className="w-full p-4 bg-no-repeat outline-none font-aktivGrotesk"
                        ref={inputRef}
                        value={searchCategory}
                        onChange={(event) =>
                            setSearchCategory(event.target.value)
                        }
                    />
                    <ul className="pt-1">{categoryOptions}</ul>
                </div>
            </div>
        </form>
    )
}

export default DocumentaionSearchWrapper
