import React, { VFC, FC } from 'react'
import { Smal2TileWToggleProp } from '../types'
import s from '../ToggleButtons.module.scss'
import cn from 'classnames'

const c = /*tw*/ {
    toggleRoot: `${s.toggle} w-full flex flex-col items-center`,
    toggleButton: `${s['toggle-button']}`,
    toggleHeading: `${s['toggle-heading']} text-center md:text-left`,
    //Oval black and white toggle:
    toggleOvalBwRoot: `${s['toggle-oval']} flex flex-row border border-white rounded-full overflow-hidden m-auto self-center`,
    toggleOnOvalBw: `bg-white text-black`,
    toggleOvalLabel: `${s['toggle-oval-label']}`,
    //Oval black and yellow toggle:
    toggleOvalYellowRoot: `${s['toggle-oval-yellow']} flex flex-row justify-center md:justify-start`,
    toggleOvalYellowLLabel: `${s['toggle-oval-yellow-left']} self-center`,
    toggleOvalYellowRLabel: `${s['toggle-oval-yellow-right']} self-center`,
    toggleOvalYellowSwitch: `${s['toggle-oval-yellow-switch']} relative`,
    toggleOvalYellowDot: `${s['toggle-oval-yellow-dot']} bg-black rounded-full absolute`,
    //Retangular black and white toggle:0
    toggleRetangular: `${s['toggle-retangular']} flex flex-col w-full`,
    toggleRetangularLabel: `${s['toggle-retangular-label']} flex flex-row`,
    toggleRetangularBg: `${s['toggle-retangular-bg']} relative flex flex-row w-full items-center`,
    toggleRetangularSwitch: `${s['toggle-retangular-switch']} bg-white relative z-1`,
    toggleRetangularIcon: `${s['toggle-retangular-icon']} z-2`
}

const getToggle = ({ content }: Smal2TileWToggleProp) => {
    const { toggleButtonType } = content
    switch (toggleButtonType) {
        case 'Retangular Black/White':
            return <RetangularToggle content={content} />
        case 'Oval Black/White':
            return <OvalBlackWhiteToggle content={content} />
        case 'Oval Black/Yellow':
            return <OvalBlackYellowToggle content={content} />
    }
}

export const ToggleButton: FC<Smal2TileWToggleProp> = ({ content }) => {
    const { toggleHeading } = content
    return (
        <div className="pt-4 md:pt-0">
            {toggleHeading && (
                <div className={c.toggleHeading}>{toggleHeading}</div>
            )}
            {getToggle({ content })}
        </div>
    )
}

const ClickableArea: FC<Smal2TileWToggleProp> = ({
    children,
    content: { setToggleOn, isToggleOn }
}) => {
    return (
        <button
            className={c.toggleButton}
            onClick={() => {
                setToggleOn(!isToggleOn)
            }}
        >
            {children}
        </button>
    )
}

const OvalBlackWhiteToggle: VFC<Smal2TileWToggleProp> = ({ content }) => {
    const { toggleLabelLeft, toggleLabelRight, isToggleOn } = content
    return (
        <div className="w-full text-center z-5">
            <ClickableArea content={content}>
                <div className={c.toggleOvalBwRoot}>
                    <span
                        className={cn(
                            c.toggleOvalLabel,
                            isToggleOn && c.toggleOnOvalBw
                        )}
                    >
                        {toggleLabelLeft}
                    </span>
                    <span
                        className={cn(
                            c.toggleOvalLabel,
                            !isToggleOn && c.toggleOnOvalBw
                        )}
                    >
                        {toggleLabelRight}
                    </span>
                </div>
            </ClickableArea>
        </div>
    )
}

const OvalBlackYellowToggle: VFC<Smal2TileWToggleProp> = ({ content }) => {
    const { toggleLabelLeft, toggleLabelRight, isToggleOn } = content
    return (
        <div className={c.toggleOvalYellowRoot}>
            <span
                style={{
                    opacity: isToggleOn ? '0.5' : '1'
                }}
                className={cn(c.toggleOvalYellowLLabel, s['transition'])}
            >
                {toggleLabelLeft}
            </span>
            <ClickableArea content={content}>
                <div
                    className={c.toggleOvalYellowSwitch}
                    style={{ backgroundColor: isToggleOn ? '#ECE81A' : '#FFF' }}
                >
                    <div
                        className={cn(
                            c.toggleOvalYellowDot,
                            isToggleOn && s['toggle-oval-yellow-dot-on']
                        )}
                    />
                </div>
            </ClickableArea>
            <span
                style={{
                    opacity: isToggleOn ? '1' : '0.5'
                }}
                className={cn(c.toggleOvalYellowRLabel, s['transition'])}
            >
                {toggleLabelRight}
            </span>
        </div>
    )
}

const RetangularToggle: VFC<Smal2TileWToggleProp> = ({ content }) => {
    const {
        toggleLabelLeft,
        toggleLabelRight,
        toggleIconLeft,
        toggleIconRight,
        isToggleOn
    } = content
    if (!toggleIconLeft || !toggleIconRight) return null
    return (
        <div className={c.toggleRetangular}>
            <div className={c.toggleRetangularLabel}>
                <span
                    className={s['transition']}
                    style={{
                        opacity: isToggleOn ? '0.5' : '1'
                    }}
                >
                    {toggleLabelLeft}
                </span>
                <span
                    className={s['transition']}
                    style={{
                        opacity: isToggleOn ? '1' : '0.5'
                    }}
                >
                    {toggleLabelRight}
                </span>
            </div>
            <ClickableArea content={content}>
                <div className={c.toggleRetangularBg}>
                    <span
                        className={cn(c.toggleRetangularIcon, 'bg-white')}
                        style={{
                            filter: `invert(${isToggleOn ? '0.5' : '1'})`,
                            opacity: `${isToggleOn ? '0.5' : '1'}`,
                            maskImage: `url(${toggleIconLeft.file.url})`,
                            WebkitMaskImage: `url(${toggleIconLeft.file.url})`
                        }}
                    />
                    <span
                        className={cn(c.toggleRetangularIcon, 'bg-white')}
                        style={{
                            filter: `invert(${isToggleOn ? '1' : '0.5'})`,
                            opacity: `${isToggleOn ? '1' : '0.5'}`,
                            maskImage: `url(${toggleIconRight.file.url})`,
                            WebkitMaskImage: `url(${toggleIconRight.file.url})`
                        }}
                    />
                </div>
                <div
                    className={cn(
                        c.toggleRetangularSwitch,
                        isToggleOn && s['toggle-retangular-switch-on']
                    )}
                />
            </ClickableArea>
        </div>
    )
}
