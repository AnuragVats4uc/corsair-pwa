import { FC, useState } from 'react'
import s from './ImageWithDescription.module.scss'
import { ImageWithDescriptionProps } from '../types'
import { default as Mobile } from './ImageWithDescriptionMobile'
import { default as Desktop } from './ImageWithDescriptionDesktop'
import { useTranslation } from 'next-i18next'
import { ClickOutside } from '@corratech/pylot-utils'
import Modal from '@corratech/pylot-ui/src/Modal/Modal'
import { PopupVideoPlayer } from '@components/common/Banner23Tile/Banner2Tile/PopupVideoPlayer'

const ImageWithDescription: FC<ImageWithDescriptionProps> = ({
    content
}): JSX.Element | null => {
    const { t } = useTranslation('common')
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div
            className={s['image-with-description-container']}
            style={{ backgroundColor: content?.backgroundColor }}
        >
            <div className="text-center mb-24">
                <h4
                    className={`${s['heading']} text-yellow font-aktivGrotesk uppercase font-semibold`}
                >
                    {content?.heading}
                </h4>
                <h2
                    className={`${s['sub-heading']} text-white font-bebasNeue uppercase font-semibold`}
                >
                    {content?.subheading}
                </h2>
                <button
                    className={`${s['open-video-button']} bg-white text-black uppercase font-medium cursor-pointer font-aktivGrotesk focus:outline-none`}
                    onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(true)
                    }}
                >
                    {t('Watch Video')}
                </button>
            </div>
            <div>
                <Desktop content={content} />
                <Mobile content={content} />
            </div>
            <ClickOutside active={isOpen} onClick={() => setIsOpen(false)}>
                <div>
                    <Modal
                        className={s['vidgallery-item-modal']}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        focusFirst={false}
                    >
                        <PopupVideoPlayer videourl={content!.ctaButton} />
                    </Modal>
                </div>
            </ClickOutside>
        </div>
    )
}

export default ImageWithDescription
