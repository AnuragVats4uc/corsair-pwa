import { FC, useState, useRef } from 'react'
import s from './BannerIntereactiveCallout.module.scss'
import cn from 'classnames'
import { BannerIntereactiveCalloutImage } from './BannerIntereactiveCalloutImage'
import { BannerIntereactiveCalloutPoints } from './BannerIntereactiveCalloutPoints'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import { IMeta } from '../types'

const leftImage = 'Left-Image'
export interface Icallouts {
    point: string
    left?: string
    top?: string
    meta: IMeta<'calloutTextPoints'>
}
export interface BannerIntereactiveCalloutResponse {
    heading: string
    subHeading?: string
    description: string
    callouts: Icallouts[]
    image: ImageType
    layoutPosition: string
    backgroundImage: ImageType
    backgroundColor: string
    useImageAsBackground: boolean
}
export interface BannerIntereactiveCalloutProps {
    content: BannerIntereactiveCalloutResponse
}
const c = /*tw*/ {
    bannerCalloutWrapper: `${s['bannnerCalloutWrapper']}`,
    bannerCalloutBackground: `${s['bannerCalloutBackground']} py-16 md:py-44 px-6 md:px-0`,
    bannerCalloutContainer: `${s['bannerCalloutContainer']} flex`,
    imageBlock: `${s['imageBlock']} flex-auto md:w-6/12`,
    textBlock: `${s['txtBlock']} flex justify-start flex-auto md:w-6/12 flex-col pt-0 lg:pt-16`,
    blockHeading: `${s['blockHeading']} text-white mb-4 md:mb-8`,
    blockSubHeading: `${s['blockSubheading']}`,
    blockDescription: `${s['blockDescription']} text-white`,
    textblockWrapper: `${s['textblockWrapper']} xl:px-20 lg:px-16 md:px-10 text-center md:text-left`
}
const BannerIntereactiveCallout: FC<BannerIntereactiveCalloutProps> = ({
    content
}) => {
    /**
     * Animation Ref
     */
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    if (!content) {
        return null
    }
    const bgImage = content?.backgroundImage
    const styles = {
        background: `url("${bgImage?.file.url}") 100% 100% repeat fixed`
    }
    return (
        <div
            className={c.bannerCalloutWrapper}
            style={
                bgImage && content?.useImageAsBackground
                    ? styles
                    : { background: content?.backgroundColor }
            }
        >
            <div
                className={cn(
                    c.bannerCalloutBackground,
                    bgImage && content?.useImageAsBackground
                        ? s['Background-Gradient']
                        : ''
                )}
            >
                <div
                    className={cn(
                        c.bannerCalloutContainer,
                        content?.layoutPosition === leftImage
                            ? 'flex-col-reverse md:flex-row'
                            : 'flex-row-reverse',
                        s[content?.layoutPosition]
                    )}
                >
                    <div
                        className={cn(c.imageBlock, s['has-animate-image'], {
                            [s['onScreen']]: isOnScreen
                        })}
                        ref={animateRef}
                    >
                        {content?.image && (
                            <BannerIntereactiveCalloutImage
                                CalloutImage={content.image}
                                setSelectedIndex={setSelectedIndex}
                                selectedIndex={selectedIndex}
                                positions={content?.callouts}
                            />
                        )}
                    </div>
                    <div
                        className={cn(c.textBlock, s['has-animate'], {
                            [s['onScreen']]: isOnScreen
                        })}
                        ref={animateRef}
                    >
                        <div className={c.textblockWrapper}>
                            {content?.subHeading && (
                                <h6
                                    className={cn(
                                        c.blockSubHeading,
                                        'font-primary'
                                    )}
                                >
                                    {content.subHeading}
                                </h6>
                            )}
                            {content?.heading && (
                                <h2 className={c.blockHeading}>
                                    {content.heading}
                                </h2>
                            )}
                            {content?.description && (
                                <p
                                    className={c.blockDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: content.description
                                    }}
                                />
                            )}
                            {content?.callouts && (
                                <div
                                    className={cn(
                                        s['callOutBlock'],
                                        'p-8 lg:pt-20 lg:px-0'
                                    )}
                                >
                                    {content.callouts.map((callout, index) => (
                                        <BannerIntereactiveCalloutPoints
                                            data={callout}
                                            key={index}
                                            index={index + 1}
                                            setSelectedIndex={setSelectedIndex}
                                            selectedIndex={selectedIndex}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BannerIntereactiveCallout
