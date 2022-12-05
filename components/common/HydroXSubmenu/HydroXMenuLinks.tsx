import { Dispatch, SetStateAction } from 'react'
import { Button } from '@corratech/pylot-ui'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import type { MenuLink } from '@components/common/types'
import { CTAType } from '../../../framework/pylot/hooks/contentful/use-content-json'
import HydroXShopLink from './HydroXShopLink'

import s from './HydroXSubmenu.module.scss'

export interface HydroXMenuLinksProps {
    isMenuVisible: boolean
    menuLinks: [MenuLink]
    setDisplayModal: Dispatch<SetStateAction<boolean>>
    submenuShopLink: CTAType
    submenuShopLinkMobileLabel: string
}

/**
 * Renders menu links
 * @returns JSX
 */
const HydroXMenuLinks = ({
    isMenuVisible,
    menuLinks,
    setDisplayModal,
    submenuShopLink,
    submenuShopLinkMobileLabel
}: HydroXMenuLinksProps): JSX.Element => {
    const { t } = useTranslation(['common'])

    /**
     * Checks is menu link active or not
     * @param url string
     * @returns boolean
     */
    const isActive = (urlPath: string) =>
        location?.pathname?.match(new RegExp(`.*?(${urlPath})$`))

    return (
        <div
            className={`${s['hydroXSubmenu-menuLinks']} ${
                isMenuVisible ? s['show'] : ''
            } `}
        >
            {typeof window !== 'undefined' &&
                menuLinks?.map((menuLink) => {
                    if (menuLink?.text) {
                        return (
                            <div
                                key={menuLink?.text}
                                className={`${s['hydroXSubmenu-menuLink']} ${
                                    s['menuLink']
                                } ${
                                    isActive(menuLink?.url) ? s['active'] : ''
                                } font-secondary`}
                            >
                                {menuLink?.url && !menuLink?.openModal ? (
                                    <Link href={menuLink?.url}>
                                        {t(menuLink?.text)}
                                    </Link>
                                ) : (
                                    <Button
                                        className={s['hydroXSubmenu-showModal']}
                                        onClick={() => setDisplayModal(true)}
                                    >
                                        {t(menuLink?.text)}
                                    </Button>
                                )}
                            </div>
                        )
                    }
                })}
            <HydroXShopLink
                submenuShopLink={submenuShopLink}
                submenuShopLinkMobileLabel={submenuShopLinkMobileLabel}
            />
        </div>
    )
}

export default HydroXMenuLinks
