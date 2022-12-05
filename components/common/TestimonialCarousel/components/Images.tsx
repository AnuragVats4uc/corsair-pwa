import { VFC } from 'react'
import type {
    TestimonialBlockProps,
    TestimonialBlockLogoImageProp
} from '../types'
import Image from '@corratech/corsair-image'
import s from '../TestimonialCarousel.module.scss'

export const MainImage: VFC<TestimonialBlockProps> = ({
    testimonialBlock: {
        mainImage: {
            file: { url: mainImage, details },
            description
        }
    }
}) => {
    return (
        <div
            className={`${s['testimonial-block-padding']} md:relative md:w-full`}
        >
            <div
                className={`${s['testimonial-block-img']} relative md:static place-items-start `}
            >
                <Image
                    className="rounded"
                    src={mainImage}
                    alt={description || ''}
                    height={details.image.height}
                    width={details.image.width}
                />
            </div>
        </div>
    )
}

export const LogoImage: VFC<TestimonialBlockLogoImageProp> = ({
    logo: {
        file: { url: logoImage },
        description
    }
}) => {
    return (
        <div className={`${s['text-logo-img']} rounded relative`}>
            <Image src={logoImage} alt={description || ''} layout="fill" />
        </div>
    )
}
