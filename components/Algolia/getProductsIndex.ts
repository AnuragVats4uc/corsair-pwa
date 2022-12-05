export const getProductsIndex = (lang: string): string => {
    if (
        !process.env.NEXT_PUBLIC_X_PYLOT_BACKEND ||
        !process.env.NEXT_PUBLIC_ENVIRONMENT
    ) {
        console.log(
            `Brand and/or environment variables are not set. Please set them in your environment.`
        )
        throw new Error(`Missing environment variables`)
    }
    return `${process.env.NEXT_PUBLIC_X_PYLOT_BACKEND}_${process.env.NEXT_PUBLIC_ENVIRONMENT}_products_${lang}`
}
