import type { ChangeEvent, FC } from 'react'
import s from './Checkbox.module.scss'
import cn from 'classnames'

interface ICheckbox {
    labelName: string
    checked?: boolean
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
    className?: string
    id?: string
}

export const Checkbox: FC<ICheckbox> = ({
    labelName,
    checked = false,
    onChange,
    className,
    id
}) => {
    return (
        <label className={cn(s['container'], className)}>
            <input
                id={`checkbox-${id}`}
                type="checkbox"
                checked={checked}
                onChange={(evt) => {
                    onChange(evt)
                }}
            />
            <span className={s['checkmark']} aria-hidden="true" />
            {labelName}
        </label>
    )
}
