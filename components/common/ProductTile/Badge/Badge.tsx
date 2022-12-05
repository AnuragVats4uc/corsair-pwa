import React, { FC } from 'react'
import cn from 'classnames'
import s from './Badge.module.scss'
import { useTranslation } from 'next-i18next'

export enum BadgesEnum {
    BESTSELLER = 'BESTSELLER',
    NEW = 'NEW',
    EXCLUSIVE = 'EXCLUSIVE'
}

interface IBadge {
    label: BadgesEnum | null
    className?: string
    isPdpPage?: boolean
}

const badgeNames = {
    [BadgesEnum.BESTSELLER]: 'Best Seller',
    [BadgesEnum.NEW]: 'New',
    [BadgesEnum.EXCLUSIVE]: 'Exclusive'
}

const containerClasses =
    'absolute inline-block z-2 font-bebasNeue overflow-hidden select-none text-center m-0 left-0 text-white uppercase'

const badgeClasses = {
    [BadgesEnum.BESTSELLER]: 'best-seller',
    [BadgesEnum.NEW]: 'new',
    [BadgesEnum.EXCLUSIVE]: 'exclusive'
}

export const Badge: FC<IBadge> = ({ label, className, isPdpPage }) => {
    const { t } = useTranslation(['common'])

    if (!label || !badgeNames[label]) {
        return null
    }

    return (
        <div
            className={cn(
                containerClasses,
                {
                    [s['badge-container']]: !isPdpPage,
                    [s[badgeClasses[label]]]: badgeClasses[label]
                },
                className
            )}
        >
            {t(badgeNames[label])}
        </div>
    )
}
