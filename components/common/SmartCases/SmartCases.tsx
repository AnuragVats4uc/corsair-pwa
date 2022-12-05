import React, { CSSProperties, useState, VFC, useEffect, useRef } from 'react'
import {
    SceneAnimationType,
    SmartCaseProps,
    SmartCaseScene
} from './SmartCases.interfaces'
import SmartCasesHeader from './SmartCasesHeader'
import cn from 'classnames'
import { SmartCaseItem } from './SmartCasesItem'
import Slider, { Settings } from 'react-slick'
import SmartCasesVideo from './SmartCasesVideo'
import { useOnScreen } from '@lib/hooks/useOnScreen'

import s from './SmartCases.module.scss'
import { UniteCTA } from '../UniteYourSetupBlock/UniteCTA'

const c = /*tw*/ {
    smartCasesDisclaimerMobile: `${s['smart-cases-scene-disclaimer']} absolute -bottom-32 mb-0 z-20 lg:max-w-screen-xl lg:px-16 xl:px-20 xl-1440:px-20 w-full mx-auto xl:container pr-2 md:hidden flex`,
    smartCasesDisclaimerDesktop: `${s['smart-cases-scene-disclaimer']} mb-0 z-20 bottom-0  lg:max-w-screen-xl lg:px-16 xl:px-20 xl-1440:px-20 w-full mx-auto xl:container px-4 md:flex hidden`,
    smartCasesDisclaimerText: `${s['smart-cases-scene-description']} opacity-0 border-t max-w-4xl pt-4 font-aktivGrotesk text-white`,
    smartCasesContentItems: `${s['smart-cases-content-items']} absolute md:relative mb-0 z-20 bottom-0  lg:max-w-screen-xl lg:px-16 xl:px-20 xl-1440:px-20 flex w-full mx-auto px-4`,
    smartCasesContentWrapper: `${s['smart-cases-content-wrappper']} sticky top-0 md:relative mb-0 z-20 bottom-0 lg:max-w-screen-xl lg:px-16 xl:px-20 xl-1440:px-20 flex w-full mx-auto px-4`,
    smartCaseItemDesktop:
        'relative w-full left-0 top-0 bg-transparent md:block hidden right-0',
    smartCaseItemMobile:
        'relative w-full left-0 top-0 bg-transparent flex overflow-hidden md:hidden',
    smarCasesItemGridWrapper: 'grid grid-cols-2 gap-x-7',
    smartCasesSceneHeading:
        'uppercase pb-4 md:pb-5 font-aktivGroteskBold text-white',
    smartCasesHeaderWrapper:
        'sticky top-0 py-20 flex visible z-50 w-full flex-col h-screen items-center',
    smartCasesItemPosition:
        'items-start flex flex-col justify-start md:w-3/5 lg:w-2/5',
    smartCasesVideoWrapperDesktop: `${s['smart-cases-video-wrapper']} sticky h-0 top-0 left-0 w-full z-10  hidden md:flex`,
    smartCasesVideoWrapperMobile: `${s['smart-cases-video-wrapper']} sticky h-0 top-0 left-0 w-full z-10  md:hidden flex`
}

const SmartCase: VFC<SmartCaseProps> = ({ content }) => {
    const {
        heading,
        headingLabel,
        subheading,
        backgroundImage,
        textPosition,
        scenes,
        showCards,
        sceneHeading,
        animationType,
        sceneAlignment,
        zoomLevel,
        logo,
        isFirstPage,
        cta: ctaButton
    } = content

    const videoRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    const [activeScene, setActiveScene] = useState<SmartCaseScene | null>(
        scenes.length ? scenes[0] : null
    )
    const [zoom, setZoom] = useState<number>(1)
    const [showScene, setShowScene] = useState<boolean>(false)
    const [activeHeader, setActiveHeader] = useState<boolean>(false)
    const { isOnScreen } = useOnScreen(headerRef)

    const wrapperStyle: CSSProperties = {
        background: backgroundImage
            ? `url("${backgroundImage?.file.url}") 100% 100% repeat fixed`
            : 'inherit',
        backgroundSize: '42px 68px'
    }

    useEffect(() => {
        if (isOnScreen) {
            setShowScene(true)
        }

        const onScroll = () => {
            if (headerRef.current && videoRef.current) {
                if (
                    window.scrollY + window.innerHeight >=
                    videoRef.current.offsetTop + headerRef.current.clientHeight
                ) {
                    setActiveHeader(true)
                } else {
                    setActiveHeader(false)
                }
            }

            const animationParam = {
                Zoom: {
                    top: 500,
                    bottom: 700,
                    header: 100
                },
                Fade: {
                    top: 0,
                    bottom: 300,
                    header: 0
                }
            }

            if (window.innerWidth < 768) {
                Object.assign(animationParam, {
                    Fade: {
                        top: -50,
                        bottom: 100,
                        header: -100
                    },
                    Zoom: {
                        top: 300,
                        bottom: 500,
                        header: 100
                    }
                })
            }

            const currentAnimation =
                animationParam[animationType] ?? animationParam.Fade

            if (videoRef.current && headerRef.current) {
                if (
                    window.scrollY <
                    videoRef.current.offsetTop - currentAnimation.header
                ) {
                    setShowScene(false)
                    setZoom(1)
                }

                if (
                    window.scrollY >=
                    videoRef.current.offsetTop - currentAnimation.top
                ) {
                    setShowScene(true)
                    setZoom(zoomLevel)
                }

                if (
                    window.scrollY >=
                    videoRef.current.offsetTop +
                        headerRef.current.clientHeight +
                        currentAnimation.bottom
                ) {
                    setShowScene(false)
                }
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', onScroll, false)
            window.addEventListener('touchmove', onScroll, false)
        }

        return () => {
            window.removeEventListener('scroll', onScroll, false)
            window.removeEventListener('touchmove', onScroll, false)
        }
    }, [activeScene, animationType, scenes, videoRef, zoomLevel, isOnScreen])

    const handleChangeScene = (scene: SmartCaseScene) => {
        setActiveScene(scene)
    }

    const settings: Settings = {
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        infinite: false,
        arrows: false,
        centerMode: false,
        slidesToShow: 2,
        adaptiveHeight: false,
        variableWidth: true,
        centerPadding: '20%'
    }

    const generateAnimation = (animationTypeParam: 'Fade' | 'Zoom') => {
        const animations: { [key: string]: CSSProperties } = {
            Fade: {
                opacity: !!activeScene && showScene ? 1 : 0,
                visibility: !showScene ? 'hidden' : 'visible'
            },
            Zoom: {
                visibility: !showScene ? 'hidden' : 'visible',
                transform: `scale(${zoom})`,
                opacity: 1
            }
        }

        return animations[animationTypeParam]
    }

    const getCardsPosition = (position: 'Left' | 'Right') => {
        const positions = {
            Left: 'flex items-start',
            Right: 'flex items-end justify-end'
        }

        return positions[position]
    }

    const getTextPosition = (position: 'Center' | 'Left' | 'Right') => {
        const validPosition = {
            Center: 'md:justify-center justify-center',
            Left: 'md:justify-start justify-center',
            Right: 'md:justify-end justify-center'
        }

        return validPosition[position]
    }

    return (
        <div
            className={cn(s['lg-background-image-video'], {
                [s['lg-background-image-video-first']]: isFirstPage
            })}
        >
            <div
                ref={videoRef}
                style={wrapperStyle}
                className={cn(s[`smart-cases-${animationType.toLowerCase()}`])}
            >
                <div className={cn(s['smart-cases-gradient'])}>
                    <div
                        className={cn(
                            s['smart-cases-wrapper-container'],
                            'flex flex-col relative'
                        )}
                    >
                        <div
                            style={{
                                width: `${activeScene?.mobileBackgroundWidth}%`,
                                ...(animationType ===
                                    SceneAnimationType.FADE && {
                                    transform: `${activeScene?.mobileBackgroundTransform} scale(${zoom})`
                                }),
                                ...generateAnimation(animationType)
                            }}
                            className={cn(c.smartCasesVideoWrapperMobile)}
                        >
                            <SmartCasesVideo
                                activeScene={activeScene}
                                scenes={scenes}
                                showScene={showScene}
                            />
                        </div>
                        <div
                            style={generateAnimation(animationType)}
                            className={cn(c.smartCasesVideoWrapperDesktop)}
                        >
                            <SmartCasesVideo
                                activeScene={activeScene}
                                scenes={scenes}
                                showScene={showScene}
                            />
                        </div>
                        <div className={c.smartCasesHeaderWrapper}>
                            <div
                                ref={headerRef}
                                className={cn(
                                    c.smartCasesContentWrapper,
                                    {
                                        [s['active']]:
                                            activeHeader || isOnScreen
                                    },
                                    getTextPosition(textPosition)
                                )}
                            >
                                <SmartCasesHeader
                                    label={headingLabel}
                                    subtitle={subheading}
                                    title={heading}
                                    textPosition={textPosition}
                                    isFirstPage={isFirstPage}
                                    logo={logo}
                                />
                            </div>
                            {showCards && (
                                <div className="md:relative w-full left-0 top-0 h-screen">
                                    <div
                                        className={cn(
                                            c.smartCasesContentItems,
                                            getCardsPosition(sceneAlignment)
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                c.smartCasesItemPosition,
                                                getCardsPosition(sceneAlignment)
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    s[
                                                        'smart-cases-items-wrapper'
                                                    ],
                                                    'md:mt-14'
                                                )}
                                            >
                                                <h6
                                                    className={
                                                        c.smartCasesSceneHeading
                                                    }
                                                >
                                                    {sceneHeading}
                                                </h6>
                                                <div
                                                    className={
                                                        c.smartCaseItemDesktop
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            c.smarCasesItemGridWrapper
                                                        }
                                                    >
                                                        {scenes.map((scene) => (
                                                            <SmartCaseItem
                                                                handleChangeScene={
                                                                    handleChangeScene
                                                                }
                                                                active={
                                                                    activeScene?.title ===
                                                                    scene.title
                                                                }
                                                                scene={scene}
                                                                key={
                                                                    scene.title
                                                                }
                                                                {...scene}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        c.smartCaseItemMobile
                                                    }
                                                >
                                                    <Slider
                                                        {...settings}
                                                        swipe
                                                        focusOnSelect={false}
                                                    >
                                                        {scenes.map((scene) => (
                                                            <SmartCaseItem
                                                                handleChangeScene={
                                                                    handleChangeScene
                                                                }
                                                                active={
                                                                    activeScene?.title ===
                                                                    scene.title
                                                                }
                                                                scene={scene}
                                                                key={
                                                                    scene.title
                                                                }
                                                                {...scene}
                                                            />
                                                        ))}
                                                    </Slider>
                                                </div>
                                                <div
                                                    className={cn(
                                                        c.smartCasesDisclaimerMobile
                                                    )}
                                                >
                                                    <p
                                                        className={cn(
                                                            c.smartCasesDisclaimerText,
                                                            {
                                                                'opacity-50':
                                                                    activeScene?.sceneDescription
                                                            }
                                                        )}
                                                    >
                                                        {
                                                            activeScene?.sceneDescription
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            c.smartCasesDisclaimerDesktop
                                        )}
                                    >
                                        <p
                                            className={cn(
                                                c.smartCasesDisclaimerText,
                                                {
                                                    'opacity-50':
                                                        activeScene?.sceneDescription
                                                }
                                            )}
                                        >
                                            {activeScene?.sceneDescription}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {ctaButton && (
                <div
                    className={cn(
                        s['lg-background-video-image-cta-button'],
                        'hidden md:flex'
                    )}
                >
                    <UniteCTA
                        uniteCta={{
                            heading: '',
                            ctaButton,
                            logo
                        }}
                    />
                </div>
            )}
        </div>
    )
}

const SmartCasesWrapper: VFC<SmartCaseProps> = ({ content }) =>
    !content ? null : <SmartCase content={content} />

export default SmartCasesWrapper
