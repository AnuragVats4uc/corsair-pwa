import React from 'react'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { CTAType } from '@pylot-data/hooks/contentful/use-content-json'
import { LeftRightTextColumn } from './LeftRightTextColumn'

import s from './LeftRightText.module.scss'
import cn from 'classnames'

export interface LeftRightTextColumnType {
    title: string
    heading?: string
    headingTag?: string
    subheading?: string
    copyText?: string
    cta?: CTAType
    ctaType?: string
    ctaAlignment?: string
    logo?: ImageType
    logoAlignment?: string
    logoVerticalAlignment?: string
    meta: { contentType: string }
}

export interface LeftRightTextResponse {
    title: string
    backgroundColor?: string
    fontColor?: string
    layoutType: string
    columns: [LeftRightTextColumnType]
    meta: { contentType: string }
}

export interface LeftRightTextProps {
    content: LeftRightTextResponse
}

const c = /*tw*/ {
    leftRightTextWrapper: `${s['left-right-text-wrapper']}`,
    leftRightTextContainer: `${s['left-right-text-container']} left-right-text-container block`,
    leftRightText: `${s['left-right-text']} left-right-text block w-full`
}

const LeftRightText = ({ content }: LeftRightTextProps): JSX.Element => {
    const layoutType = () => {
        switch (content?.layoutType) {
            case 'Full bleed':
                return 'fullBleed'
            case 'Full width':
                return 'fullWidth'
            case 'Contained':
                return 'contained'
        }
    }

    return (
        <div className={c.leftRightTextWrapper}>
            <div
                className={`${c.leftRightTextContainer} ${layoutType()}`}
                style={{
                    backgroundColor: content?.backgroundColor
                        ? `${content?.backgroundColor}`
                        : 'transparent'
                }}
            >
                <div
                    className={cn(
                        `column-${content?.columns?.length}`,
                        c.leftRightText
                    )}
                >
                    {content?.columns?.map((column) => (
                        <LeftRightTextColumn
                            key={column?.title}
                            column={column}
                            className={
                                content?.columns?.length > 1 ? 'half' : 'full'
                            }
                            fontColor={content?.fontColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftRightText
