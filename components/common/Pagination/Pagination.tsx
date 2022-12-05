import { PaginationItem } from './PaginationItem'
import { SearchResultPageInfo } from '@pylot-data/fwrdschema'
import React, { Dispatch, SetStateAction } from 'react'
import s from './Pagination.module.scss'
import { useCallback } from 'react'

interface PaginationProps {
    maxVisible: number
    pageInfo: SearchResultPageInfo | null
    totalCount: number | null
    isMobile?: boolean
    setCurrentPage: Dispatch<SetStateAction<number>>
}

export const Pagination = ({
    maxVisible,
    pageInfo,
    totalCount,
    isMobile,
    setCurrentPage
}: PaginationProps): JSX.Element | null => {
    const currentPage = pageInfo ? Number(pageInfo.current_page) : null

    const totalAmountOfPages: number = Math.ceil(
        totalCount ? totalCount / maxVisible : 0
    )

    /**
     * List items
     * @returns items
     */
    const ListItems = useCallback(() => {
        const items = []
        for (
            let index = getForLoopIndex();
            index ? handleForLoopCondition(index) : null;
            index ? index++ : null
        ) {
            items.push(
                <PaginationItem
                    currentPage={currentPage}
                    index={index}
                    setCurrentPage={setCurrentPage}
                    totalAmountOfPages={totalAmountOfPages}
                >
                    {index ? index.toString() : undefined}
                </PaginationItem>
            )
        }
        return <>{items}</>
    }, [currentPage, setCurrentPage, totalAmountOfPages])

    if (totalAmountOfPages === 1) return null

    /**
     * Handle for index
     * @returns initial index value
     */
    const getForLoopIndex = () => {
        if (!currentPage) return

        // handles the first page and the second page
        if (currentPage === 1 || currentPage === 2) {
            return 1
        } else if (currentPage === totalAmountOfPages) {
            // handles last page
            if (totalAmountOfPages < 5) return 1

            return isMobile ? currentPage - 2 : currentPage - 4
        } else if (currentPage === totalAmountOfPages - 1) {
            // handles second to last page
            return isMobile ? currentPage - 1 : currentPage - 3
        } else if (currentPage > 2) {
            // handles all pages after the 2nd page
            return isMobile ? currentPage - 1 : currentPage - 2
        }
    }

    /**
     * Handle for condition
     * @param index number
     * @returns condition statement
     */
    const handleForLoopCondition = (index: number) => {
        if (!index || !currentPage) return

        // handles less than or equal to 4 total pages and current page is less than 2
        if (totalAmountOfPages <= 4 && currentPage < 2) {
            return index < totalAmountOfPages + 1
        }

        // handles pages 1 and 2
        if (currentPage === 1 || currentPage === 2) {
            if (currentPage === 2 && totalAmountOfPages <= (isMobile ? 3 : 5)) {
                return index < totalAmountOfPages + 1
            }
            return isMobile ? index < 4 : index < 6
        }

        // handles last page
        if (currentPage === totalAmountOfPages) {
            return index < totalAmountOfPages + 1
        }

        // handles second to last page
        if (currentPage === totalAmountOfPages - 1) {
            return index < totalAmountOfPages + 1
        }

        // handles all pages where total pages is greater or equal to 5 and the current page is greater than 2
        if (totalAmountOfPages >= 5 && currentPage > 2) {
            return isMobile ? index < currentPage + 2 : index < currentPage + 3
        }
    }

    return (
        <div className={s.pagination}>
            <ul
                className={s.list}
                data-total-amount-of-pages={totalAmountOfPages}
            >
                <PaginationItem
                    currentPage={currentPage}
                    isFirst
                    setCurrentPage={setCurrentPage}
                    totalAmountOfPages={totalAmountOfPages}
                />
                <PaginationItem column currentPage={currentPage} />
                <PaginationItem
                    currentPage={currentPage}
                    isBackArrow
                    setCurrentPage={setCurrentPage}
                    totalAmountOfPages={totalAmountOfPages}
                />
                <ListItems />
                <PaginationItem
                    currentPage={currentPage}
                    isNextArrow
                    setCurrentPage={setCurrentPage}
                    totalAmountOfPages={totalAmountOfPages}
                />
                <PaginationItem column currentPage={currentPage} />
                <PaginationItem
                    currentPage={currentPage}
                    isLast
                    setCurrentPage={setCurrentPage}
                    totalAmountOfPages={totalAmountOfPages}
                />
            </ul>
        </div>
    )
}
