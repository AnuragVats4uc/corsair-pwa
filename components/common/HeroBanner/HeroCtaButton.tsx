import { FC, useState } from 'react'
import { CtaButton } from '@components/common/Carousel/Carousel'
import { HeroBannerTwClasses as twClasses } from './HeroBannerTwClasses'
import { PopupVideoPlayer } from '@components/common/Banner23Tile/Banner2Tile/PopupVideoPlayer'
import { Modal, Button } from '@corratech/pylot-ui'
import { ClickOutside } from '@corratech/pylot-utils'
import cn from 'classnames'
import s from './HeroBannerItem.module.scss'
import modalStyle from '@components/common/Banner23Tile/Banner2Tile/Banner2Tile.module.scss'

export type HeroCtaButtonPropsType = {
    ctaButton: CtaButton
}

export const HeroCtaButton: FC<HeroCtaButtonPropsType> = ({ ctaButton }) => {
    const [isOpen, setIsOpen] = useState(false)
    if (!ctaButton || !ctaButton?.displayText) return null

    const openInPopup = ctaButton?.openInPopup

    return (
        <div className={cn(s['cta'], twClasses.cta)}>
            {openInPopup ? (
                <Button
                    variant="secondary"
                    className={twClasses.anchor}
                    onClick={() => setIsOpen(true)}
                >
                    {ctaButton?.displayText}
                </Button>
            ) : (
                <a className={twClasses.anchor} href={ctaButton?.url}>
                    {ctaButton?.displayText}
                </a>
            )}
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
                        <PopupVideoPlayer videourl={ctaButton?.url} />
                    </Modal>
                </div>
            </ClickOutside>
        </div>
    )
}
