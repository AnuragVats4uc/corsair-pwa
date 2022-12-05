import Slider from 'react-slick'
import { IMGGridSystemProps, CustomArrowProps } from '../types'
import Image from '@corratech/corsair-image'
import ChevronRight from '@components/icons/ChevronRight'
import ChevronLeft from '@components/icons/ChevronLeft'
import { twc } from './BuiltInMultiMountStyling'
import { HeaderMount } from './HeaderMount'
import Skeleton from 'react-loading-skeleton'

import s from './BuiltInMount.module.scss'

type Props = {
    content: IMGGridSystemProps
}

function SampleNextArrow(props: CustomArrowProps) {
    const { style, onClick } = props
    return (
        <div
            className={twc.next}
            style={{ ...style }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-hidden="true"
        >
            <ChevronRight className={twc.rightArrow} />
        </div>
    )
}

function SamplePrevArrow(props: CustomArrowProps) {
    const { style, onClick } = props
    return (
        <div
            className={twc.prev}
            style={{ ...style }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-hidden="true"
        >
            <ChevronLeft className={twc.leftArrow} />
        </div>
    )
}

const BuiltInMultiMount = ({ content }: Props): JSX.Element | null => {
    if (!content) return <Skeleton height="35vw" />

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrrow: true
    }
    return (
        <section className={s['builtinMount']}>
            <HeaderMount content={content} />
            <div className={s['slick-container']}>
                <Slider {...settings}>
                    {content.backgroundSlider?.map((d, key) => (
                        <div className={s['slick-height']} key={key}>
                            <Image
                                src={d.file.url}
                                alt={d.description}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
export default BuiltInMultiMount
