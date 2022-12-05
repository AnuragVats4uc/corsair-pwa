import React, { FC } from 'react'
import s from './IconButton.module.scss'
import cn from 'classnames'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'

export interface IconButtonPropTypes {
    image: ImageType
    label: string
    onClick: () => void
    size: number
    active: boolean
}

const IconButton: FC<IconButtonPropTypes> = ({
    image,
    label,
    onClick,
    size,
    active
}) => {
    return (
        <div
            className={cn(s['icon-button-wrapper'], {
                [s.active]: active
            })}
            onClick={() => onClick()}
            onKeyUp={() => {
                onClick()
            }}
            role="button"
            tabIndex={0}
        >
            <div>
                <section className={s['icon-wrapper']}>
                    <div
                        className={cn('flex')}
                        style={{ maxWidth: `${size}%` }}
                    >
                        <Image
                            src={image.file.url}
                            alt={image.description}
                            width={size}
                            height={size}
                            onClick={() => onClick()}
                        />
                    </div>
                </section>
                <span className={s['icon-button-wrapper-label']}>{label}</span>
            </div>
        </div>
    )
}

export default IconButton
