import { FC, useRef } from 'react'
import cn from 'classnames'
import s from './ImageTwoTile.module.scss'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
import { useOnScreen } from '@lib/hooks/useOnScreen'

export interface ItextContain {
    heading: string
    meta: { contentType: string }
    subHeading: string
    text: string
    title: string
}

export interface ImageTwoTileResponse {
    title: string
    textContainData?: ItextContain
    image1: ImageType
    image2: ImageType
    backgroundImage?: ImageType
}

interface ImageTwoTilePrpos {
    content: ImageTwoTileResponse
}
const c = {
    imageTwoTile: `${s['imageTwoTile']} relative pt-32 text-2xl lg:px-20 box-border`,
    imageBg: `${s['imageTwoTile-BackgroundImage']} mt-32 px-6`,
    imageContainer: `${s['imageTwoTile-imageContainer']} md:flex md:justify-center md:items-center`,
    colOne: `${s['Image-Col-one']} md:pl-4 md:pr-4 md:mr-10 md:ml-10`,
    colTwo: `${s['Image-Col-two']} md:pl-4 md:pr-4 md:mr-10 md:ml-10 py-20`,
    imgWithDescription: `${s['imageTwoTile-imageWithDescp']} rounded-2xl`,
    subHeading: `${s['imageTwoTile-subHeading']} text-white font-primary`,
    Heading: `${s['Heading']} text-white font-secondary text-3xl leading-none mb-4 md:mb-10`,
    descriptiion: `${s['imageTwoTile-Description']} text-white font-primary text-lg lg:text-3xl leading-normal md:leading-10`
}

const ImageTwoTile: FC<ImageTwoTilePrpos> = ({ content }) => {
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)

    if (!content) {
        return null
    }

    const styles = {
        background: `url("${content?.backgroundImage?.file?.url}") 100% 100% repeat fixed`,
        backgroundSize: '42px 68px'
    }

    const { textContainData } = content

    return (
        <div
            className="Image-Two-Tile relative"
            style={content?.backgroundImage && styles}
        >
            <div className={cn(s['Background-Gradient'])}>
                <div className={c.imageTwoTile}>
                    <div className={c.imageBg}>
                        <div className={c.imageContainer}>
                            {content?.image1 && (
                                <div className={c.colOne}>
                                    <Image
                                        className={c.imgWithDescription}
                                        src={content?.image1?.file?.url}
                                        alt={content?.image1?.description}
                                        width={552}
                                        height={564}
                                    />
                                    <div
                                        className={cn(
                                            s['imageTwoTile-ImageText'],
                                            'pt-4',
                                            s['has-animate'],
                                            { [s['onScreen']]: isOnScreen }
                                        )}
                                        ref={animateRef}
                                    >
                                        <h6 className={c.subHeading}>
                                            {textContainData?.subHeading}
                                        </h6>
                                        <h2 className={c.Heading}>
                                            {textContainData?.heading}
                                        </h2>
                                        <div className={c.descriptiion}>
                                            {textContainData?.text}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {content?.image2 && (
                                <div
                                    className={cn(
                                        c.colTwo,
                                        s['has-animate-image'],
                                        { [s['onScreen']]: isOnScreen }
                                    )}
                                >
                                    <Image
                                        className={cn(
                                            s['imageTwoTile-imageWithDescp'],
                                            'rounded-2xl'
                                        )}
                                        src={content?.image2?.file?.url}
                                        alt={content?.image2?.description}
                                        width={552}
                                        height={568}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageTwoTile
