import React, { VFC } from 'react'
import cn from 'classnames'
import ChevronRightBanner from '@components/icons/ChevronRightBanner'
import { CardCurrentPosition, SmartHomeProduct } from './SmartHome.interfaces'
import s from './SmartHome.module.scss'
import { generateTransform } from './SmartHomeZoomContainer'
import {
    FileType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '../Carousel/VideoFilePlayer'
import Image from '@corratech/corsair-image'

interface SmartHomeDescriptionProps {
    icon: FileType
    headerTitle: string
    headerSubtitle: string
    ctaLabel: string
    ctaUrl: string
    video: VideoType
    dotItems: React.ReactElement[]
    activeProduct: SmartHomeProduct | undefined
}

export const SmartHomeDescription: VFC<SmartHomeDescriptionProps> = ({
    icon,
    headerTitle,
    headerSubtitle,
    ctaLabel,
    ctaUrl,
    video,
    dotItems,
    activeProduct
}) => (
    <div
        style={{ zIndex: activeProduct ? -1 : 30 }}
        className="flex lg:items-center lg:justify-center lg:flex-row flex-col justify-start"
    >
        <div
            className={cn(
                s['smart-home-left-container'],
                'flex flex-col justify-center md:p-8 pb-5 pt-4 px-4 relative'
            )}
        >
            <span
                className={cn(
                    s['smart-home-left-container-image'],
                    'relative block'
                )}
            >
                <Image
                    alt={headerTitle}
                    src={icon.url}
                    layout="responsive"
                    width={icon.details.image.width}
                    height={icon.details.image.height}
                />
            </span>
            <h2 className="font-bebasNeueExtraBold tracking-normal font-medium text-white whitespace-pre">
                {headerTitle}
            </h2>
            <p className="text-white font-light font-aktivGrotesk">
                {headerSubtitle}
            </p>
            <a
                className="flex items-center justify-start font-aktivGrotesk font-medium whitespace-pre"
                href={ctaUrl}
                rel="noreferrer"
                target="_blank"
            >
                {ctaLabel}
                <span className={s['right-arrow-wrapper']}>
                    <ChevronRightBanner />
                </span>
            </a>
        </div>
        <div className={cn(s['smart-home-right-container'], 'relative')}>
            <VideoFilePlayer
                style={{
                    transform: generateTransform(
                        activeProduct,
                        CardCurrentPosition.SMARTROOM_DESKTOP
                    )
                }}
                className="hidden lg:block"
                videos={[video]}
            />
            <VideoFilePlayer className="block lg:hidden" videos={[video]} />
            {dotItems}
        </div>
    </div>
)
