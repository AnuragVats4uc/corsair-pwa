import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'

type UseLoadMoreButtonResult = {
    isLoading: boolean
    onLoadMoreClick: () => void
}

/**
 * Handles **Load More** products and loading state by extending `useCategory` hook
 */
export const useLoadMoreButton = (
    isValidating: boolean,
    setSize: Dispatch<SetStateAction<number>>
): UseLoadMoreButtonResult => {
    const [isLoading, setIsLoadMorePressed] = useState(false)

    useEffect(() => {
        if (!isValidating && isLoading) {
            setSize((oldSize: number) => oldSize + 1)
            setIsLoadMorePressed(false)
        }
    }, [isLoading, isValidating, setSize])

    const onLoadMoreClick = useCallback(() => setIsLoadMorePressed(true), [
        setIsLoadMorePressed
    ])

    return {
        isLoading,
        onLoadMoreClick
    }
}
