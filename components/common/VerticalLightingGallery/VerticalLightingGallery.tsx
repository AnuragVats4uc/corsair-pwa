import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import s from './VerticalLightingGallery.module.scss'
import {
    ImageLinkType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '../Carousel/VideoFilePlayer'

const c = {
    controls: `${s['controls']} justify-center md:justify-start flex w-full flex-wrap`,
    controlBtnIconContainer: `relative overflow-hidden rounded-full block w-full h-full`,
    controlBtnIconLabel: `text-lg text-white`,
    controlsBtn: `${s['control-btn']} relative cursor-pointer flex flex-col items-center mx-3 w-full mb-2`,
    controlsBtnIcon: `${s['control-icon']} relative mb-5 overflow-hidden rounded-full border border-black duration-100 transition-all`,
    controlsContainer: `${s['controls-container']} flex-col flex `,
    controlsTitle: `${s['controls-title']} mb-8 tracking-widest font-primary text-white`,
    leftPanel: `${s['left-panel']} py-24 w-full md:w-6/12 flex justify-center flex-col flex-1`,
    lightProfileVideo: `${s['light-profile-video']} stick w-auto`,
    logo: `${s['logo']} relative m-auto md:m-0 mb-10`,
    rightPanel: `${s['right-panel']} w-full md:w-6/12 overflow-hidden sticky top-0 flex-1`,
    verticalLightingContent: `${s['vertical-lighting-content']} px-24 relative opacity-0 duration-300 transition-all pt-15 text-center md:text-left`,
    verticalLightingGallery: `${s['vertical-lighting-gallery']} bg-fixed relative`
}

interface LightingProfile {
    icon: ImageLinkType
    label: string
    title: string
    video: VideoType
}
interface DisplayScreenPreviews {
    backgroundVideo: VideoType
    icon: ImageLinkType
    lightingProfiles: LightingProfile[]
    title: string
}

export interface VerticalLightingGalleryData {
    buttonsAreaLeftSide: boolean
    description: string
    displayScreenPreviewControlsTitle: string
    displayScreenPreviews: DisplayScreenPreviews[]
    lightingProfilesControlsTitle: string
    logo: ImageLinkType
    title: string
}

const VerticalLightingGallery: React.FC<{
    content: VerticalLightingGalleryData
}> = ({ content }) => {
    const verticalLightingContentRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [
        primaryControlActiveOptionIndex,
        setPrimaryControlActiveOptionIndex
    ] = useState(0)
    const [
        secondaryControlActiveOptionIndex,
        setSecondaryControlActiveOptionIndex
    ] = useState(0)
    const [
        isVerticalLightingContentVisible,
        setIsVerticalLightingContentVisible
    ] = useState(false)

    useEffect(() => {
        if (!verticalLightingContentRef?.current) {
            return
        }

        const $verticalLightingContent = verticalLightingContentRef.current

        const handleOnScroll = () => {
            // Logic to check when verticalLightingContent should be visible
            const verticalLightingContentVisibleStatus =
                window.innerHeight - 150 >=
                $verticalLightingContent.getBoundingClientRect().top

            setIsVerticalLightingContentVisible(
                verticalLightingContentVisibleStatus
            )
        }

        window.addEventListener('scroll', handleOnScroll)

        return () => {
            window.removeEventListener('scroll', handleOnScroll)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verticalLightingContentRef.current])

    const {
        displayScreenPreviewControlsTitle,
        displayScreenPreviews,
        lightingProfilesControlsTitle,
        buttonsAreaLeftSide
    } = content

    const displayScreenPreview =
        displayScreenPreviews[primaryControlActiveOptionIndex]
    const lightingProfile =
        displayScreenPreviews?.[primaryControlActiveOptionIndex]
            .lightingProfiles?.[secondaryControlActiveOptionIndex]

    const secondaryControls =
        displayScreenPreviews[primaryControlActiveOptionIndex].lightingProfiles

    const getLightingGalleryControls = () => (
        <>
            <div className={c.controlsContainer}>
                <p className={c.controlsTitle}>
                    {displayScreenPreviewControlsTitle}
                </p>
                <div className={c.controls}>
                    {displayScreenPreviews.map((control, i) => (
                        <button
                            key={`${control.title}-${i}`}
                            onClick={() => {
                                if (control?.lightingProfiles?.length) {
                                    setPrimaryControlActiveOptionIndex(i)
                                    setSecondaryControlActiveOptionIndex(
                                        control.lightingProfiles[
                                            secondaryControlActiveOptionIndex
                                        ]
                                            ? secondaryControlActiveOptionIndex
                                            : 0
                                    )
                                }
                            }}
                            className={cn(c.controlsBtn, {
                                [s['active']]:
                                    i === primaryControlActiveOptionIndex,
                                [s['disabled']]: !control?.lightingProfiles
                                    ?.length
                            })}
                        >
                            <div className={c.controlsBtnIcon}>
                                <span className={c.controlBtnIconContainer}>
                                    {control?.icon?.image.file.url && (
                                        <Image
                                            src={control?.icon?.image.file.url}
                                            alt={
                                                control?.icon?.image.file
                                                    .fileName
                                            }
                                            layout="fill"
                                        />
                                    )}
                                </span>
                            </div>
                            <span className={c.controlBtnIconLabel}>
                                {control.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div className={c.controlsContainer}>
                <p className={c.controlsTitle}>
                    {lightingProfilesControlsTitle}
                </p>
                <div className={c.controls}>
                    {secondaryControls?.map((control, i) => (
                        <button
                            key={`${control.title}-${i}`}
                            onClick={() =>
                                setSecondaryControlActiveOptionIndex(i)
                            }
                            className={cn(c.controlsBtn, {
                                [s['active']]:
                                    i == secondaryControlActiveOptionIndex
                            })}
                        >
                            <div className={c.controlsBtnIcon}>
                                <span className={c.controlBtnIconContainer}>
                                    {control?.icon?.image.file.url && (
                                        <Image
                                            src={control?.icon?.image.file.url}
                                            alt={
                                                control?.icon?.image.file
                                                    .fileName
                                            }
                                            layout="fill"
                                        />
                                    )}
                                </span>
                            </div>
                            <span className={c.controlBtnIconLabel}>
                                {control.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )

    return (
        <div className={c.verticalLightingGallery}>
            <div
                className={cn('flex bg-fixed relative flex-col md:flex-row', {
                    'md:flex-row-reverse': !buttonsAreaLeftSide
                })}
            >
                <div className={c.leftPanel}>
                    <div
                        className={cn(c.verticalLightingContent, {
                            [s['visible']]: isVerticalLightingContentVisible
                        })}
                        ref={verticalLightingContentRef}
                    >
                        <div className={c.logo}>
                            {content?.logo?.image?.file.url && (
                                <Image
                                    src={content?.logo?.image.file.url}
                                    alt={content?.logo?.image.file.fileName}
                                    layout="fill"
                                />
                            )}
                        </div>
                        <h2 className="font-secondary tracking-wide mb-10 text-white">
                            {content.title}
                        </h2>
                        <p className="font-quinary mb-16 text-white">
                            {content.description}
                        </p>
                        {getLightingGalleryControls()}
                    </div>
                </div>
                <div className={c.rightPanel}>
                    <div className="absolute left-0 top-0 w-full h-full">
                        <VideoFilePlayer
                            videos={[lightingProfile?.video]}
                            className={s['light-profile-video']}
                        />
                        <div className="absolute left-0 top-0 w-full h-full opacity-0">
                            <div className="absolute left-0 top-0 w-full h-full">
                                <VideoFilePlayer
                                    videos={[
                                        displayScreenPreview.backgroundVideo
                                    ]}
                                    className={c.lightProfileVideo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerticalLightingGallery
