import React from 'react'
import { HeroBannerItem } from './HeroBannerItem'
import { BannerItemType } from '@components/common/Carousel/Carousel'

export interface HeroBannerItemType extends BannerItemType {
    description?: string
}

export interface BannerType {
    animation?: boolean
    bannerItems: HeroBannerItemType[]
    headingType: string[]
}
export interface BannerProps {
    content?: BannerType | null
}

const HeroBanner = ({ content }: BannerProps): JSX.Element | null => {
    if (!content) return null

    const { animation = true, bannerItems = [], headingType } = content
    return (
        <div className="h-full">
            <HeroBannerItem
                content={bannerItems[0]}
                headingType={headingType}
            />
        </div>
    )
}

export default HeroBanner
