import React, { FC } from 'react'
import cn from 'classnames'
import s from './SupportTab.module.scss'
import Image from '@corratech/corsair-image'
import { TextArea } from './TextArea'
import type {
    IImageContent,
    IPageContentEntries,
    ITextContent,
    IVideoContent
} from './SupportTabWrapper'
import { MetaContentTypeEnum } from './SupportTabWrapper'
import dynamic from 'next/dynamic'
import type { TVideoPlayer } from '@corratech/corsair-video-player'

const VideoPlayer = dynamic<TVideoPlayer>(() =>
    import('@corratech/corsair-video-player').then(
        (module) => module.VideoPlayer
    )
)

interface ISupportContentPage {
    data: IPageContentEntries[] | undefined
}

export const SupportContentPage: FC<ISupportContentPage> = ({ data }) => {
    return (
        <ul className={s['support-content']}>
            {data &&
                data.map((item, index: number) => {
                    switch (item.meta.contentType) {
                        case MetaContentTypeEnum.cmsBlock: {
                            return (
                                <li key={index} className="text-area-container">
                                    <div>
                                        {'image' in item && item?.image && (
                                            <div
                                                className={cn(
                                                    s['icon-container'],
                                                    'icon-container'
                                                )}
                                            >
                                                <Image
                                                    src={item.image.file.url}
                                                    alt={item.title || ''}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        )}
                                        <div className="text-wrapper">
                                            <TextArea
                                                text={
                                                    (item as ITextContent)
                                                        .content
                                                }
                                            />
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        case MetaContentTypeEnum.logoimage: {
                            return (
                                <li
                                    key={index}
                                    className={cn(
                                        s['support-image-container'],
                                        'support-image-container'
                                    )}
                                >
                                    <Image
                                        src={
                                            (item as IImageContent).image.file
                                                .url
                                        }
                                        alt={item.title || ''}
                                        layout="fill"
                                        objectFit="contain"
                                        className={s['support-image']}
                                    />
                                </li>
                            )
                        }
                        case MetaContentTypeEnum.video: {
                            return (
                                <li
                                    key={index}
                                    className={cn(
                                        s['support-video-container'],
                                        'support-video-container'
                                    )}
                                >
                                    <VideoPlayer
                                        playEmbedVideo
                                        autoplay={0}
                                        url={(item as IVideoContent).url}
                                    />
                                </li>
                            )
                        }
                    }
                })}
        </ul>
    )
}
