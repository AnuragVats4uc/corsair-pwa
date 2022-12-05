import ChevronRight from '@components/icons/ChevronRight'
import ChevronLeft from '@components/icons/ChevronLeft'
import { CustomArrowProps } from 'react-slick'

type ArrowType = {
    direction: 'left' | 'right'
    color?: string
}

const Arrow = ({
    className,
    onClick,
    direction,
    color = 'white'
}: CustomArrowProps & ArrowType): JSX.Element => {
    return (
        // eslint-disable-next-line
        <div className={className} onClick={onClick} role="button" tabIndex={0}>
            <button>
                {direction === 'left' ? (
                    <ChevronLeft className="chevron-left" color={color} />
                ) : (
                    <ChevronRight className="chevron-right" color={color} />
                )}
            </button>
        </div>
    )
}

export default Arrow
