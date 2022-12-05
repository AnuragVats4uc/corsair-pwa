import { IProductCalloutItem, IProductCallouts } from '../types'

export type ProductCalloutsProp = {
    productCallouts: IProductCallouts
}

export type LeftRightProductsReturn = {
    leftItems: IProductCalloutItem[]
    rightItems: IProductCalloutItem[]
}
