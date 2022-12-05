import { useEffect } from 'preact/hooks'
import React, { CSSProperties, useRef, VFC } from 'react'
import s from '@components/common/Tooltip/Tooltip.module.scss'
import cn from 'classnames'
import Close from '@components/icons/Close'
import snarkdown from 'snarkdown'
import Image from '@corratech/corsair-image'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export enum TooltipPositionEnum {
    TOP_LEFT = 'Top Left',
    TOP_RIGHT = 'Top Right',
    BOTTOM_LEFT = 'Bottom Left',
    BOTTOM_RIGHT = 'Bottom Right'
}
export const DEFAULT_TOOLTIP_POSITION = TooltipPositionEnum.BOTTOM_LEFT
export interface ITooltipCoordinate {
    point: string
    top: string
    left: string
}
export interface ITooltip {
    title: string
    heading?: string
    image?: ImageType
    subHeading?: string
    desktopCoordinate?: ITooltipCoordinate
    mobileCoordinate?: ITooltipCoordinate
    popUpDirection?: TooltipPositionEnum
    imageDescriptionFirstLine: string
    imageDescriptionSecondLine: string
}

interface IIconWrapper {
    onClose: () => void
    className?: string
}
export interface ITooltipProps {
    className?: string
    content: ITooltip
    onClose: () => void
    style?: CSSProperties
    isScrollActive?: boolean
    imageLeft?: boolean
}

const getTooltipPosition = (position?: TooltipPositionEnum) => {
    const positionClasses = {
        [TooltipPositionEnum.TOP_LEFT]: 'position-top-left',
        [TooltipPositionEnum.TOP_RIGHT]: 'position-top-right',
        [TooltipPositionEnum.BOTTOM_LEFT]: 'position-bottom-left',
        [TooltipPositionEnum.BOTTOM_RIGHT]: 'position-bottom-right'
    }
    return position && positionClasses[position]
        ? positionClasses[position]
        : positionClasses[DEFAULT_TOOLTIP_POSITION]
}

const c = /*twc*/ {
    heading: 'text-white font-bebasNeue uppercase font-semibold',
    subHeading: 'text-white font-aktivGrotesk font-light whitespace-pre-wrap',
    closeIcon: 'max-w-full block h-auto',
    imageWrapper: ' flex justify-center mx-auto',
    imageDescriptionWrapper: 'flex flex-col px-7 pb-7'
}

const IconWrapper: VFC<IIconWrapper> = ({ onClose, className }) => {
    return (
        <div className={cn(s['icon-wrapper'], className)}>
            <div className={s['icon-wrapper-inner']}>
                <div
                    className={cn(c.imageWrapper, s['image-wrapper'])}
                    onClick={onClose}
                    role="button"
                    tabIndex={0}
                    onKeyPress={onClose}
                >
                    <Close
                        widt="8"
                        height="8"
                        className={cn(c.closeIcon, s['close-icon'])}
                    />
                </div>
            </div>
        </div>
    )
}

export const Tooltip: VFC<ITooltipProps> = (props) => {
    const {
        content,
        onClose,
        style,
        isScrollActive = true,
        className,
        imageLeft
    } = props
    const {
        heading,
        subHeading,
        image,
        popUpDirection,
        imageDescriptionFirstLine,
        imageDescriptionSecondLine
    } = content
    const toolTipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            isScrollActive &&
            toolTipRef.current
        ) {
            const rectObject = toolTipRef.current.getBoundingClientRect()
            const extraDistance = window.screen.width < 768 ? 110 : 16

            if (rectObject.bottom > window.innerHeight) {
                window.scroll({
                    top:
                        window.scrollY +
                        rectObject.bottom -
                        window.innerHeight +
                        extraDistance,
                    behavior: 'smooth'
                })
            }
        }
    }, [toolTipRef, content, isScrollActive])

    const subHeadingHtml = snarkdown(subHeading || '')
    return (
        <div
            ref={toolTipRef}
            className={cn(
                s['tooltip-container'],
                s['animate'],
                s[getTooltipPosition(popUpDirection)],
                className
            )}
            style={style}
        >
            {imageLeft && (
                <div className={s['text-wrapper']}>
                    {heading && <h4 className={s['heading']}>{heading}</h4>}
                </div>
            )}
            {image && imageLeft && (
                <section className={cn('px-7 pb-4')}>
                    <Image
                        alt={image?.description}
                        height={image?.file.details.image.height}
                        src={image?.file.url}
                        width={image?.file.details.image.width}
                    />
                </section>
            )}
            {image && !imageLeft && (
                <Image
                    alt={image?.description}
                    height={216}
                    src={image?.file.url}
                    width={448}
                />
            )}
            <IconWrapper
                onClose={onClose}
                className={`${cn(s['tooltip-icon-header'], {
                    ['has-image']: image
                })}`}
            />
            {(imageDescriptionFirstLine || imageDescriptionSecondLine) && (
                <div className={c.imageDescriptionWrapper}>
                    {imageDescriptionFirstLine && (
                        <span className={s['image-description']}>
                            {imageDescriptionFirstLine}
                        </span>
                    )}
                    {imageDescriptionSecondLine && (
                        <span className={s['image-description-2']}>
                            {imageDescriptionSecondLine}
                        </span>
                    )}
                </div>
            )}
            {!imageLeft && (
                <div className={s['text-wrapper']}>
                    {heading && (
                        <h4 className={cn(c.heading, s['heading'])}>
                            {heading}
                        </h4>
                    )}
                    {subHeadingHtml && (
                        <div
                            className={cn(c.subHeading, s['sub-heading'])}
                            dangerouslySetInnerHTML={{ __html: subHeadingHtml }}
                        />
                    )}
                </div>
            )}
            <IconWrapper
                onClose={onClose}
                className={cn('hidden', s['tooltip-icon-footer'])}
            />
        </div>
    )
}
