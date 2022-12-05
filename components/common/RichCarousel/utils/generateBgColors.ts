import { GradientBgType } from '../RichCarousel'
import { hasGradient } from './hasGradient'

export const generateBgColors = (bg: GradientBgType) => {
    return {
        'background-color': bg?.backgroundColor,
        ...(hasGradient(bg) && {
            background: `linear-gradient(${bg.angle}deg, ${bg.startColorCode} ${bg.startPoint}%, ${bg.endColorCode} ${bg.stopPoint}%)`
        })
    }
}
