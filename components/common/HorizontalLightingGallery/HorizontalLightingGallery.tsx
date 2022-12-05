import { useState } from 'react'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import s from './HorizontalLightingGallery.module.scss'
import {
    ImageLinkType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '../Carousel/VideoFilePlayer'
import { JsonToCss } from '../HeroBanner/Util/JsonToCss'

const c = {
    controls: `${s['controls']} `,
    controlBtnIconContainer: `relative overflow-hidden rounded-full block w-full h-full`,
    controlBtnIconLabel: `${s['control-btn-icon-label']} hidden absolute -bottom-8 md:-bottom-14 text-white`,
    controlBtnIconLabelDefault: `${s['control-btn-icon-label']} text-center pt-3 block md:hidden`,
    controlsBtn: `${s['control-btn']} relative cursor-pointer flex flex-col items-center mb-2 md:mx-5`,
    controlsBtnIcon: `${s['control-icon']} relative overflow-hidden rounded-full border-2 border-black duration-100 transition-all`,
    controlsContainer: `${s['controls-container']} relative flex-col flex z-2 mx-auto`,
    lightProfileVideo: `${s['light-profile-video']} stick w-auto hidden`,
    videoContainer: `${s['video-container']} relative justify-center flex mx-auto`,
    horizontalLightingGallery: `${s['horizontal-lighting-gallery']}`,
    controlBackground: `${s['control-btn']} relative cursor-pointer flex flex-col items-center mb-2 md:mx-5`
}

interface LightingProfile {
    icon?: ImageLinkType
    label: string
    title: string
    video: VideoType
    backgroundColor?: string
}

export interface HorizontalLightingGalleryData {
    controlsMobileTitle: string
    lightingProfiles: LightingProfile[]
    heading: string
    subheading: string
    bodyCopy: string
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
    pageBackgroundImage?: ImageType
}

const HorizontalLightingGallery: React.FC<{
    content: HorizontalLightingGalleryData
}> = ({ content }) => {
    const [
        primaryControlActiveOptionIndex,
        setPrimaryControlActiveOptionIndex
    ] = useState(0)
    const {
        lightingProfiles,
        controlsMobileTitle,
        heading,
        subheading,
        bodyCopy
    } = content

    const stylesDesktop = {
        ...(content?.desktopPaddingTop && {
            'padding-top': `${content?.desktopPaddingTop}rem;`
        }),
        ...(content?.desktopPaddingBottom && {
            'padding-bottom': `${content?.desktopPaddingBottom}rem;`
        })
    }

    const stylesMobile = {
        ...(content?.mobilePaddingTop && {
            'padding-top': `${content?.mobilePaddingTop}rem;`
        }),
        ...(content?.mobilePaddingBottom && {
            'padding-bottom': `${content?.mobilePaddingBottom}rem;`
        })
    }

    const paddingsClassheading =
        (heading && heading?.replace(/\s+/g, '')) ?? 'HLightGallery'

    return (
        <div className={`verticalPaddings-${paddingsClassheading}`}>
            <style jsx>{` 
                    @media screen and (min-width: 768px){
                        .verticalPaddings-${paddingsClassheading} ${JsonToCss(
                stylesDesktop
            )}
                    }
                    @media screen and (max-width: 767px) {                               
                        .verticalPaddings-${paddingsClassheading} ${JsonToCss(
                stylesMobile
            )}
                    }`}</style>
            <div
                className={cn(
                    c.horizontalLightingGallery,
                    !content.pageBackgroundImage && 'bg-black'
                )}
            >
                {heading && subheading && bodyCopy && (
                    <header className={s['horizontal-gallery-header']}>
                        <p className={s['subheading']}>{subheading}</p>
                        <h2 className={s['heading']}>{heading}</h2>
                        <p className={s['bodycopy']}>{bodyCopy}</p>
                    </header>
                )}
                <div className={c.controlsContainer}>
                    <div className={c.controls}>
                        <div className="justify-center flex w-full flex-wrap">
                            {lightingProfiles.map((control, i) => {
                                return (
                                    <>
                                        {control.icon && (
                                            <button
                                                key={`${control.title}_${i}`}
                                                onClick={() =>
                                                    setPrimaryControlActiveOptionIndex(
                                                        i
                                                    )
                                                }
                                                className={cn(c.controlsBtn, {
                                                    [s['active']]:
                                                        i ===
                                                        primaryControlActiveOptionIndex
                                                })}
                                            >
                                                <div
                                                    className={
                                                        c.controlsBtnIcon
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            c.controlBtnIconContainer
                                                        }
                                                    >
                                                        <Image
                                                            src={
                                                                control?.icon
                                                                    ?.image.file
                                                                    .url || ''
                                                            }
                                                            alt={
                                                                control?.icon
                                                                    ?.image
                                                                    ?.description ||
                                                                ''
                                                            }
                                                            layout="fill"
                                                        />
                                                    </span>
                                                </div>
                                                <p
                                                    className={
                                                        c.controlBtnIconLabel
                                                    }
                                                >
                                                    <span className="hidden lg:block whitespace-no-wrap">
                                                        {control.label}
                                                    </span>
                                                </p>
                                            </button>
                                        )}
                                        {control?.backgroundColor &&
                                            !control.icon && (
                                                <button
                                                    key={`${control.title}_${i}`}
                                                    onClick={() =>
                                                        setPrimaryControlActiveOptionIndex(
                                                            i
                                                        )
                                                    }
                                                    className={cn(
                                                        c.controlBackground,
                                                        {
                                                            [s['active']]:
                                                                i ===
                                                                primaryControlActiveOptionIndex
                                                        }
                                                    )}
                                                >
                                                    <div
                                                        className={
                                                            c.controlsBtnIcon
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                c.controlBtnIconContainer
                                                            }
                                                            style={{
                                                                background:
                                                                    control.backgroundColor
                                                            }}
                                                        />
                                                    </div>
                                                    <p
                                                        className={
                                                            c.controlBtnIconLabel
                                                        }
                                                    >
                                                        <span className="hidden lg:block whitespace-no-wrap">
                                                            {control.label}
                                                        </span>
                                                    </p>
                                                </button>
                                            )}
                                    </>
                                )
                            })}
                        </div>
                        <p className={c.controlBtnIconLabelDefault}>
                            <span className="whitespace-no-wrap">
                                {controlsMobileTitle}
                            </span>
                        </p>
                    </div>
                </div>
                <div className={c.videoContainer}>
                    <div>
                        {lightingProfiles.map((control, i) => (
                            <VideoFilePlayer
                                key={`${control.title}_${i}`}
                                videos={[control.video]}
                                className={cn(c.lightProfileVideo, {
                                    [s['active']]:
                                        i === primaryControlActiveOptionIndex
                                })}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalLightingGallery
