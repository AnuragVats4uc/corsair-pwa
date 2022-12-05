import React, { Dispatch, SetStateAction } from 'react'
import s from './HeaderFindBy.module.scss'

const c = {
    container: `${s.findByContainer} items-center mx-auto my-auto w-full flex md-max:justify-center `,
    selected: `${s.selectedOption} border-transparent relative font-bold text-left tracking-normal uppercase`,
    arrowContainer: `${s.arrowContainer} h-full flex items-center`,
    idle: `${s.idleOption} border-transparent relative font-bold text-left tracking-normal uppercase cursor-pointer`,
    title: `${s.title} text-white font-bold tracking-normal text-center uppercase`
}

type HeaderFindByProps = {
    setCurrentFilter: Dispatch<SetStateAction<number>>
    currentFilter: number
    options: string[]
}

const HeaderFindBy = (props: HeaderFindByProps): JSX.Element => {
    const { options, currentFilter, setCurrentFilter } = props

    return (
        <div className={c.container}>
            <div className={c.arrowContainer}>
                <span className={c.title}>{options[0]}</span>
            </div>
            <div className={s.arrowRight} />
            <button
                onClick={() => {
                    setCurrentFilter(0)
                }}
                className={currentFilter === 0 ? c.selected : c.idle}
            >
                {options[1]}
            </button>
            <button
                onClick={() => {
                    setCurrentFilter(1)
                }}
                className={currentFilter === 1 ? c.selected : c.idle}
            >
                {options[2]}
            </button>
        </div>
    )
}

export default HeaderFindBy
