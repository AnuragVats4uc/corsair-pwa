import type { Dispatch, SetStateAction } from 'react'
import { FC, useState, useEffect } from 'react'
import s from '../VerticalTabsSection.module.scss'
import cn from 'classnames'
import { TabTitle } from './TabTitle'
import {
    TopAlign,
    IconWithImages,
    Itabs,
    isMobile
} from '../VerticalTabsSection'
import TopTextLayout from '@components/common/TopTextLayout'
import type { TopTextLayoutType } from '@components/common/TopTextLayout'
import Slider, { Settings } from 'react-slick'
import { VerticalTabMedia } from '../VerticalTabMedia'
import Arrow from '@components/common/Carousel/Arrow/Arrow'

export type TabsProps = {
    title: string
    description?: string
    index: number
    setSelectedTab: Dispatch<SetStateAction<number>>
    selectedTabTitle: string
    iconMedia?: IconWithImages[]
    setIconSelectedTab: Dispatch<SetStateAction<number>>
    mobileData?: Itabs[]
    fontColor?: string | undefined
    alignment?: string
}

type Props = {
    data: Itabs[]
    alignment?: string
    textContain?: TopTextLayoutType
    fontColor?: string | undefined
}

const GeneralTabs: FC<Props> = ({
    data,
    alignment,
    textContain,
    fontColor
}) => {
    const [selectedTab, setSelectedTab] = useState<number>(0)
    const [iconSelectedTab, setIconSelectedTab] = useState<number>(0)

    const getTwoColLayout = () => {
        if (TopAlign !== alignment && textContain) {
            return <TopTextLayout data={textContain} fontColor={fontColor} />
        }
        return null
    }

    const getDesktopView = () => {
        return (
            <ul className={cn(s['Tab-Header'], 'text-white hidden md:block')}>
                {data?.map(
                    ({ tabTitle, tabDescription, iconAndImage }, index) => (
                        <TabTitle
                            key={`${tabTitle}_${index}`}
                            title={tabTitle}
                            description={tabDescription}
                            index={index}
                            iconMedia={iconAndImage}
                            setSelectedTab={setSelectedTab}
                            selectedTabTitle={data[selectedTab]?.tabTitle}
                            setIconSelectedTab={setIconSelectedTab}
                            fontColor={fontColor}
                            alignment={alignment}
                        />
                    )
                )}
            </ul>
        )
    }

    const configOne: Settings = {
        dots: false,
        arrows: true,
        swipe: false,
        fade: false,
        autoplay: false,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '20%',
        slidesToScroll: 1,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />
    }

    const getMobileView = () => {
        return (
            <ul
                className={cn(
                    s['Tab-Header'],
                    ' Tab-Header text-white block md:hidden'
                )}
            >
                {data.length > 0 && (
                    <Slider {...configOne}>
                        {data?.map(
                            (
                                { tabTitle, tabDescription, iconAndImage },
                                index
                            ) => (
                                <div key={`${tabTitle}_${index}`}>
                                    <TabTitle
                                        title={tabTitle}
                                        description={tabDescription}
                                        index={index}
                                        iconMedia={iconAndImage}
                                        setSelectedTab={setSelectedTab}
                                        selectedTabTitle={
                                            data[selectedTab]?.tabTitle
                                        }
                                        setIconSelectedTab={setIconSelectedTab}
                                        mobileData={data}
                                        fontColor={fontColor}
                                        alignment={alignment}
                                    />
                                </div>
                            )
                        )}
                    </Slider>
                )}
            </ul>
        )
    }

    return (
        <div className={cn(s['Tabs-Container'], 'flex')}>
            <div className={cn(s['Two-Cols'])}>
                {getTwoColLayout()}
                {getMobileView()}
                {getDesktopView()}
            </div>

            {!isMobile() && (
                <VerticalTabMedia
                    iconMedia={data[selectedTab]?.iconAndImage}
                    iconSelectedTab={iconSelectedTab}
                />
            )}
        </div>
    )
}

export default GeneralTabs
