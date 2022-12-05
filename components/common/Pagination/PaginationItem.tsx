import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'
import s from './Pagination.module.scss'

interface PaginationButtonProps {
    children?: string
    column?: boolean
    currentPage: number | null
    index?: number
    isBackArrow?: boolean
    isFirst?: boolean
    isLast?: boolean
    isNextArrow?: boolean
    setCurrentPage?: Dispatch<SetStateAction<number>>
    totalAmountOfPages?: number
}

export const PaginationItem = ({
    children,
    column,
    currentPage,
    index,
    isBackArrow,
    isFirst,
    isLast,
    isNextArrow,
    setCurrentPage,
    totalAmountOfPages
}: PaginationButtonProps) => {
    const backArrow = isBackArrow ? s['back-arrow'] : ''
    const nextArrow = isNextArrow ? s['next-arrow'] : ''

    const outputFirst = isFirst ? 'First' : ''
    const outputLast = isLast ? 'Last' : ''

    const firstButton = isFirst ? s['button--text'] : ''
    const lastButton = isLast ? s['button--text'] : ''

    const router = useRouter()

    /**
     * Manages button disabled state
     * @returns disabled state
     */
    const isDisabled = () => {
        if (currentPage === 1) {
            // handles first page
            if (isFirst || children === '1' || isBackArrow) return true
        } else if (currentPage === totalAmountOfPages) {
            // handles last page
            if (isLast || index === totalAmountOfPages || isNextArrow)
                return true
        } else if (currentPage === index) {
            // handles page numbers
            return true
        }
    }

    /**
     * Update URL
     * @param value number
     */
    const updateUrl = (value: number) => {
        router.query.page = value.toString()
        router.push(router)
    }

    /**
     * Handle set current page
     * @param index number
     */
    const handleSetCurrentPage = (value: number) => {
        if (value && setCurrentPage) {
            setCurrentPage(value)
            updateUrl(value)
        }
    }

    /**
     * Handle set current page click
     * @param index number
     * @returns handleSetCurrentPage function
     */
    const handleSetCurrentPageClick = (value: number) => {
        if (!setCurrentPage || !currentPage || !totalAmountOfPages) return

        if (isFirst && currentPage !== 1) {
            // handles first button
            handleSetCurrentPage(1)
        } else if (isLast && currentPage !== totalAmountOfPages) {
            // handles last button
            handleSetCurrentPage(totalAmountOfPages)
        } else if (isBackArrow && currentPage > 1) {
            // handles back arrow
            handleSetCurrentPage(currentPage - 1)
        } else if (isNextArrow && currentPage !== totalAmountOfPages) {
            // handlex next arrow
            handleSetCurrentPage(currentPage + 1)
        } else {
            // handles page numbers
            handleSetCurrentPage(value)
        }
    }

    const handleSetCurrentPageLink = (value: number): string => {
        if (!value) {
            return 'javascript:void(0)'
        }

        const params = new URLSearchParams()
        params.set('page', value.toString())
        const basePath = router.asPath.split('?')[0]

        return `${basePath}?${params.toString()}`
    }

    const handleSetCurrentPageNumber = (value: number) => {
        let pageNumber = value

        if (!setCurrentPage || !currentPage || !totalAmountOfPages) {
            pageNumber = 0
            return pageNumber
        }

        if (isFirst) {
            pageNumber = 1
        }

        if (isLast) {
            pageNumber = totalAmountOfPages
        }

        if (isBackArrow && currentPage > 1) {
            pageNumber = currentPage - 1
        }

        if (isNextArrow && currentPage !== totalAmountOfPages) {
            pageNumber = currentPage + 1
        }

        return pageNumber
    }

    const currentPageNumber = handleSetCurrentPageNumber(Number(children))

    return (
        <li className={s.item}>
            {!column && (
                <a
                    href={handleSetCurrentPageLink(currentPageNumber)}
                    className={`${s.button} ${backArrow} ${nextArrow} ${firstButton} ${lastButton}`}
                    onClick={(e) => {
                        e.preventDefault()
                        handleSetCurrentPageClick(Number(index))
                    }}
                    data-disabled={isDisabled()}
                >
                    {children}
                    <div> {outputFirst}</div>
                    <div className={s['last']}>{outputLast}</div>
                </a>
            )}
            {column && <span className={s.column}>|</span>}
        </li>
    )
}
