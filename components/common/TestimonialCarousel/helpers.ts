import type { ITestimonialBlock } from '../types'
import type { DocumentColorsSetter } from './types'

export const getDotsLabels = (
    testimonialBlocks: ITestimonialBlock[]
): string[] => {
    return testimonialBlocks.map((block) => {
        return block.paginationTitle
    })
}

const isValidHex = (backgroundColorHex: string): boolean => {
    const re = /[0-9A-Fa-f]{6}/g
    if (re.test(backgroundColorHex)) return true
    return false
}

export const setColors = ({
    backgroundColorHex,
    textColor
}: DocumentColorsSetter): void => {
    if (backgroundColorHex) {
        document.documentElement.style.setProperty(
            '--bg-color',
            `#${isValidHex(backgroundColorHex) ? backgroundColorHex : '000000'}`
        )
    }
    if (textColor) {
        document.documentElement.style.setProperty(
            '--component-color',
            textColor === 'dark' ? 'black' : 'white'
        )
    }
}
