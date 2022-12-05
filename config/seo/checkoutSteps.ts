export enum CheckoutStepNameEnum {
    CART = 'cart',
    SHIPPING = 'shipping',
    PAYMENT = 'payment'
}

export type CheckoutSteps = {
    [key: string]: number
}

export const checkoutSteps: CheckoutSteps = {
    cart: 1,
    shipping: 2,
    payment: 3
}
