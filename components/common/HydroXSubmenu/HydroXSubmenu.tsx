import React, { useEffect, useRef, useState } from 'react'
import type { MenuLink, Text } from '@components/common/types'
import { CTAType } from '../../../framework/pylot/hooks/contentful/use-content-json'
import UsersGuideModal from './UsersGuideModal'
import HydroXToggleButton from './HydroXToggleButton'
import HydroXShopLink from './HydroXShopLink'
import HydroXMenuLinks from './HydroXMenuLinks'

import s from './HydroXSubmenu.module.scss'
import cn from 'classnames'
export interface HydroXSubmenuProps {
    content: {
        identifier: string
        menuLinks: [MenuLink]
        meta: { contentType: string }
        submenuShopLink: CTAType
        submenuToggleButton: string
        submenuShopLinkMobileLabel: string
        modal: Text
    }
}

const c = /*tw*/ {
    hydroXSubmenu: `${s['hydroXSubmenu']} iframewrapper w-full mx-0 my-auto fixed flex justify-between items-start text-white`
}

const HydroXSubmenu = ({ content }: HydroXSubmenuProps): JSX.Element => {
    const [isMenuVisible, setMenuVisible] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)
    const [topSpace, setTopSpace] = useState<number>()

    const subMenuWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const header = document?.getElementById('header')

        new ResizeObserver(() => setTopSpace(header?.offsetHeight)).observe(
            header as Element
        )
    }, [])

    useEffect(() => {
        const { current: $submenu } = subMenuWrapperRef

        if (!$submenu) return

        const threshold = 0
        let lastScrollY = window.scrollY
        let isSubMenuUpdateQueued = false

        const handleOnScroll = () => {
            if (typeof window !== 'undefined' && window.innerWidth > 768) {
                if (isSubMenuUpdateQueued) return
                window.requestAnimationFrame(updateHeaderTransform)
                isSubMenuUpdateQueued = true
            } else {
                $submenu.style.transform = 'translate3d(0, 0, 0)'
            }
        }

        const updateHeaderTransform = () => {
            const { scrollY } = window

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                isSubMenuUpdateQueued = false
                return
            }

            isSubMenuUpdateQueued = false

            if (scrollY > lastScrollY) {
                $submenu.style.transform = 'translate3d(0, -72%, 0)'
            } else {
                $submenu.style.transform = 'translate3d(0, 0, 0)'
            }

            lastScrollY = scrollY
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleOnScroll)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.addEventListener('scroll', handleOnScroll)
            }
        }
    }, [])

    return (
        <>
            <div
                className={cn(c.hydroXSubmenu, isMenuVisible ? s['open'] : '')}
                ref={subMenuWrapperRef}
                style={{ top: topSpace }}
            >
                <HydroXToggleButton
                    isMenuVisible={isMenuVisible}
                    setMenuVisible={setMenuVisible}
                    submenuToggleButton={content?.submenuToggleButton}
                />
                <HydroXMenuLinks
                    isMenuVisible={isMenuVisible}
                    menuLinks={content?.menuLinks}
                    setDisplayModal={setDisplayModal}
                    submenuShopLink={content?.submenuShopLink}
                    submenuShopLinkMobileLabel={
                        content?.submenuShopLinkMobileLabel
                    }
                />
                <HydroXShopLink
                    submenuShopLink={content?.submenuShopLink}
                    submenuShopLinkMobileLabel={
                        content?.submenuShopLinkMobileLabel
                    }
                />
            </div>
            {content?.modal && (
                <UsersGuideModal
                    displayModal={displayModal}
                    setDisplayModal={setDisplayModal}
                    modal={content?.modal}
                />
            )}
        </>
    )
}

export default HydroXSubmenu
