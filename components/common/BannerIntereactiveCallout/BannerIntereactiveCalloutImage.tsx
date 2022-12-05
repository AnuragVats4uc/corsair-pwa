import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
import cn from 'classnames'
import s from './BannerIntereactiveCallout.module.scss'
import { Icallouts } from './BannerIntereactiveCallout'
import type { Dispatch, SetStateAction } from 'react'

export type BannerIntereactiveCalloutImageProps = {
    CalloutImage: ImageType
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
    positions?: Icallouts[]
}
export const BannerIntereactiveCalloutImage = ({
    CalloutImage,
    setSelectedIndex,
    selectedIndex,
    positions
}: BannerIntereactiveCalloutImageProps): JSX.Element => {
    return (
        <div className={cn(s['Image-Block'], 'relative')}>
            <Image
                alt={CalloutImage?.description}
                src={CalloutImage?.file?.url}
                width={CalloutImage?.file.details?.image?.width}
                height={CalloutImage?.file.details?.image?.height}
                className={cn(s['corner-radius'])}
            />
            <div className={s['Image-Hover-Pints']}>
                {positions?.map((item, i) => (
                    <div
                        className={cn(
                            s['callOutPoint'],
                            'text-white',
                            'absolute',
                            s['indicator_' + i],
                            { [s['active']]: selectedIndex === i + 1 }
                        )}
                        style={positions && setPointsPositions(item)}
                        key={i}
                        onMouseOver={() => setSelectedIndex(i + 1)}
                        onFocus={() => setSelectedIndex(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    )
}
const setPointsPositions = (positions: Icallouts) => {
    return {
        left: positions?.left ? positions?.left : 'unset',
        top: positions?.top ? positions?.top : 'unset'
    }
}
