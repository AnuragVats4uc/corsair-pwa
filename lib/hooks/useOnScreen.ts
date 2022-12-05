import { useEffect, useState, useRef, RefObject, useMemo } from 'react'

type TOption = IntersectionObserverInit | undefined

/**
 * Reference doc: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @param ref
 * @returns
 */

export const useOnScreen = (
    ref: RefObject<HTMLElement>,
    animate = true,
    options?: TOption
): { isOnScreen: boolean; isAboveRootMargin: boolean } => {
    const observerRef = useRef<IntersectionObserver | null>(null)
    const [isOnScreen, setIsOnScreen] = useState(false)
    const [isAboveRootMargin, setIsAboveRootMargin] = useState(false)

    const observer = useMemo(() => {
        if (typeof IntersectionObserver !== 'undefined') {
            return new IntersectionObserver(([entry]) => {
                const { boundingClientRect: rect } = entry
                const isAboveRootMargin = rect.top < 0

                setIsAboveRootMargin(isAboveRootMargin)
                setIsOnScreen(entry.isIntersecting)
            }, options)
        }
    }, [ref, options])

    useEffect(() => {
        if (observer) {
            observerRef.current = observer
        }
    }, [])

    useEffect(() => {
        if (observerRef?.current && ref?.current && animate) {
            observerRef.current?.observe(ref.current)
        }

        return () => {
            if (observerRef?.current && animate) {
                observerRef.current?.disconnect()
            }
        }
    }, [ref])

    return {
        isOnScreen,
        isAboveRootMargin
    }
}
