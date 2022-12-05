/* eslint-disable i18next/no-literal-string */
import { ChevronLeft, ChevronRight } from 'react-feather'
import { CustomArrowProps } from 'react-slick'

export const Arrow = ({
    onClick,
    direction,
    s
}: CustomArrowProps & { direction: string; s: any }): JSX.Element | null => {
    if (!s) return null
    return (
        // eslint-disable-next-line
        <>
            {direction === 'left' ? (
                <button className={`${s['left-arrow']}`} onClick={onClick}>
                    <ChevronLeft color="#fff" className={s['chevron']} />
                </button>
            ) : (
                <button className={`${s['right-arrow']}`} onClick={onClick}>
                    <ChevronRight color="#fff" className={s['chevron']} />
                </button>
            )}
        </>
    )
}
