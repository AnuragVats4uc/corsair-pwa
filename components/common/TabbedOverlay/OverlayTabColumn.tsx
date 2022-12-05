import React from 'react'
import type { OverlayTabColumnType } from './TabbedOverlay'

import s from './TabbedOverlay.module.scss'

const c = /*tw*/ {
    overlayTabColumn: `${s['overlay-tab-column']}`,
    overlayTabColumnHeadingGroup: `${s['overlay-tab-column-heading-group']} flex`,
    overlayTabColumnHeading: `${s['overlay-tab-column-heading']} overlayTabColumnHeading`,
    overlayTabColumnSubheadingOne: `${s['overlay-tab-column-subheading-one']} overlayTabColumnSubheadingOne`,
    overlayTabColumnSubheadingTwo: `${s['overlay-tab-column-subheading-two']}`,
    overlayTabColumnContent: `${s['overlay-tab-column-content']}`
}

export type OverlayTabColumnProps = {
    tabColumn: OverlayTabColumnType
}

const OverlayTabColumn = ({
    tabColumn
}: OverlayTabColumnProps): JSX.Element => {
    return (
        <div
            className={c.overlayTabColumn}
            style={{ textAlign: tabColumn?.contentPosition }}
        >
            {tabColumn?.subheadingTwo && (
                <p
                    className={c.overlayTabColumnSubheadingTwo}
                    style={{ color: tabColumn?.subheadingTwoColor }}
                >
                    {tabColumn?.subheadingTwo}
                </p>
            )}
            <div
                className={c.overlayTabColumnHeadingGroup}
                style={{ justifyContent: tabColumn?.contentPosition }}
            >
                <h3
                    className={c.overlayTabColumnHeading}
                    style={{ color: tabColumn?.headingColor }}
                >
                    {tabColumn?.heading}
                </h3>
                {tabColumn?.subheadingOne && (
                    <h3
                        className={c.overlayTabColumnSubheadingOne}
                        style={{ color: tabColumn?.subheadingOneColor }}
                    >
                        {tabColumn?.subheadingOne}
                    </h3>
                )}
            </div>
            {tabColumn?.content && (
                <p className={c.overlayTabColumnContent}>
                    {tabColumn?.content}
                </p>
            )}
        </div>
    )
}

export default OverlayTabColumn
