import { FC, useCallback, useState } from 'react'
import { TabsProps } from './GeneralTabs'
import s from '../VerticalTabsSection.module.scss'
import cn from 'classnames'
import Image from '@corratech/corsair-image'
import { VerticalTabMedia } from '../VerticalTabMedia'
import { isMobile, TopAlign } from '../VerticalTabsSection'

export const TabTitle: React.FC<TabsProps> = ({
    title,
    setSelectedTab,
    index,
    selectedTabTitle,
    description,
    iconMedia,
    setIconSelectedTab,
    mobileData,
    fontColor,
    alignment
}) => {
    const [iconInnerSelectedTab, setIconInnerSelectedTab] = useState<number>(0)

    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index, setIconSelectedTab])

    const onIconClick = useCallback(
        (childIndex) => {
            setIconInnerSelectedTab(childIndex)
            setIconSelectedTab(childIndex)
        },
        [setIconSelectedTab, setIconInnerSelectedTab]
    )

    const activeTab = selectedTabTitle === title ? 'block' : 'hidden'
    return (
        <div className={s['Tab-Wrapper']}>
            {title && (
                <li
                    className={cn(
                        selectedTabTitle === title && s['Tab-active'],
                        s['Tab-Label'],
                        'font-bold cursor-pointer font-secondary VerticalTab-Slick-Label'
                    )}
                    style={{
                        color: `${fontColor}`,
                        borderBottom:
                            TopAlign !== alignment
                                ? '0'
                                : `3px solid ${fontColor}`
                    }}
                >
                    <button onClick={onClick}>{title}</button>
                </li>
            )}
            {iconMedia?.length && (
                <div
                    className={cn(
                        s['Tab-Icons'],
                        'VerticalTab-Icons flex w-full lg:w-3/6 mt-8',
                        !isMobile() && activeTab
                    )}
                >
                    {iconMedia?.map(
                        (icon, childIndex) =>
                            (icon?.iconImage || icon?.iconLabel) && (
                                <button
                                    className={cn(
                                        s['Tab-Icons-Wrapper'],
                                        !isMobile() && activeTab,
                                        iconInnerSelectedTab === childIndex
                                            ? s['iconActive']
                                            : s['iconInActive'],
                                        'cursor-pointer text-center md:text-left VerticalTabs-Wrapper'
                                    )}
                                    key={childIndex}
                                    onClick={() => onIconClick(childIndex)}
                                >
                                    {icon?.iconImage && (
                                        <Image
                                            src={icon.iconImage?.file?.url}
                                            width={
                                                icon.iconImage?.file?.details
                                                    ?.image?.width
                                            }
                                            height={
                                                icon.iconImage?.file?.details
                                                    ?.image?.height
                                            }
                                        />
                                    )}
                                    {icon?.iconLabel && (
                                        <h6>{icon.iconLabel}</h6>
                                    )}
                                </button>
                            )
                    )}
                </div>
            )}
            {description && (
                <p
                    className={cn(
                        !isMobile() && activeTab,
                        s['Tab-Description'],
                        'text-white VerticalTab-Description'
                    )}
                    style={{ color: `${fontColor}` }}
                >
                    {description}
                </p>
            )}
            {mobileData?.length && isMobile() && (
                <VerticalTabMedia
                    iconMedia={mobileData[index]?.iconAndImage}
                    iconSelectedTab={iconInnerSelectedTab}
                />
            )}
        </div>
    )
}
