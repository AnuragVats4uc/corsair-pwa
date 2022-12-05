import s from './CarouselTestimonial.module.scss'
import { CSLTestimonialObject } from './CarouselTestimonial'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
interface SliderProps {
    cslData: CSLTestimonialObject
    key: number
    className?: string
}

const c /*twc*/ = {
    cslWrapper: `flex items-center my-0 mx-auto ${s['csl-wrapper']}`,
    logoTextContainer: `${s['logo-text-container']} w-1/2 h-full`,
    testimonialText: `${s['testimonial-text']} font-light lg:text-left`,
    testimonialSubHeading: `${s['testimonial-subheading']} font-bebasNeue uppercase`
}

const Slide = ({ cslData, key, className }: SliderProps) => {
    const { logo, subheading, text } = cslData
    return (
        <div className={cn(c.cslWrapper, className)} key={key}>
            <div className={s['img-gradient']}>
                {cslData.mainImage.file.url && (
                    <Image
                        layout="fill"
                        className="object-cover"
                        src={`${cslData.mainImage.file.url}`}
                        alt={cslData.mainImage.description || ''}
                    />
                )}
            </div>

            <div className={c.logoTextContainer}>
                <div className={s['logo-wrapper']}>
                    {logo?.file.url && (
                        <Image
                            layout="fill"
                            className="block object-contain"
                            src={`${logo?.file.url}`}
                            alt={logo?.description || ''}
                        />
                    )}
                </div>
                {text && <p className={c.testimonialText}>{text}</p>}
                {subheading && (
                    <p className={c.testimonialSubHeading}>{subheading}</p>
                )}
            </div>
        </div>
    )
}

export default Slide
