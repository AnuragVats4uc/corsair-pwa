import React, { useRef, useEffect, FC } from 'react'
import hasParent from './has-parent'

interface IBackdropClick {
    active?: boolean
    touchStart?: boolean
    onClick: (e?: MouseEvent | TouchEvent) => void
    children: JSX.Element
}

const BackdropClick: FC<IBackdropClick> = ({
    active = true,
    touchStart = true,
    onClick,
    children
}) => {
    const innerRef = useRef<HTMLElement>()

    useEffect(() => {
        const handleClick = (event: MouseEvent | TouchEvent) => {
            if (
                innerRef.current &&
                !hasParent(event.target as HTMLElement, innerRef.current)
            ) {
                if (typeof onClick === 'function') {
                    onClick(event)
                }
            }
        }

        if (active) {
            document.addEventListener('mousedown', handleClick)
            if (touchStart) {
                document.addEventListener('touchstart', handleClick)
            }
        }

        return () => {
            if (active) {
                document.removeEventListener('mousedown', handleClick)
                if (touchStart) {
                    document.removeEventListener('touchstart', handleClick)
                }
            }
        }
    }, [active, onClick, touchStart])

    return React.cloneElement(children, { ref: innerRef })
}

export default BackdropClick
