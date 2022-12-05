import { useState } from 'react'
import Image from '@corratech/corsair-image'
import ImageGridDetails from './ImageGridDetails'
import PlayButton from '../VidGallery/PlayButton'
import { ClickOutside } from '@corratech/pylot-utils'
import { Modal } from '@corratech/pylot-ui'
import { PopupVideoPlayer } from '../Banner23Tile/Banner2Tile/PopupVideoPlayer'
import c from '../VidGallery/VidGallery.module.scss'
import { GridImage } from './ImageGrid'

type ImageGridCardProps = {
    contents: GridImage
}

const ImageGridCard = ({
    contents
}: ImageGridCardProps): JSX.Element | null => {
    const [isOpen, setIsOpen] = useState(false)
    return contents?.desktopMedia?.file?.contentType?.startsWith('video') ? (
        <>
            <a
                rel="noreferrer"
                href={contents?.desktopMedia?.file?.url}
                onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(true)
                }}
            >
                {contents?.thumbnail?.file?.url && (
                    <Image
                        src={contents?.thumbnail?.file?.url}
                        alt={contents?.thumbnail?.description}
                        layout="fill"
                        objectFit="cover"
                    />
                )}
                <ImageGridDetails content={contents} />
                {contents?.desktopMedia?.file?.contentType?.startsWith(
                    'video'
                ) && <PlayButton className="play-button" />}
            </a>
            <ClickOutside active={isOpen} onClick={() => setIsOpen(false)}>
                <div>
                    <Modal
                        className={c['vidgallery-item-modal']}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        focusFirst={false}
                    >
                        <PopupVideoPlayer
                            videourl={contents?.desktopMedia?.file?.url}
                        />
                    </Modal>
                </div>
            </ClickOutside>
        </>
    ) : (
        <>
            {contents?.desktopMedia?.file?.contentType?.startsWith('image') && (
                <Image
                    src={contents?.desktopMedia?.file?.url}
                    alt={contents?.desktopMedia?.description}
                    layout="fill"
                    objectFit="cover"
                />
            )}
            <ImageGridDetails content={contents} />
        </>
    )
}

export default ImageGridCard
