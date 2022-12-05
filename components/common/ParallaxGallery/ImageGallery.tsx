import React, { useEffect, useRef } from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'

import s from './ParallaxGallery.module.scss'

export interface ImageGalleryProps {
    image1: ImageType
    image2: ImageType
    image3?: ImageType
}

const c = {
    imageGallery: `${s['imageGallery']} block w-full relative overflow-hidden`,
    parallaxImage: `${s['parallaxImage']} block absolute w-full`
}

const ImageGallery = ({
    image1,
    image2,
    image3
}: ImageGalleryProps): JSX.Element => {
    const parallaxImageOneRef = useRef<HTMLDivElement>(null)
    const parallaxImageTwoRef = useRef<HTMLDivElement>(null)
    const parallaxImageThreeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll)
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    const handleScroll = () => {
        const paralax1 = parallaxImageOneRef.current
        const paralax2 = parallaxImageTwoRef.current
        const paralax3 = parallaxImageThreeRef.current

        if (paralax1 && paralax2) {
            const { top, bottom } = paralax1.getBoundingClientRect()
            const vHeight =
                window.innerHeight || document.documentElement.clientHeight

            if (
                (top > 0 || bottom > 0) &&
                top < vHeight &&
                ((isDesktop() && paralax2.getBoundingClientRect().top > 0) ||
                    (!isDesktop() &&
                        paralax1.getBoundingClientRect().top >=
                            screen?.availHeight / 2.5))
            ) {
                paralax1.style.top = `${
                    (window.innerHeight -
                        paralax1.getBoundingClientRect().top) *
                    0.3
                }px`
                paralax2.style.top = `${
                    (paralax1.getBoundingClientRect().top / 2) *
                    (isMobile() ? 0.2 : 0.15)
                }px`

                if (paralax3) {
                    paralax3.style.top = `${
                        (window.innerHeight -
                            paralax1.getBoundingClientRect().top) *
                        0.15
                    }px`
                }
            }
        }
    }

    const isDesktop = () =>
        typeof window !== 'undefined' &&
        !window.matchMedia('(max-width: 1023px)').matches

    const isMobile = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px)').matches

    return (
        <div className={c.imageGallery}>
            <div ref={parallaxImageOneRef} className={c.parallaxImage}>
                <Image
                    src={image1?.file?.url}
                    alt={image1?.description}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div ref={parallaxImageTwoRef} className={c.parallaxImage}>
                <Image
                    src={image2?.file?.url}
                    alt={image2?.description}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            {image3 && (
                <div ref={parallaxImageThreeRef} className={c.parallaxImage}>
                    <Image
                        src={image3?.file?.url}
                        alt={image3?.description}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
        </div>
    )
}

export default ImageGallery
