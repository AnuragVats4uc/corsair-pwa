import Box from '@components/icons/Box'
import Truck from '@components/icons/Truck'
import s from './ShippingInfo.module.scss'
import { FC, ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
export interface ShippingInfoContentfulResponse {
    title: string
    freeShippingMessage: string
}

export interface ShippingInfoProps {
    freeShipping?: boolean
    shipsWithin?: number
    shipsWithinMessage?: string
    expectedDate?: string
    backorderEnabled?: boolean
}

export const SHIPPING_INFO_IDENTIFIER = ['shippingInfo']
export const SHIPPING_INFO_CONTENT_TYPE = 'shippingInfo'

const ShippingInfo: FC<ShippingInfoProps> = ({
    freeShipping = false,
    shipsWithin = 0,
    shipsWithinMessage = '',
    expectedDate = '',
    backorderEnabled = false
}): ReactElement | null => {
    const { t } = useTranslation(['pdp'])
    const freeShippingMessage = t(
        'pdp||shippinginfo|This product qualifies for free shipping'
    )

    const backorderMessage = expectedDate
        ? `${t(
              'pdp||shippinginfo|This item is on backorder. Estimated availability:'
          )} ${expectedDate}`
        : t(
              'pdp||shippinginfo|This item is on backorder and will be available soon.'
          )

    if (!freeShipping && shipsWithin === 0 && !backorderEnabled) {
        return null
    }

    return (
        <div className={s['container-message']}>
            {freeShipping && freeShippingMessage && (
                <div className={s['shipping-message-container']}>
                    <Truck />
                    <span className={s['message-truck']}>
                        {freeShippingMessage}
                    </span>
                </div>
            )}
            <div className={s['shipping-message-container']}>
                {shipsWithin > 0 && shipsWithinMessage && !backorderEnabled && (
                    <>
                        <Box />
                        <span className={s['message-box']}>
                            {shipsWithinMessage.replace(
                                '0',
                                shipsWithin?.toString()
                            )}
                        </span>
                    </>
                )}
                {backorderEnabled && (
                    <>
                        <Box />
                        <span className={s['message-box']}>
                            {backorderMessage}
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default ShippingInfo
