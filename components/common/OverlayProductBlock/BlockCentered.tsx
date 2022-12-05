import React, { useRef, useState, VFC } from 'react'
import Image from '@corratech/corsair-image'
import s from './BlockCentered.module.scss'
import sf from './OverlayProductBlock.module.scss'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import cn from 'classnames'
import type {
    IBackgroundColor,
    IGenericProductBlock,
    IMeta
} from '@components/common/types'
import type { ITooltip } from '../Tooltip/Tooltip'
import snarkdown from 'snarkdown'
import { ToolTipIcons } from './ToolTipIcons'
import { BackDropClickTooltip } from './BackdropClickTooltip'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export enum EOverlayLayout {
    CENTERED = 'Centered',
    FULL_SCREEN = 'Full Screen'
}
export interface IOverlayContent {
    title: string
    layout?: EOverlayLayout
    animationThreshold?: number
    productBlock: IGenericProductBlock
    description?: string
    tooltips?: ITooltip[]
    meta: IMeta<'overlayProductBlock'>
    background?: IBackgroundColor
    pageBackgroundImage?: ImageType
}
export interface IOverlayProductBlock {
    content: IOverlayContent
}

const DEFAULT_ANIMATION_THRESHOLD = 0.75

const BlockCentered: VFC<IOverlayProductBlock> = ({ content }) => {
    const {
        productBlock,
        tooltips,
        description: productDescription,
        animationThreshold,
        background
    } = content

    const { colorHex, gradient, gradientColor, backgroundImage } =
        background || {}
    const backgroundColor = gradientColor ? gradient : colorHex
    const animateRef = useRef(null)
    const { isOnScreen, isAboveRootMargin } = useOnScreen(animateRef, true, {
        threshold: animationThreshold || DEFAULT_ANIMATION_THRESHOLD
    })
    const [activeTooltip, setActiveTooltip] = useState<ITooltip | undefined>(
        undefined
    )

    const { heading, text: subHeading, copy, productImage } = productBlock

    const { url: desktopUrl } = productImage?.file
    const { description: desktopDescription } = productImage

    const subHeadingHtml = snarkdown(subHeading || '')

    const handleClick = (tooltipContent: ITooltip) => {
        setActiveTooltip(tooltipContent)
    }

    const handleClose = () => {
        setActiveTooltip(undefined)
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage?.file.url}), ${backgroundColor}`,
                backgroundColor: `${backgroundColor}`
            }}
            className={cn(
                s['container'],
                !content.pageBackgroundImage && 'bg-black'
            )}
        >
            <div
                className={`${s['extra-info-container']} relative flex font-aktivGrotesk justify-center`}
                ref={animateRef}
            >
                <div className={s['extra-info-wrapper']}>
                    <div
                        className={cn(s['extra-info-text'], sf['has-animate'], {
                            [sf['onScreen']]: isOnScreen || isAboveRootMargin
                        })}
                    >
                        {heading && (
                            <div className={s['heading']}>{heading}</div>
                        )}
                        {subHeadingHtml && (
                            <div
                                className={`${s['sub-heading']} font-bebasNeue uppercase text-white`}
                                dangerouslySetInnerHTML={{
                                    __html: subHeadingHtml
                                }}
                            />
                        )}
                        {copy && (
                            <p className={s['product-description']}>{copy}</p>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    s['image-container'],
                    'flex justify-center items-center'
                )}
            >
                {desktopUrl && (
                    <Image
                        src={desktopUrl}
                        alt={desktopDescription}
                        layout={
                            !productBlock?.imageWidth &&
                            productBlock?.imageHeight
                                ? 'responsive'
                                : undefined
                        }
                        width={
                            productBlock?.imageWidth
                                ? productBlock?.imageWidth
                                : productImage?.file.details.image.width
                        }
                        height={
                            productBlock?.imageHeight
                                ? productBlock?.imageHeight
                                : productImage?.file.details.image.height
                        }
                    />
                )}

                <div className="block md:hidden">
                    <ToolTipIcons
                        isMobile
                        tooltips={tooltips}
                        handleClick={handleClick}
                    />
                </div>
                <div className="hidden md:block">
                    <ToolTipIcons
                        isMobile={false}
                        tooltips={tooltips}
                        handleClick={handleClick}
                    />
                </div>
                <BackDropClickTooltip
                    onClick={handleClose}
                    content={activeTooltip}
                    activeTooltip={activeTooltip}
                    className="hidden md:block"
                    style={{
                        top: activeTooltip?.desktopCoordinate?.top,
                        left: activeTooltip?.desktopCoordinate?.left
                    }}
                />
            </div>
            <BackDropClickTooltip
                activeTooltip={activeTooltip}
                className="block md:hidden"
                content={activeTooltip}
                onClick={handleClose}
                style={{
                    top: activeTooltip?.mobileCoordinate?.top,
                    left: activeTooltip?.mobileCoordinate?.left
                }}
            />
        </div>
    )
}

export default BlockCentered
