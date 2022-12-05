import React, { VFC } from 'react'
import Image from 'next/image'
import { ICalloutBlock } from '../types'
import CalloutBlockItem from './CalloutBlockItem'
import s from './CalloutBlock.module.scss'
import cn from 'classnames'

export type CalloutBlockProps = {
    calloutBlock: ICalloutBlock
}

const CalloutBlock: VFC<CalloutBlockProps> = ({ calloutBlock }) => {
    return (
        <div
            className="pt-1/5 pb-10 flex items-center relative"
            style={{ backgroundColor: calloutBlock.backgroundColor }}
        >
            <h2 className={s['callout-heading']}>{calloutBlock.heading}</h2>
            <div className={cn(s['callout-block-wrapper'], 'flex')}>
                <div
                    className={cn(
                        s['callout-block-image'],
                        'hidden lg:block h-auto w-2/6'
                    )}
                >
                    <Image
                        src={calloutBlock.image.file.url}
                        height={727}
                        width={355}
                        layout="responsive"
                    />
                </div>
                <div className={s['callout-items-list']}>
                    {calloutBlock.calloutBlockItems.map(
                        (calloutBlockItem, index) => (
                            <div
                                className={s['callout-items-list-item']}
                                key={`${calloutBlockItem.title}-${index}`}
                            >
                                <CalloutBlockItem item={calloutBlockItem} />
                            </div>
                        )
                    )}
                    <div
                        className={`${s['callout-items-list-image']} block md:hidden`}
                    >
                        <Image
                            src={calloutBlock.image.file.url}
                            height={727 / 5.5}
                            width={355 / 5.5}
                            layout="fixed"
                        />
                    </div>
                    <div className="hidden md:block lg:hidden">
                        <Image
                            src={calloutBlock.image.file.url}
                            height={727 / 4}
                            width={355 / 4}
                            layout="fixed"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalloutBlock
