interface jsonStyleProps {
    'padding-bottom'?: string | undefined
    'padding-top'?: string | undefined
}

export const JsonToCss = (jsonStyle: jsonStyleProps) => {
    return JSON.stringify(jsonStyle, null, '\t').replace(/"|,/g, '')
}
