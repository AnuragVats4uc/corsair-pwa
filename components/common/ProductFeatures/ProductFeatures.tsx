import React, { VFC } from 'react'
import cn from 'classnames'
import s from './ProductFeatures.module.scss'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
export interface Image {
    width: number
    height: number
}

export interface Details {
    size: number
    image: Image
}

export interface File {
    url: string
    details: Details
}

export interface Icon {
    title: string
    description: string
    file: File
}

export interface Feature {
    title: string
    headerTitle: string
    description: string
    ctaLabel: string
    ctaUrl: string
    icon: Icon
}

const Feature: VFC<Feature> = (feature) => (
    <div
        key={feature.headerTitle}
        className={cn(
            s['product-feature-item'],
            'flex items-center justify-start mb-6'
        )}
    >
        <div
            className={cn(
                s['product-feature-item-image'],
                'w-20 h-20 rounded mr-8 flex items-center justify-center'
            )}
        >
            <Image
                src={feature.icon.file.url}
                alt={feature?.icon?.description || ''}
                width={feature.icon.file.details.image.width}
                height={feature.icon.file.details.image.height}
            />
        </div>
        <div className="flex items-start flex-col justify-center">
            <h5 className="font-bebasNeueExtraBold text-white uppercase mb-4">
                {feature.headerTitle}
            </h5>
            <p className="font-aktivGrotesk">
                <span>{feature.description}</span>
                <Link href={feature.ctaUrl}>{feature.ctaLabel}</Link>
            </p>
        </div>
    </div>
)

const Features: VFC<{ features: Feature[] | undefined }> = ({ features }) => {
    const { t } = useTranslation(['common'])

    if (!features) {
        return null
    }

    const featuresList = features.map((feature) => (
        <Feature key={feature.headerTitle} {...feature} />
    ))

    return (
        <div
            className={cn(s['product-features'], 'flex justify-start flex-col')}
        >
            <h3 className="font-bebasNeueExtraBold text-white uppercase mb-4">
                {t('Features')}
            </h3>
            <div>{featuresList}</div>
        </div>
    )
}

const ProductFeatures = React.memo(Features)

export { ProductFeatures }
