import { useTranslation } from 'next-i18next'
import { Button } from '@corratech/pylot-ui'
import Link from 'next/link'
import { CTAType } from '../../../framework/pylot/hooks/contentful/use-content-json'

import s from './HydroXSubmenu.module.scss'

export interface HydroXShopLinkProps {
    submenuShopLink: CTAType
    submenuShopLinkMobileLabel: string
}

/**
 * Renders menu toggle button
 * @returns JSX
 */
const HydroXShopLink = ({
    submenuShopLink,
    submenuShopLinkMobileLabel
}: HydroXShopLinkProps): JSX.Element => {
    const { t } = useTranslation(['common'])

    return (
        <Button
            className={`${s['hydroXSubmenu-shopLink']} btn-secondary font-secondary`}
        >
            <Link href={submenuShopLink?.url}>
                <a href={submenuShopLink?.url}>
                    <div className={s['hydroXSubmenu-ShopLinkLabel']}>
                        <p>{submenuShopLinkMobileLabel}</p>
                        <p>{submenuShopLink.displayText}</p>
                    </div>
                </a>
            </Link>
            <div className={s['arrow']} />
        </Button>
    )
}

export default HydroXShopLink
