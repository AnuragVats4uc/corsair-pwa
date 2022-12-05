import type { IDarkLightTheme } from '@components/common/types'

type BaseStyles = {
    backgroundColor: string
    color: string
    subheadingColor: string
}

export const getThemeFromContent = (
    contentfulTheme: IDarkLightTheme
): BaseStyles => {
    const light: BaseStyles = {
        backgroundColor: contentfulTheme.backgroundLight,
        color: contentfulTheme.colorLight,
        subheadingColor: '#888B8D'
    }

    const dark: BaseStyles = {
        backgroundColor: contentfulTheme.backgroundDark,
        color: contentfulTheme.colorDark,
        subheadingColor: '#ECE81A'
    }

    const theme = {
        light,
        dark
    }

    return theme[contentfulTheme.theme]
}
