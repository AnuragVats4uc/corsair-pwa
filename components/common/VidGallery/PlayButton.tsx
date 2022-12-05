import Play from '@components/icons/Play'
import { CustomArrowProps } from 'react-slick'

type PlayButtonType = {
    color?: string
}

const PlayButton = ({
    className,
    onClick,
    color = 'white'
}: CustomArrowProps & PlayButtonType): JSX.Element => {
    return (
        // eslint-disable-next-line
        <div className={className} onClick={onClick} role="button" tabIndex={0}>
            <button>
                <Play className="play-button" color={color} />
            </button>
        </div>
    )
}

export default PlayButton
