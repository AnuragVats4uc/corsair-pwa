import { GradientBgType } from '../RichCarousel'

export const hasGradient = (value: GradientBgType) => {
    return (
        typeof value?.gradientType !== 'undefined' &&
        typeof value?.angle !== 'undefined' &&
        typeof value?.startColorCode !== 'undefined' &&
        typeof value?.endColorCode !== 'undefined' &&
        typeof value?.startPoint !== 'undefined' &&
        typeof value?.stopPoint !== 'undefined'
    )
}
