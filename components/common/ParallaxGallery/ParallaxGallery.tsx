import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import TopTextLayout from '@components/common/TopTextLayout'
import type { TopTextLayoutType } from '@components/common/TopTextLayout'
import ImageGallery from './ImageGallery'
import cn from 'classnames'

import s from './ParallaxGallery.module.scss'

export interface ParallaxGalleryResponse {
    backgroundColor: string
    image1: ImageType
    image2: ImageType
    image3?: ImageType
    meta: { contentType: string }
    title: string
    topTextLayout: TopTextLayoutType
    pageBackgroundImage?: ImageType
}

export interface ParallaxGalleryProps {
    content: ParallaxGalleryResponse
}

const c = {
    parallaxGallery: `${s['parallaxGallery']} block text-white`
}

const ParallaxGallery = ({ content }: ParallaxGalleryProps): JSX.Element => {
    return (
        <div
            className={cn(
                c.parallaxGallery,
                !content.pageBackgroundImage && 'bg-black'
            )}
        >
            {content?.topTextLayout && (
                <TopTextLayout data={content?.topTextLayout} />
            )}
            <ImageGallery
                image1={content?.image1}
                image2={content?.image2}
                image3={content?.image3}
            />
        </div>
    )
}

export default ParallaxGallery
