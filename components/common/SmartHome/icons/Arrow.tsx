import { ArrowLeft } from './ArrowLeft'
import { ArrowRight } from './ArrowRight'
import { CustomArrowProps } from 'react-slick'

type ArrowType = {
    direction: 'left' | 'right'
    color?: string
}

export const Arrow = ({
    className,
    onClick,
    direction,
    color = 'white'
}: CustomArrowProps & ArrowType): JSX.Element => {
    return (
        <div className={className} onClick={onClick} aria-hidden="true">
            <button>
                {direction === 'left' ? (
                    <ArrowLeft className="chevron-left" color={color} />
                ) : (
                    <ArrowRight className="chevron-right" color={color} />
                )}
            </button>
        </div>
    )
}
