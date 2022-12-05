import cn from 'classnames'
import s from './BelowTheLine.module.scss'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'

type BelowImageProps = {
    productImage: ImageType
    imageWidth?: string
    imageHeight?: string
}

export const BelowTheLineImage = ({
    productImage,
    imageWidth,
    imageHeight
}: BelowImageProps) => {
    if (!productImage) return null
    return (
        <div className={cn(s['below-the-line-image'], 'mx-auto relative')}>
            <Image
                src={productImage?.file?.url}
                alt={productImage?.description}
                width={
                    imageWidth
                        ? imageWidth
                        : productImage?.file?.details?.image?.width
                }
                height={
                    imageHeight
                        ? imageHeight
                        : productImage?.file?.details?.image?.height
                }
            />
        </div>
    )
}
