import cn from 'classnames'
import s from './BlockTwoTile.module.scss'
import Image from '@corratech/corsair-image'
import {
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'
import VideoFilePlayer from '@components/common/Carousel/VideoFilePlayer'
import { leftImage } from './BlockTwoTile'
export interface BlockTwoTileMediaProps {
    checkMedia: ImageType | VideoType
    imageWidth?: string
    imageHeight?: string
    layoutPosition: string
    layoutType: string
    mediaFrame: ImageType
    frameEnabled: boolean
}

const c = /*tw*/ {
    imageContainer: 'relative flex items-center justify-center',
    videoWithoutFrame: `{${s['slider-video']} object-content w-full  h-full px-8 object-center`,
    videoFrame: `w-full h-full my-10 lg:my-0 lg:mb-10  flex justify-start z-0 order-last lg:order-first`,
    videoFrameContainer: `${s['frame-image-container']} h-full block mx-auto`,
    imageVideo: `${s['Image-Or-Video']} order-last lg:order-first pt-10 lg:pt-0`
}

export const BlockTwoTileMedia = ({
    checkMedia,
    layoutPosition,
    layoutType,
    imageWidth,
    imageHeight,
    mediaFrame,
    frameEnabled
}: BlockTwoTileMediaProps) => {
    let imageCheck
    const VIDEO = checkMedia?.file?.contentType.split('/')[0]
    const styles = {
        maxWidth: '1024px'
    }
    if ('image' in checkMedia?.file?.details) {
        imageCheck = checkMedia?.file?.details?.image
    }

    if (VIDEO === 'video') {
        const videoArray = []
        videoArray.push(checkMedia)
        return (
            <>
                {!frameEnabled ? (
                    <VideoFilePlayer
                        videos={videoArray}
                        className={cn(c.videoWithoutFrame)}
                        fallbackImgUrl={videoArray[0]?.file.url}
                    />
                ) : (
                    <div className={cn(c.videoFrame)}>
                        <div className="w-full h-full relative " style={styles}>
                            <div
                                className={
                                    layoutPosition === leftImage
                                        ? `${s['frame-image-container-right']} block mx-auto`
                                        : c.videoFrameContainer
                                }
                            >
                                <Image
                                    src={mediaFrame.file.url}
                                    alt={mediaFrame.description}
                                    layout="responsive"
                                    width={100}
                                    height={77.9}
                                />
                                <VideoFilePlayer
                                    videos={videoArray}
                                    className={
                                        layoutPosition === leftImage
                                            ? s['image-frame-left']
                                            : s['image-frame']
                                    }
                                    fallbackImgUrl={videoArray[0]?.file.url}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    return (
        <>
            {!frameEnabled && (
                <div className={c.imageVideo}>
                    <div
                        className={cn(
                            s['ImageContainer'],
                            s[`${layoutType}blockTile`],
                            c.imageContainer,
                            layoutPosition === leftImage
                                ? 'lg:justify-end'
                                : 'lg:justify-start'
                        )}
                    >
                        <Image
                            className={cn(
                                layoutPosition === leftImage
                                    ? s[`${layoutType}_info-main-image-left`]
                                    : s[`${layoutType}_info-main-image-right`]
                            )}
                            alt={checkMedia?.description}
                            src={checkMedia?.file?.url}
                            width={imageWidth ? imageWidth : imageCheck?.width}
                            height={
                                imageHeight ? imageHeight : imageCheck?.height
                            }
                        />
                    </div>
                </div>
            )}
            {frameEnabled && mediaFrame && (
                <div className={cn(c.videoFrame)}>
                    <div className="relative w-full h-full" style={styles}>
                        <div
                            className={
                                layoutPosition === leftImage
                                    ? `${s['frame-image-container-right']} block mx-auto`
                                    : c.videoFrameContainer
                            }
                        >
                            <Image
                                src={mediaFrame.file.url}
                                alt={mediaFrame.description}
                                layout="responsive"
                                width={100}
                                height={77.9}
                            />
                            <div
                                className={
                                    layoutPosition === leftImage
                                        ? s['image-frame-left']
                                        : s['image-frame']
                                }
                            >
                                <Image
                                    className={cn(
                                        layoutPosition === leftImage
                                            ? s[
                                                  `${layoutType}_info-main-image-left`
                                              ]
                                            : s[
                                                  `${layoutType}_info-main-image-right`
                                              ],
                                        'mr-32'
                                    )}
                                    alt={checkMedia?.description}
                                    src={checkMedia?.file?.url}
                                    layout="responsive"
                                    width={
                                        imageWidth
                                            ? imageWidth
                                            : imageCheck?.width
                                    }
                                    height={
                                        imageHeight
                                            ? imageHeight
                                            : imageCheck?.height
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BlockTwoTileMedia
