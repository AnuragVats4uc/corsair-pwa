import { FC } from 'react'
import {
    ImageLinkType,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
import s from './CorsairOneBlock.module.scss'
import cn from 'classnames'
export interface CorsairOneBlockType {
    heading?: string
    backgroundImage?: ImageType
    blockItems: ImageLinkType[]
}

export interface CorsairOneBlockProps {
    content: CorsairOneBlockType
}

const CorsairOneBlock: FC<CorsairOneBlockProps> = ({ content }) => {
    const renderItems = content?.blockItems?.map((blockItem, index) => (
        <div
            key={index}
            className={cn(
                s['items-block'],
                'flex justify-items-end md:justify-evenly items-start md:items-end flex-col-reverse md:flex-row'
            )}
        >
            <div className={s['text-container']}>
                {blockItem?.heading && (
                    <h3
                        style={{ color: `#${blockItem?.headingColor}` }}
                        dangerouslySetInnerHTML={{ __html: blockItem.heading }}
                    />
                )}
                {blockItem?.description && (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: blockItem.description
                        }}
                    />
                )}
            </div>
            <div className={s['image-container']}>
                {blockItem?.image?.file && (
                    <Image
                        src={blockItem?.image?.file?.url}
                        width={blockItem?.image?.file?.details?.image?.width}
                        height={blockItem?.image?.file?.details?.image?.height}
                        alt={blockItem?.image?.description}
                    />
                )}
            </div>
        </div>
    ))

    if (!content) return null

    const styles = content?.backgroundImage?.file
        ? { backgroundImage: `url(${content.backgroundImage?.file?.url})` }
        : {}

    return (
        <div className="bg-cover" style={styles}>
            <div
                className={cn(
                    s['one-block-container'],
                    'text-white w-full lg:w-4/5 m-auto'
                )}
            >
                {content?.heading && (
                    <h2 className={s['top-heading']}>{content?.heading}</h2>
                )}
                <div className={cn(s['item-container'], 'flex justify-evenly')}>
                    {renderItems}
                </div>
            </div>
        </div>
    )
}

export default CorsairOneBlock
