import { CSSProperties } from 'react'

import s from './DisclaimerBlock.module.scss'

export interface DisclaimerBlockProps {
    disclaimer: string
    useBackground?: boolean
    fontColor?: string
    style?: CSSProperties | undefined
    isDangerous?: boolean
}

const c = /*tw*/ {
    discalimer: `${s['discalimer']} discalimer-copy text-white text-center m-auto `
}

export const DisclaimerBlock = ({
    disclaimer,
    useBackground = false,
    fontColor = 'white',
    style = { display: 'block' },
    isDangerous = false
}: DisclaimerBlockProps): JSX.Element => {
    return (
        <div
            className={`${c.discalimer}${useBackground ? s['background'] : ''}`}
            style={style}
        >
            {isDangerous ? (
                <span
                    style={{ color: fontColor }}
                    dangerouslySetInnerHTML={{
                        __html: disclaimer
                    }}
                />
            ) : (
                <span style={{ color: fontColor }}>{disclaimer}</span>
            )}
        </div>
    )
}
