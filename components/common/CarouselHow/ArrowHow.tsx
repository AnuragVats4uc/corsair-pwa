import ChevronRightCircle from '@components/icons/ChevronRightCircle'
import { CustomArrowProps } from 'react-slick'

type ArrowType = {
    color?: string
}

const Arrow = ({
    className,
    onClick,
    color = 'white'
}: CustomArrowProps & ArrowType): JSX.Element => {
    return (
        // eslint-disable-next-line
        <div className={className} onClick={onClick} role="button" tabIndex={0}>
            <button>
                <ChevronRightCircle className="chevron" color={color} />
            </button>
        </div>
    )
}

export default Arrow
