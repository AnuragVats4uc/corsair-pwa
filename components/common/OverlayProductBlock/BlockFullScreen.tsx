import React, { useRef, useState, VFC } from 'react'
import Image from '@corratech/corsair-image'
import s from './OverlayProductBlock.module.scss'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import cn from 'classnames'
import type {
    IBackgroundColor,
    IGenericProductBlock,
    IMeta
} from '@components/common/types'
import type { ITooltip } from '../Tooltip/Tooltip'
import { ToolTipIcons } from './ToolTipIcons'
import { BackDropClickTooltip } from './BackdropClickTooltip'

export enum EOverlayLayout {
    CENTERED = 'Centered',
    FULL_SCREEN = 'Full Screen'
}
export interface IOverlayContent {
    title: string
    layout?: EOverlayLayout
    productBlock: IGenericProductBlock
    description?: string
    tooltips?: ITooltip[]
    meta: IMeta<'overlayProductBlock'>
    background?: IBackgroundColor
}
export interface IOverlayProductBlock {
    content: IOverlayContent
}

const c = {
    blockContainer: 'relative z-2',
    extraInfoContainer:
        'w-full relative md:absolute flex justify-center md:justify-start items-center md:items-start flex-col z-1 font-bold leading-none',
    extraInfoWrapper: 'md:w-1/2 md:flex md:justify-end'
}

const BlockFullScreen: VFC<IOverlayProductBlock> = ({ content }) => {
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true, { threshold: 0.25 })
    const [activeTooltip, setActiveTooltip] = useState<ITooltip | undefined>(
        undefined
    )

    const { productBlock, tooltips, background } = content
    const { colorHex, gradient, gradientColor, backgroundImage } =
        background ?? {}
    const backgroundColor = gradientColor ? gradient : colorHex
    const {
        heading,
        text: subHeading,
        productImage,
        mobileImage
    } = productBlock
    const { url: desktopUrl } = productImage?.file
    const { description: desktopDescription } = productImage

    const { url: mobileUrl = '' } = mobileImage?.file || {}
    const { description: mobileDescription = '' } = mobileImage || {}

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
            className={cn(c.blockContainer, s['block-container'])}
        >
            <div
                className={cn(
                    c.extraInfoContainer,
                    s['extra-info-container'],
                    s['has-animate'],
                    {
                        [s['onScreen']]: isOnScreen
                    }
                )}
            >
                <div className={c.extraInfoWrapper}>
                    <div className={cn('md:w-full', s['text-container'])}>
                        <div className={s['heading']}>{heading}</div>
                        <div className={s['sub-heading']}>{subHeading}</div>
                    </div>
                </div>
            </div>
            <div className={s['overlay-block-img-container']} ref={animateRef}>
                {desktopUrl && (
                    <div className={cn('hidden md:block')}>
                        <Image
                            src={desktopUrl}
                            alt={desktopDescription}
                            layout="fill"
                            objectFit="contain"
                        />
                        <ToolTipIcons
                            isMobile={false}
                            tooltips={tooltips}
                            handleClick={handleClick}
                        />
                    </div>
                )}
                {(mobileUrl || desktopUrl) && (
                    <div className={cn('block md:hidden')}>
                        <Image
                            src={mobileUrl || desktopUrl}
                            alt={mobileDescription || desktopDescription}
                            layout="fill"
                            objectFit="cover"
                        />
                        <ToolTipIcons
                            isMobile
                            tooltips={tooltips}
                            handleClick={handleClick}
                        />
                    </div>
                )}
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
            <BackDropClickTooltip
                activeTooltip={activeTooltip}
                content={activeTooltip}
                onClick={handleClose}
                className="block md:hidden"
                style={{
                    top: activeTooltip?.mobileCoordinate?.top,
                    left: activeTooltip?.mobileCoordinate?.left
                }}
            />
        </div>
    )
}

export default BlockFullScreen
