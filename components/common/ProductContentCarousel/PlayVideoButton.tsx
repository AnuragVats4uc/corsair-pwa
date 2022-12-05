import { Modal } from '@corratech/pylot-ui'
import { ClickOutside } from '@corratech/pylot-utils'
import { FC, useState } from 'react'
import { PopupVideoPlayer } from '../Banner23Tile/Banner2Tile/PopupVideoPlayer'
import s from 'components/common/HeroBanner/HeroBannerItem.module.scss'
import modalStyle from '@components/common/Banner23Tile/Banner2Tile/Banner2Tile.module.scss'
import cn from 'classnames'
import { Play } from 'react-feather'

interface VideoUrlProp {
    url: string
}

export const PlayVideoButton: FC<VideoUrlProp> = ({ url }) => {
    const [isOpen, setIsOpen] = useState(false)
    const white = 'white'
    return (
        <div className="z-50 absolute top-1/2 l-0 w-full">
            <button onClick={() => setIsOpen(true)}>
                <Play className="play-button-small" fill={white} />
            </button>
            <ClickOutside active={isOpen} onClick={() => setIsOpen(false)}>
                <div>
                    <Modal
                        className={cn(
                            modalStyle['banneritem-modal'],
                            s['hero-banner-modal']
                        )}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        focusFirst={false}
                    >
                        <PopupVideoPlayer videourl={url} />
                    </Modal>
                </div>
            </ClickOutside>
        </div>
    )
}
