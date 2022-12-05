import { Minus, Plus } from '@components/icons'
import { Button } from '@corratech/pylot-ui'
import cn from 'classnames'
import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import s from './QuantitySelector.module.scss'

// TODO: make `CartQuantity` component based on this one
// remove / add required props
type QuantitySelectorProps = {
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
    isEditingDisabled?: boolean
    // handleBlur?: (e: FocusEvent<HTMLInputElement>) => void
    // handleFocus?: (
    //     e: FocusEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>
    // ) => void
    // handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
    // updateQuantity?: (n?: number) => void
}

const MIN = 1
const MAX = 99

const getBoundedValue = (value = 0): number => {
    if (value > MAX) return MAX
    if (value < MIN) return MIN
    return value
}

export const QuantitySelector = ({
    quantity,
    setQuantity,
    isEditingDisabled = false
}: QuantitySelectorProps): ReactElement => (
    <div className={cn(s['pdp-quantity'], 'pdp-qty')}>
        <Button
            variant="link"
            className={cn({
                'opacity-25 cursor-auto': isEditingDisabled
            })}
            onClick={() => setQuantity((oldQty) => getBoundedValue(oldQty - 1))}
            disabled={isEditingDisabled}
        >
            <Minus width={18} height={18} />
        </Button>
        <label>
            <input
                disabled={isEditingDisabled}
                type="number"
                max={MAX}
                min={MIN}
                className={s.quantity}
                value={quantity}
                onBlur={(e) => {
                    const newValue = getBoundedValue(+e.target.value)
                    setQuantity(newValue)
                    // sometimes state changes do not reflect the input value, therefore
                    //  value should be set explicitly
                    e.target.value = newValue.toString()
                }}
            />
        </label>
        <Button
            variant="link"
            className={cn({ 'opacity-25 cursor-auto': isEditingDisabled })}
            disabled={isEditingDisabled}
            onClick={() => setQuantity((oldQty) => getBoundedValue(oldQty + 1))}
        >
            <Plus width={18} height={18} />
        </Button>
    </div>
)
