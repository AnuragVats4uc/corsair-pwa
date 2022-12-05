import { IProductCalloutItem } from '../types'
import { LeftRightProductsReturn } from '@components/common/ProductCallouts'

export const setColors = (theme: string): void => {
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
            '--color',
            `${theme === 'dark' ? 'white' : 'black'}`
        )
        document.documentElement.style.setProperty(
            '--circle-color',
            `${theme === 'dark' ? '#ece81a' : 'black'}`
        )
    }
}

export const setLeftRightProducts = (
    calloutItems: IProductCalloutItem[]
): LeftRightProductsReturn => {
    const leftItems = calloutItems.filter((item) => {
        return item.desktopItemSide === 'left'
    })
    const rightItems = calloutItems.filter((item) => {
        return item.desktopItemSide === 'right'
    })
    return { leftItems, rightItems }
}
