import React, { VFC } from 'react'
import { ICalloutBlockItem } from '../types'

export type CalloutBlockItemProps = {
    item: ICalloutBlockItem
}

const CalloutBlockItem: VFC<CalloutBlockItemProps> = ({ item }) => {
    return (
        <div>
            <p
                style={{ color: '#ece81a' }}
                className="font-aktivGrotesk text-base font-semibold tracking-widest"
            >
                {item.heading}
            </p>
            <p className="font-bebasNeue text-white font-bold text-2xl lg:text-4xl leading-tight lg:leading-10">
                {item.subheading}
            </p>
        </div>
    )
}

export default CalloutBlockItem
