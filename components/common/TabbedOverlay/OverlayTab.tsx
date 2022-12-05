import React from 'react'
import type { OverlayTabType } from './TabbedOverlay'
import OverlayTabColumn from './OverlayTabColumn'
import { DisclaimerBlock } from '@components/common/DisclaimerBlock'
import Image from '@corratech/corsair-image'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

import s from './TabbedOverlay.module.scss'

const c = /*tw*/ {
    overlayTabWrapper: `${s['overlay-tab-wrapper']} block relative`,
    overlayTab: `${s['overlay-tab']} block`,
    overlayTabColumns: `${s['overlay-tab-columns']} flex`,
    overlayTabContent: `${s['overlay-tab-content']}`
}

export type OverlayTabProps = {
    tab: OverlayTabType
}

const OverlayTab = ({ tab }: OverlayTabProps): JSX.Element => {
    return (
        <div className={c.overlayTabWrapper}>
            {tab?.backgroundImage && (
                <Image
                    key={tab?.title}
                    src={tab?.backgroundImage?.file?.url}
                    alt={tab?.backgroundImage?.description}
                    objectFit="contain"
                    width={
                        (tab?.backgroundImage as ImageType)?.file?.details
                            ?.image?.width
                    }
                    height={
                        (tab?.backgroundImage as ImageType)?.file?.details
                            ?.image?.height
                    }
                />
            )}
            <div
                className={c.overlayTabContent}
                style={{
                    position: tab?.backgroundImage ? 'absolute' : 'relative'
                }}
            >
                <div
                    className={`${c.overlayTabColumns} ${
                        tab?.columns?.length > 1 ? 'multicolumn' : ''
                    }`}
                    style={{
                        justifyContent:
                            tab?.columns.length > 1 ? 'left' : 'center'
                    }}
                >
                    {tab?.columns?.map((column) => (
                        <OverlayTabColumn
                            key={column?.heading}
                            tabColumn={column}
                        />
                    ))}
                </div>
                {tab?.disclaimerText && (
                    <DisclaimerBlock
                        disclaimer={tab?.disclaimerText}
                        useBackground={false}
                    />
                )}
            </div>
        </div>
    )
}

export default OverlayTab
