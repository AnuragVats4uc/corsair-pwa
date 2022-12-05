import React, { useRef, useEffect } from 'react'

const useHorizontalScroll = (): React.MutableRefObject<HTMLUListElement> => {
    const elRef = useRef() as React.MutableRefObject<HTMLUListElement>

    const ref = useRef({
        isMouseDown: false,
        startX: 0,
        scrollLeft: 0
    })

    useEffect(() => {
        const el = elRef.current
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY == 0) {
                    return
                }

                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: 'smooth'
                })
            }

            const onMouseDown = (e: MouseEvent | TouchEvent) => {
                const pageX =
                    (e as MouseEvent).pageX !== undefined
                        ? (e as MouseEvent).pageX
                        : (e as TouchEvent).touches[0].pageX

                ref.current.isMouseDown = true
                ref.current.startX = pageX - el.offsetLeft
                ref.current.scrollLeft = el.scrollLeft
            }

            const onMouseNotDown = () => {
                ref.current.isMouseDown = false
            }

            const onMouseMove = (e: MouseEvent | TouchEvent) => {
                if (!ref.current.isMouseDown) {
                    return
                }

                const pageX =
                    (e as MouseEvent).pageX !== undefined
                        ? (e as MouseEvent).pageX
                        : (e as TouchEvent).touches[0].pageX
                if (e.cancelable) {
                    e.preventDefault()
                }

                const x = pageX - el.offsetLeft
                const walk = x - ref.current.startX
                el.scrollLeft = ref.current.scrollLeft - walk
            }

            el.addEventListener('wheel', onWheel)
            el.addEventListener('mousedown', onMouseDown)
            el.addEventListener('mouseleave', onMouseNotDown)
            el.addEventListener('mouseup', onMouseNotDown)
            el.addEventListener('mousemove', onMouseMove)

            el.addEventListener('touchstart', onMouseDown)
            el.addEventListener('touchend', onMouseNotDown)
            el.addEventListener('touchmove', onMouseMove)

            return () => {
                el.removeEventListener('wheel', onWheel)
                el.removeEventListener('mousedown', onMouseDown)
                el.removeEventListener('mouseleave', onMouseNotDown)
                el.removeEventListener('mouseup', onMouseNotDown)
                el.removeEventListener('mousemove', onMouseMove)

                el.removeEventListener('touchstart', onMouseDown)
                el.removeEventListener('touchend', onMouseNotDown)
                el.removeEventListener('touchmove', onMouseMove)
            }
        }
    }, [])
    return elRef
}

export default useHorizontalScroll
