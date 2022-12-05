import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import s from './Dropdown.module.scss'
import cn from 'classnames'

interface DropdownProps {
    amountOfProducts?: number
    callback?: Dispatch<SetStateAction<number>>
    children?: ReactNode
    setCurrentPage: Dispatch<SetStateAction<number>>
    totalProducts: number
    currentPage: number
}

interface ViewInterface {
    min: number
    text: string
    value: number
}

interface ListItemInterface {
    key: number
    element: ViewInterface
}

const Dropdown = ({
    amountOfProducts,
    callback,
    children,
    setCurrentPage,
    totalProducts,
    currentPage
}: DropdownProps) => {
    const { t } = useTranslation('plp')

    const defaultView = [
        {
            value: 12,
            text: `12 ${t('items')}`,
            min: 0,
            default: true
        },
        {
            value: 36,
            text: `36 ${t('items')}`,
            min: 13
        },
        {
            value: 60,
            text: `60 ${t('items')}`,
            min: 37
        }
    ]
    const getDefaultItemCount = () => {
        return defaultView.find((item) => item.default)?.value
    }

    const [isVisible, setIsVisible] = useState(false)
    const [activeView, setActiveView] = useState(
        `${getDefaultItemCount()} ${t('items')}`
    )

    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const { pageSize } = router?.query

    useEffect(() => {
        if (pageSize) setActiveView(`${pageSize} ${t('items')}`)
    }, [router])

    /**
     * Used to handle click outside to close dropdown options
     */
    useEffect(() => {
        /**
         * Handle click outside
         * @param event mousedown even on document
         */
        const handleClickOutside = (event: MouseEvent) => {
            const { target } = event
            const element = target as HTMLElement

            if (target instanceof HTMLElement) {
                const { current } = dropdownRef

                if (current && !current.contains(element)) setIsVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    /**
     * Handle button click
     */
    const handleButtonClick = () => setIsVisible(!isVisible)

    /**
     * Handle list click
     */
    const handleListClick = (element: ViewInterface) => {
        setActiveView(element.text)
        setIsVisible(false)
        updateUrl(element.value)
        if (setCurrentPage) setCurrentPage(1)
        if (callback) callback(element.value)
    }

    /**
     * Update url
     * @param value selected hits per page
     */
    const updateUrl = (value: number) => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())

        router.push({
            pathname: window.location.pathname,
            query: {
                ...params,
                pageSize: value
            }
        })
    }

    /**
     * Render list item
     * @param key key from map index
     * @param element element callback from map
     * @returns {JSX Element}
     */
    const ListItem = ({ key, element }: ListItemInterface) => {
        return (
            <li key={key}>
                <button
                    className={cn(s.option, 'text-left')}
                    onClick={() => handleListClick(element)}
                    type="button"
                >
                    {element.text}
                </button>
            </li>
        )
    }

    /**
     * Render list - this useMemo function decides which option to display
     */
    const renderList = useMemo(() => {
        return defaultView.map((element: ViewInterface, key: number) => {
            if (!amountOfProducts) return

            if (currentPage === 1 && totalProducts >= element.min) {
                return <ListItem key={key} element={element} />
            }
            if (currentPage > 1 && totalProducts >= element.value) {
                return <ListItem key={key} element={element} />
            }
        })
    }, [ListItem, amountOfProducts, currentPage, totalProducts])

    const isExposed = isVisible ? s.isExposed : ''

    return (
        <div ref={dropdownRef} className={s.dropdown}>
            {children && <span className={s.label}>{children}</span>}
            <div className={s.wrapper}>
                <button
                    className={`${s.button} ${isExposed} text-left`}
                    type="button"
                    onClick={handleButtonClick}
                >
                    {activeView}
                </button>
                {isVisible && defaultView.length && (
                    <ul className={s.menu}>{renderList}</ul>
                )}
            </div>
        </div>
    )
}

export default Dropdown
