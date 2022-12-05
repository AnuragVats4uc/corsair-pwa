import s from './SlideHow.module.scss'
import { CarouselHowItemType } from '@components/common/CarouselHow/CarouselHow'
import { getSlide } from './SlideHow'

const SlideHow = ({
    content
}: {
    content: CarouselHowItemType
}): JSX.Element => {
    const { mediaDesktop } = content

    return (
        <div className={s['image-container']}>
            {mediaDesktop && getSlide(content)}
        </div>
    )
}

export default SlideHow
