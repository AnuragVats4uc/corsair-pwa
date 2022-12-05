import Image from '@corratech/corsair-image'
import s from './SlideHow.module.scss'
import { CarouselHowItemType } from '@components/common/CarouselHow/CarouselHow'
import cn from 'classnames'
import snarkdown from 'snarkdown'

export const getSlide: React.FC<CarouselHowItemType> = ({ mediaDesktop }) => {
    return (
        <div className={s['media']}>
            {mediaDesktop?.file.contentType.startsWith('image') && (
                <Image
                    src={mediaDesktop?.file?.url}
                    alt={mediaDesktop?.description || ''}
                    layout="fill"
                    objectFit="cover"
                />
            )}
        </div>
    )
}

const SlideHow = ({
    content
}: {
    content: CarouselHowItemType
}): JSX.Element => {
    const { heading, subHeading, mediaDesktop, description } = content
    const link = heading?.url
    const subHeadingMd = snarkdown(subHeading)
    const descriptionMd = snarkdown(description)

    return (
        <div className={s['main-container']}>
            <div className={cn(s['slider-container'], 'slider-list')}>
                {mediaDesktop && getSlide(content)}
            </div>
            <div className={s['extra-info-container']}>
                <div className={s['heading']}>
                    <a href={link}>{heading?.displayText}</a>
                </div>
                {subHeading && (
                    <div
                        className={s['sub-heading']}
                        dangerouslySetInnerHTML={{ __html: subHeadingMd }}
                    />
                )}
                {description && (
                    <div
                        className={s['description']}
                        dangerouslySetInnerHTML={{ __html: descriptionMd }}
                    />
                )}
            </div>
        </div>
    )
}

export default SlideHow
