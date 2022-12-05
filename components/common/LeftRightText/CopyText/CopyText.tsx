import s from './CopyText.module.scss'

const c = /*tw*/ {
    leftRightTextCopy: `${s['left-right-text-copy']} text-white font-normal`
}

export interface CopyTextProps {
    copyText: string
    fontColor?: string
}

export const CopyText = ({
    copyText,
    fontColor = 'white'
}: CopyTextProps): JSX.Element | null => {
    if (!copyText) return null
    return (
        <p
            className={c.leftRightTextCopy}
            style={{ color: `${fontColor}` }}
            dangerouslySetInnerHTML={{ __html: copyText }}
        />
    )
}
