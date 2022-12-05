import React from 'react'
import Image from '@corratech/corsair-image'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import type { LeftRightTextResponse } from '../LeftRightText/LeftRightText'
import { DisclaimerBlock } from '../DisclaimerBlock'
import LeftRightText from '../LeftRightText/LeftRightText'

import s from './BannerWithTwoImages.module.scss'

export interface BannerWithTwoImagesResponse {
    title: string
    backgroundColor?: string
    fontColor?: string
    backgroundImage?: ImageType
    disclaimer: string
    desktopImageOne: ImageType
    mobileImageOne?: ImageType
    imageOneLabel?: string
    imageOneLabelColor?: string
    imageOneDescription?: string
    imageOneDescriptionColor?: string
    desktopImageTwo: ImageType
    mobileImageTwo?: ImageType
    imageTwoLabel?: string
    imageTwoLabelColor?: string
    imageTwoDescription?: string
    imageTwoDescriptionColor?: string
    leftRightTextLayout?: LeftRightTextResponse
    meta: { contentType: string }
}

export interface BannerWithTwoImagesProps {
    content: BannerWithTwoImagesResponse
}

const c = /*tw*/ {
    bannerWithTwoImagesContainer: `${s['banner-with-two-images-container']} block lg:m-auto pb-8 lg:pb-20`,
    bannerWithTwoImages: `${s['banner-with-two-images']} block`,
    bannerImages: `${s['banner-images']} flex gap-4 sm:flex-col sm:gap-0`,
    bannerImageContainer: `${s['banner-image-container']} flex relative flex-1 flex-col-reverse text-center mb-5 sm:flex-col sm:text-left sm:mb-20`,
    bannerImageContent: `${s['banner-image-content']} flex flex-col mt-12 sm:mt-0`,
    bannerImageLabel: `${s['banner-image-label']} block font-semibold leading-8 font-tertiary`,
    bannerImageDescription: `${s['banner-image-description']} block font-semibold leading-6 font-tertiary`
}

const BannerWithTwoImages = ({
    content
}: BannerWithTwoImagesProps): JSX.Element => {
    const isMobile = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px)').matches

    const bannerImage = ({
        image,
        label,
        labelColor,
        description,
        descriptionColor
    }: {
        image: ImageType
        label: string | undefined
        labelColor: string | undefined
        description: string | undefined
        descriptionColor: string | undefined
    }) => {
        return (
            <div className={c.bannerImageContainer}>
                <div className={c.bannerImageContent}>
                    {label && (
                        <span
                            className={c.bannerImageLabel}
                            style={{
                                color: labelColor || 'white'
                            }}
                        >
                            {label}
                        </span>
                    )}
                    {description && (
                        <span
                            className={c.bannerImageDescription}
                            style={{
                                color: descriptionColor || 'white'
                            }}
                        >
                            {description}
                        </span>
                    )}
                </div>
                <Image
                    src={image?.file?.url}
                    alt={image?.description}
                    width={image?.file?.details?.image?.width}
                    height={image?.file?.details?.image?.height}
                    objectFit="contain"
                />
            </div>
        )
    }

    const bannerImages = () => {
        return (
            <div className={c.bannerImages}>
                {bannerImage({
                    image: isMobile()
                        ? content?.mobileImageOne
                            ? content?.mobileImageOne
                            : content?.desktopImageOne
                        : content?.desktopImageOne,
                    label: content?.imageOneLabel,
                    labelColor: content?.imageOneLabelColor,
                    description: content?.imageOneDescription,
                    descriptionColor: content?.imageOneDescriptionColor
                })}
                {bannerImage({
                    image: isMobile()
                        ? content?.mobileImageTwo
                            ? content?.mobileImageTwo
                            : content?.desktopImageTwo
                        : content?.desktopImageTwo,
                    label: content?.imageTwoLabel,
                    labelColor: content?.imageTwoLabelColor,
                    description: content?.imageTwoDescription,
                    descriptionColor: content?.imageTwoDescriptionColor
                })}
            </div>
        )
    }

    return (
        <div
            className="block"
            style={{
                background: content?.backgroundImage
                    ? `url(${content?.backgroundImage?.file?.url})`
                    : `transparent`
            }}
        >
            <div
                style={{
                    background: content?.backgroundColor
                        ? `${content?.backgroundColor}`
                        : 'transparent'
                }}
            >
                <div className={c.bannerWithTwoImagesContainer}>
                    {content?.leftRightTextLayout && (
                        <LeftRightText content={content?.leftRightTextLayout} />
                    )}
                    <div className={c.bannerWithTwoImages}>
                        {bannerImages()}
                        {content?.disclaimer && (
                            <DisclaimerBlock
                                disclaimer={content?.disclaimer}
                                fontColor={content?.fontColor}
                                style={{
                                    borderTop: `2px solid ${
                                        content?.fontColor || 'white'
                                    }`
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerWithTwoImages
