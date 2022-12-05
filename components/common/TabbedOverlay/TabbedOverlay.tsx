import React, { useEffect, useRef, useState } from 'react'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import Slider, { Settings } from 'react-slick'
import Image from '@corratech/corsair-image'
import OverlayTab from './OverlayTab'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'

import s from './TabbedOverlay.module.scss'

export type OverlayTabColumnType = {
    title: string
    heading: string
    headingColor: string
    subheadingOne: string
    subheadingOneColor: string
    subheadingTwo: string
    subheadingTwoColor: string
    content: string
    contentPosition: AlignSetting
    meta: { contentType: string }
}

export type OverlayTabType = {
    title: string
    linkedImageVideo: ImageType | VideoType
    backgroundImage: ImageType
    heading: string
    columns: [OverlayTabColumnType]

    disclaimerText?: string
    meta: { contentType: string }
}

export interface TabbedOverlayResponse {
    title: string
    backgroundColor?: string
    tabsBackgroundColor: string
    tabAnimation: string
    tabs: [OverlayTabType]
    meta: { contentType: string }
}

export interface TabbedOverlayProps {
    content: TabbedOverlayResponse
}

const c = /*tw*/ {
    tabbedOverlayWrapper: `${s['tabbed-overlay-wrapper']} block w-full`,
    tabbedOverlay: `${s['tabbed-overlay']} block`,
    tabbedOverlaySliderOne: `${s['tabbed-overlay-slider-one']} block`,
    tabbedOverlaySliderTwo: `${s['tabbed-overlay-slider-two']} block`,
    tabbedOverlaySliderTwoWrapper: `${s['tabbed-overlay-slider-two-wrapper']}`,
    tabbedOverlaySliderTwoTabHeading: `${s['tabbed-overlay-slider-two-tab-heading']} font-bebasNeueExtraBold`
}

const TabbedOverlay = ({ content }: TabbedOverlayProps): JSX.Element => {
    const [nav1, setNav1] = useState<Slider | null>()
    const [nav2, setNav2] = useState<Slider | null>()
    const [columns, setColumns] = useState<number | null>(content?.tabs?.length)

    const slider1 = useRef<Slider>(null)
    const slider2 = useRef<Slider>(null)

    useEffect(() => {
        setNav1(slider1.current)
        setNav2(slider2.current)

        if (typeof window !== undefined) {
            setColumns(columnCount(content?.tabs?.length))
        }
    }, [])

    const configOne: Settings = {
        dots: false,
        arrows: false,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: content?.tabAnimation === 'fade'
    }

    const isDesktop = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(min-width: 1024px)').matches

    const customPage = (index: number) => {
        return (
            <div className={c.tabbedOverlaySliderTwoTabHeading}>
                {content?.tabs[index]?.heading}
            </div>
        )
    }

    const configTwo: Settings = {
        dots: true,
        customPaging: customPage
    }

    const imageOrVideo = (tab: OverlayTabType) => {
        if (
            tab?.linkedImageVideo?.file?.contentType.split('/')[0] === 'image'
        ) {
            return (
                <Image
                    key={tab?.title}
                    src={tab?.linkedImageVideo?.file?.url}
                    alt={tab?.linkedImageVideo?.description}
                    objectFit="contain"
                    width={
                        (tab?.linkedImageVideo as ImageType)?.file?.details
                            ?.image?.width
                    }
                    height={
                        (tab?.linkedImageVideo as ImageType)?.file?.details
                            ?.image?.height
                    }
                />
            )
        }

        return (
            <VideoFilePlayer
                videos={[tab?.linkedImageVideo]}
                className={s['slider-video']}
            />
        )
    }

    const sliderOne = () => (
        <Slider {...configOne} asNavFor={nav2 ? nav2 : undefined} ref={slider1}>
            {content?.tabs?.map((tab) => imageOrVideo(tab))}
        </Slider>
    )

    const sliderTwo = () => (
        <Slider
            {...{ ...configOne, ...configTwo }}
            asNavFor={nav1 ? nav1 : undefined}
            ref={slider2}
        >
            {content?.tabs?.map((tab) => (
                <OverlayTab key={tab?.title} tab={tab} />
            ))}
        </Slider>
    )

    const columnCount = (count: number) => {
        content?.tabs.find((tab) => {
            if (tab?.columns?.length > count) {
                count = isDesktop()
                    ? tab?.columns?.length
                    : tab?.columns?.length + 1
            }
        })

        return count
    }

    return (
        <div
            className={c.tabbedOverlayWrapper}
            style={{ backgroundColor: content?.backgroundColor }}
        >
            <div className={c.tabbedOverlay}>
                <div className={c.tabbedOverlaySliderOne}>{sliderOne()}</div>
                <div
                    className={`${c.tabbedOverlaySliderTwo} width-${columns}`}
                    style={{
                        backgroundColor: content?.tabsBackgroundColor
                    }}
                >
                    {sliderTwo()}
                </div>
            </div>
        </div>
    )
}

export default TabbedOverlay
