import CarouselProductTiles from '@components/common/CarouselProductTiles'
import CarouselTestimonial from '@components/common/CarouselTestimonial'
import {
    CarouselImageText,
    CarouselImageTextProp,
    CarouselImageTextType
} from '../CarouselImageText'
import { CslContainerTiles } from '../CarouselProductTiles/CarouselProductTiles'
import { CslContainer } from '../CarouselTestimonial/CarouselTestimonial'

export type CarouselWrapperProps = {
    content: CslContainer | CslContainerTiles | CarouselImageTextType
}

const CarouselWrapper = ({ content }: CarouselWrapperProps) => {
    const carosuelWrapper = () => {
        switch (content.displayType) {
            case 'products': {
                return (
                    <CarouselProductTiles
                        content={content as CslContainerTiles}
                    />
                )
            }
            case 'testimonial': {
                return <CarouselTestimonial content={content as CslContainer} />
            }
            case 'image/text': {
                return (
                    <CarouselImageText
                        content={content as CarouselImageTextType}
                    />
                )
            }
        }
    }
    return <>{carosuelWrapper()}</>
}

export default CarouselWrapper
