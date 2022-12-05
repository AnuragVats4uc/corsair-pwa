import { VideoType } from '@pylot-data/hooks/contentful/use-content-json'
import { CSSProperties, useEffect, useRef } from 'react'
interface VideoFilePlayerType {
    videos: VideoType[]
    className?: string
    fallbackImgUrl?: string
    style?: CSSProperties
    autoPlay?: boolean
    controls?: boolean
    muted?: boolean
    loop?: boolean
}
const VideoFilePlayer = ({
    videos,
    className,
    style,
    fallbackImgUrl = '',
    autoPlay = true,
    controls = false,
    muted = true,
    loop = true
}: VideoFilePlayerType): JSX.Element | null => {
    const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>
    const previousUrl = useRef(videos[0]?.file?.url)
    const firstVideo = videos[0]?.file?.url

    useEffect(() => {
        if (previousUrl.current === videos[0]?.file?.url) {
            return
        }

        if (videoRef.current) {
            videoRef.current.load()
        }

        previousUrl.current = videos[0]?.file?.url
    }, [firstVideo, videos])

    if (videos.length === 0) {
        return null
    }

    return (
        <video
            autoPlay={autoPlay}
            controls={controls}
            loop={loop}
            playsInline
            preload=""
            poster={fallbackImgUrl}
            muted={muted}
            style={style}
            className={className}
            ref={videoRef}
        >
            <track kind="captions" />
            {videos.map((video, index: number) => {
                return <source key={index} src={video?.file?.url} />
            })}
        </video>
    )
}

export default VideoFilePlayer
