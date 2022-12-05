import Image from '@corratech/corsair-image'
import { VFC } from 'react'
import s from '../ProductCallouts.module.scss'
import { ImageType } from '../../../../framework/pylot/hooks/contentful/use-content-json'
import classNames from 'classnames'

type ImageProp = {
    image: ImageType
    imageWidth?: string
    imageHeight?: string
}

export const MainImage: VFC<ImageProp> = ({
    image: {
        file: { url },
        description
    },
    imageWidth,
    imageHeight
}) => {
    return (
        <>
            <div
                className={`${s['callout-image-padding']} relative w-full hidden md:block`}
            >
                <div
                    className={classNames(
                        `${s['callout-image']}`,
                        'text-center'
                    )}
                >
                    <Image
                        width={imageWidth ? imageWidth : 335}
                        height={imageHeight ? imageHeight : 335}
                        alt={description}
                        src={url}
                    />
                </div>
            </div>
            <div className={`${s['callout-image']} relative block md:hidden`}>
                <Image
                    width={imageWidth ? imageWidth : 335}
                    height={imageHeight ? imageHeight : 335}
                    alt={description}
                    src={url}
                />
            </div>
        </>
    )
}
