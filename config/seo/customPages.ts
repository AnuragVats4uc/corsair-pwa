export type CustomPages = {
    [key: string]: {
        pageType: string
        pageName: string
        children?: CustomPages
    }
}

export const customPages: CustomPages = {
    account: {
        pageName: 'My Account',
        pageType: 'account',
        children: {
            orders: {
                pageName: 'My Account | Orders',
                pageType: 'account-orders'
            },
            wishlist: {
                pageName: 'My Account | Wishlist',
                pageType: 'account-wishlist'
            },
            address: {
                pageName: 'My Account | Address',
                pageType: 'account-address'
            },
            'account-information': {
                pageName: 'My Account | Account Information',
                pageType: 'account-information'
            },
            'store-credit': {
                pageName: 'My Account | Store Credit',
                pageType: 'account-store-credit'
            },
            newsletter: {
                pageName: 'My Account | Newsletter Subscription',
                pageType: 'account-newsletter'
            },
            'gift-card': {
                pageName: 'My Account | Gift Card',
                pageType: 'account-gift-card'
            }
        }
    },
    search: {
        pageName: 'Search page',
        pageType: 'searchresults'
    },
    checkout: {
        pageName: 'Checkout page',
        pageType: 'checkout'
    }
}
